from flask import Flask

from api.views import (
    auth_views,
    group_views,
    user_views
)
from flask import (
    jsonify, request, Response
)
from api.errors.api_exceptions import APIException

def add_resource(api):
    auth_views.add_resource(api)
    group_views.add_resource(api)
    user_views.add_resource(api)

def register_views(app, api):
    add_resource(api)

    @app.errorhandler(Exception)
    def error_handler(error: Exception):
        print(error)
        return Response("Backend Error", 500)

    @app.errorhandler(APIException)
    def handle_api_exception(error: APIException):
        response = jsonify(error.to_dict())
        response.status_code = error.status_code
        return response