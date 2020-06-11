class APIException(Exception):
    def __init__(self, status_code=None, name=None, message=None, data=None):
        Exception.__init__(self)
        self.status_code = status_code if status_code else 500
        
        if not data:
            data = {}
        else:
            if not isinstance(data, dict):
                raise TypeError
        
        self.data = data
        self.name = name if name else 'default'
        self.message = message if message else ''

    def to_dict(self):
        rv = dict()
        rv['status'] = self.status_code
        rv['name'] = self.name
        rv['message'] = self.message
        rv['data'] = self.data
        return rv


class IncorrectLoginException(APIException):

    def __init__(self, status_code=None, message=None):
        APIException.__init__(
            self, status_code=status_code, 
            name='incorrectLogin', message=message
        )

class DuplicateUsernameException(APIException):

    def __init__(self, status_code=None, message=None):
        APIException.__init__(
            self, status_code=status_code,
            message=message, name='duplicateUsername'
        )
