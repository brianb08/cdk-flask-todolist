# CDK-Flask-Todolist

This is a AWS CDK wrapper around the sample [Flask-Todolist](https://github.com/rtzll/flask-todolist) application
The application is deployable to AWS using a collection of servless services including:
* API Gateway
* RDS Aurora Servless (PostgreSQL)
* Lambda

A fork of the original application is in the [lambda](./lambda) directory

This instance of the application has been modified to contain some 
defects, as it is used in the development of testing tools

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template


All of the `cdk` commands can be run with the `--profile` arg


## Setup and Deployment

### Prerequisite

* Docker installed and running - This is necessary for the packaging of the Flask app and dependencies
* CDK installed and working `npm install -g aws-cdk`

### Build and Deploy

    npm install
    npm run build
    cdk synthesize
    cdk deploy --profile <awsprofile>
    cdk watch --hotswap-fallback --profile <awsprofile>

(Last command is recommended to view logs and otherwise redeploy during development) The deployment will output the API Gateway endpoint.  This can be used to check that the app is running...

    https://<apigateway-endpoint>/prod

The database must be seeded with sample data.  The following URL will wipe the DB and reseed it with fake data.  It may appear to timeout but the Lambda will still be running

    https://<apigateway-endpoint>/prod/db/setup/fake

A listing of sample uses can then be accessed:

    https://<apigateway-endpoint>/prod/api/users

In order to work around some pathing issues with the API gateway stage path in the URL (/prod) in this case, manually create a `custom domain` for the API gateway with API mapping (empty) path to stage: prod

