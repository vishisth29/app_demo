from api.database import db
from sqlalchemy import (
    Column, Integer, String,
    PrimaryKeyConstraint, ForeignKeyConstraint
)
from sqlalchemy.orm import relationship

class Group(db.Model):
    __tablename__ = 'group'
    group_id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(30), nullable=False)
    users = relationship("GroupMembership", back_populates="group")

class GroupMembership(db.Model):
    __tablename__ = 'group_membership'

    group_id = Column(Integer)
    user_id = Column(Integer)

    __table_args__ = (
        PrimaryKeyConstraint('group_id', 'user_id'),
        ForeignKeyConstraint(['group_id'], ['group.group_id']),
        ForeignKeyConstraint(['user_id'], ['user.user_id'])
    )
    
    group = relationship("Group", back_populates="users")
    user = relationship("User", back_populates="groups")