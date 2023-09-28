import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as python from '@aws-cdk/aws-lambda-python-alpha'
import * as apigw from "aws-cdk-lib/aws-apigateway";
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { Duration } from 'aws-cdk-lib';



export class CdkFlaskTodolistStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create username and password secret for DB Cluster
    // const secret = new rds.DatabaseSecret(this, 'AuroraSecret', {
    //    username: 'clusteradmin'
    // });

    // The VPC for DB cluster and other resources
    const vpc = new ec2.Vpc(this, 'Vpc', {
      natGateways: 0,
      subnetConfiguration: [
        {
          name: 'private-subnet',
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
          cidrMask: 24,
        },
        {
          name: 'public-subnet',
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 24,
        },
        {
          name: 'db-subnet',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          cidrMask: 28,
        },
      ],
    });

    const DATABASE_NAME = 'todolist';
    // Create the serverless cluster, provide all values needed to customise the database.
    const cluster = new rds.ServerlessCluster(this, 'DBCluster', {
      engine: rds.DatabaseClusterEngine.auroraPostgres({
        version: rds.AuroraPostgresEngineVersion.VER_13_9,
      }),
      vpc,
      credentials: { username: 'clusteradmin' },
      clusterIdentifier: 'todolist',
      defaultDatabaseName: DATABASE_NAME,
      enableDataApi: true,
    });

    const db_uri = 'postgresql+auroradataapi://:@/' +
      DATABASE_NAME + 
      '?aurora_cluster_arn=' +
      cluster.clusterArn +
      '&secret_arn=' +
      cluster.secret?.secretArn 

    // Create package for python app
    const handler = new python.PythonFunction(this, "FlaskApp", {
      entry: './lambda',
      runtime: Runtime.PYTHON_3_11,
      index: 'lambda.py',
      handler: "handler",
      timeout: Duration.seconds(180),
      environment: {
        SQLALCHEMY_DATABASE_URI: db_uri,
      },
    });

    // grant accesss for the data API to this lambda function
    cluster.grantDataApiAccess(handler)

    // defines an API Gateway REST API resource backed by our "hello" function.
    const gateway = new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: handler,
    });    
    // The code that defines your stack goes here

  }
}
