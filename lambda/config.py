import os


class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY") or "secret key, just for testing"
    SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI')
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True
    SQLALCHEMY_RECORD_QUERIES = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
    DEBUG = True


class TestingConfig(Config):
    TESTING = True
    WTF_CSRF_ENABLED = False
    import logging

    logging.basicConfig(
        format="%(asctime)s:%(levelname)s:%(name)s:%(message)s")
    logging.getLogger().setLevel(logging.DEBUG)


class ProductionConfig(Config):
    pass


config = {
    "development": DevelopmentConfig,
    "testing": TestingConfig,
    "production": ProductionConfig,
    "default": DevelopmentConfig,
}
