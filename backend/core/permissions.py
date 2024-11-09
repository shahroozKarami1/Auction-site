from rest_framework.permissions import IsAdminUser, SAFE_METHODS, BasePermission, IsAuthenticatedOrReadOnly


class IsActiveUserOrReadOnly(IsAuthenticatedOrReadOnly):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        if request.user.is_authenticated:
            if request.user.status == 'verified':
                return True
            return False
        return False


class IsAdminUserOrReadOnly(IsAdminUser):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return super().has_permission(request, view)


class IsOwnerOrAdminOrReadOnly(BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return obj.user == request.user or request.user.is_admin


class IsOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user
