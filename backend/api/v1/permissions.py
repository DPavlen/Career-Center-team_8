from rest_framework import permissions

from users.models import MyUser


class IsAdminOrHr(permissions.BasePermission):
    """Действие может выполнять строго только админ
    или пользователь с ролью HR."""

    def has_permission(self, request, view, obj):
        return (request.method in permissions.SAFE_METHODS
                or request.user.is_authenticated
                and request.user.is_admin 
                or request.user.role == MyUser.RoleChoises.HR)