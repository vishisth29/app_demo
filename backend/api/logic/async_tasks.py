from run import celery, db
from api.models import Group, GroupMembership, Expense


@celery.task
def async_create_group(data):
    group_name = data['name']
    members = data['members']
    try:
        group = Group(name=group_name)
        memberships = []
        for member in members:
            group_membership = GroupMembership(user_id=member['id'])
            group_membership.group = group
            memberships.append(group_membership)

        db.session.add(group)
        for membership in memberships:
            db.session.add(membership)
    except Exception as err:
        raise err

    db.session.commit()

@celery.task
def async_delete_expense(expense_id):
    try:
        expense = Expense.query.filter(Expense.expense_id == expense_id).first()
        db.session.delete(expense)
        db.session.commit()
    except Exception as err:
        raise err
