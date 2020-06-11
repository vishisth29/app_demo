import os
import yaml
from api.models.user import User
from flask_sqlalchemy import SQLAlchemy

def initilize_test_db(db: SQLAlchemy):
    db.create_all()
    data = get_test_data()

    # print('DATA: ', data['users'])
    for _user in data['users']:
        user = User(username=_user['username'], pw_hash=_user['pw_hash'], name=_user['name'])
        db.session.add(user)

    db.session.commit()

def get_test_data(file_name=None):
    filename = file_name if file_name else "test_data.yaml"
    configpath = os.path.join(os.path.dirname(__file__), filename)
    with open(configpath, "r") as f:
        data = yaml.load(f, Loader=yaml.FullLoader)
        return data
