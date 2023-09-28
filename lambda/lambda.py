import awsgi
from app import create_app

# lambda wrapper for Flask app

# assume it's production config for AWS deployments
app = create_app('production')


def handler(event, context):
    return awsgi.response(app, event, context)
