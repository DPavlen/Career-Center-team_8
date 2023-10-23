from djoser.views import UserViewSet

from users.models import MyUser
from users.serializers import MyUserCreateSerializer


class CustomUserViewSet(UserViewSet):
    """Работа с пользователями. Регистрация пользователей.
    Вывод пользователей. У авторизованных пользователей
    возможность подписки. Djoser позволяет переходить
    по endpoints user и токена."""

    queryset = MyUser.objects.all()
    serializer_class = MyUserCreateSerializer
    # filter_backends = (DjangoFilterBackend,)
    # filterset_class = FilterUser
    # permission_classes = (IsAdminOrReadOnly,)
    # pagination_class = PaginationCust