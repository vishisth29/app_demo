import os
from flask import Flask
from flask_restful import Api, Resource
from flask_cors import CORS
from flask_migrate import Migrate
from api.config import Config
from api.database import db
from celery import Celery

app = Flask('splittr')
app.config.from_object(Config)
app.app_context().push()
api = Api(app)
db.init_app(app)

# MIGRATION_DIR = os.path.join('backend', 'migrations')
# migrate = Migrate(app, db, directory=MIGRATION_DIR)
migrate = Migrate(app, db)

celery = Celery(app.name, broker=app.config['CELERY_BROKER_URL'])
celery.conf.update(app.config)

CORS(app, origins='*')

from api.register_views import register_views

register_views(app, api)

class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

api.add_resource(HelloWorld, '/api/hello')


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)