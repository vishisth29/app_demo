from sqlalchemy.orm import relationship

from api.database import db
from sqlalchemy import (
    Column, Integer, String, REAL, Enum, TIMESTAMP, 
    ForeignKeyConstraint, PrimaryKeyConstraint 
)
import enum
from datetime import datetime

class SplitType(enum.Enum):
    EQUAL = "equal"
    EXACT = "exact"
    PERCENTAGE = "percentage"

    @staticmethod
    def from_str(label):
        if label == 'equal':
            return SplitType.EQUAL
        elif label == 'exact':
            return SplitType.EXACT
        elif label == 'percentage':
            return SplitType.PERCENTAGE

class Expense(db.Model):
    __tablename__ = 'expense'
    
    expense_id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(50))
    total = Column(REAL, nullable=False)
    payer = Column(Integer, nullable=False)
    group_id = Column(Integer)
    split = Column(Enum(SplitType), nullable=False)
    timestamp = Column(TIMESTAMP(timezone=True), nullable=False, default=datetime.utcnow)

    __table_args__ = (
        ForeignKeyConstraint(['group_id'], ['group.group_id']),
        ForeignKeyConstraint(['payer'], ['user.user_id'])
    )

    users = relationship("ExpenseShare", back_populates="expense", cascade="delete")


class ExpenseShare(db.Model):
    __tablename__ = 'expense_share'

    expense_id = Column(Integer)
    user_id = Column(Integer)
    share = Column(REAL, nullable=False)

    __table_args__ = (
        PrimaryKeyConstraint('expense_id', 'user_id'),
        ForeignKeyConstraint(['expense_id'], ['expense.expense_id']),
        ForeignKeyConstraint(['user_id'], ['user.user_id'])
    )

    expense = relationship("Expense", back_populates="users")
    user = relationship("User", back_populates="expenses")
