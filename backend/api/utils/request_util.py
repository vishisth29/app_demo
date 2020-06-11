from flask import request
import json


def get_query_params_from_request():
    return request.args.to_dict()


def get_data_from_request():
    if request.data:
        return json.loads(request.data)
    else:
        return json.loads("{}")
