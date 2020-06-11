from flask import request
from api.utils import request_util

class EndpointDataHandler():

    def __init__(self):
        self.data = None
        self.get_data_or_query_params_from_request()

    def get_data_or_query_params_from_request(self):
        if request.args:
            self.data = request_util.get_query_params_from_request()
        else:
            self.data = request_util.get_data_from_request()