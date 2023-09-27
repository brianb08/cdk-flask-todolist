# CDK-Flask-Todolist

This is a AWS CDK wrapper around the sample [Flask-Todolist](https://github.com/rtzll/flask-todolist) application

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