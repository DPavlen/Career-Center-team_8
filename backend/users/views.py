from djoser.views import UserViewSet

from api.v1.pagination import PaginationCust
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
    # pagination_class = PaginationCust