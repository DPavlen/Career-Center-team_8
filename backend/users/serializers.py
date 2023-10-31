from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.fields import SerializerMethodField

from users.models import MyUser


class MyUserCreateSerializer(UserCreateSerializer):
    """
    Сериализатор для просмотра переопределенного Usera и
    проверки просмотра подписок.
    """

    class Meta:
        model = MyUser
        fields = (
            "email",
            "id",
            "username",
            "first_name",
            "last_name",
            "password",
        )
        extra_kwargs = {"password": {"write_only": True}}