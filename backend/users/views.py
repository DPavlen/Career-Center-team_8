from djoser.views import UserViewSet

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