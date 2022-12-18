from rest_framework import permissions

class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        print("SELF: ", self)
        print("OBJECT: ", obj.id)
        print("REQUEST: ", request)
        return False
        # return obj.user_id == int(request.user.id)