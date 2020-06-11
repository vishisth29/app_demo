from api.base_view import EndpointDataHandler
from api.models.user import User
from api.errors.api_exceptions import IncorrectLoginException, DuplicateUsernameException
from api.database import db
from api.utils.response_util import model_as_dict
from sqlalchemy import func

class AuthViewsMethods(EndpointDataHandler):
    
    def login(self):
        username = self.data['username']
        pwHash = self.data['pwHash']
        try:
            user: User = User.query.filter_by(username=username).first()
        except Exception:
            raise Exception()

        if not user or not user.authenticate(pwHash):
            raise IncorrectLoginException(status_code=401, message='Incorrect Username or password')
        
        return self.generate_dict_with_token(user), 200


    def signup(self):
        username = self.data['username']
        user: User = User.query.filter_by(username=username).first()

        if user:
            raise DuplicateUsernameException(status_code=401, message='Username already exists')

        pwHash = self.data['pwHash']
        name = self.data['name']
        user = User(username=username, pw_hash=pwHash, name=name)
        db.session.add(user)
        db.session.commit()

        return '', 200

    def search_user(self):
        print('$$$$$ search_user()')
        name = self.data['name'].lower()

        try:
            # res = User.query.filter(User.name.startswith(name)).all()
            res = User.query.filter(func.lower(User.name).startswith(name)).all()
        except Exception:
            raise Exception()

        users = []
        for row in res:
            user = model_as_dict(row, ['pw_hash'])
            users.append(user)

        return users, 200


    def generate_dict_with_token(self, user):
        return {
            'id': user.user_id,
            'username': user.username,
            'name': user.name,
            'token': 'a-secret-token'
        }