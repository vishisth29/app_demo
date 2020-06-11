from flask_restful import Resource
from api.view_methods.group_views_methods import GroupViewsMethods


def add_resource(api):
    api.add_resource(Group, '/group/<group_id>')
    api.add_resource(Groups, '/groups')
    api.add_resource(GroupMembers, '/group/members')
    api.add_resource(GroupExpenses, '/group/expenses')


class Group(GroupViewsMethods, Resource):
    def get(self, group_id):
        return self.get_group(group_id)


class Groups(GroupViewsMethods, Resource):
    def get(self):
        return self.get_groups()

    def put(self):
        return self.create_group()


class GroupMembers(GroupViewsMethods, Resource):
    def get(self):
        return self.get_members()


class GroupExpenses(GroupViewsMethods, Resource):
    def get(self):
        return self.get_expenses()

    def put(self):
        return self.create_expense()
