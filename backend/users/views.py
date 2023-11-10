from djoser.views import UserViewSet

from api.v1.pagination import PaginationCust
from api.v1.permissions import IsAdminOrHr
from users.models import MyUser
from users.serializers import MyUserCreateSerializer


class CustomUserViewSet(UserViewSet):
    """
    Работа с пользователями. Регистрация пользователей.
    Вывод пользователей. У авторизованных  HR пользователей
    возможность добавления кандидата в отслеживаемые.
    """

    queryset = MyUser.objects.all()
    serializer_class = MyUserCreateSerializer
    permission_classes = (IsAdminOrHr)
    pagination_class = PaginationCust