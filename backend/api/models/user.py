from api.database import db
from sqlalchemy import (
    Column, Integer,
    String
)
from sqlalchemy.orm import relationship


class User(db.Model):
    __tablename__ = 'user'
    user_id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(20), unique=True, nullable=False)
    pw_hash = Column(String(64), nullable=False)
    name = Column(String(50), nullable=False)
    groups = relationship("GroupMembership", back_populates="user")
    expenses = relationship("ExpenseShare", back_populates="user", cascade="delete")

    def authenticate(self, pw_hash):
        if self.pw_hash == pw_hash:
            return True
        return False
