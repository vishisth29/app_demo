from api.database import db
from sqlalchemy import (
    Column, Integer, String, REAL, TIMESTAMP, 
    ForeignKeyConstraint, PrimaryKeyConstraint 
)
from datetime import datetime

class Payment(db.Model):
    __tablename__ = 'payment'
    
    payment_id = Column(Integer, primary_key=True, autoincrement=True)
    note = Column(String(50))
    amount = Column(REAL, nullable=False)
    payer = Column(Integer, nullable=False)
    payee = Column(Integer, nullable=False)
    group_id = Column(Integer)
    timestamp = Column(TIMESTAMP(timezone=True), nullable=False, default=datetime.utcnow)

    __table_args__ = (
        ForeignKeyConstraint(['group_id'], ['group.group_id']),
        ForeignKeyConstraint(['payer'], ['user.user_id']),
        ForeignKeyConstraint(['payee'], ['user.user_id'])
    )