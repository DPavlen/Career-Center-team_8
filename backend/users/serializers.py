from djoser.serializers import (
    UserCreateSerializer, SetPasswordSerializer)
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.fields import SerializerMethodField

from users.models import MyUser


class MyUserCreateSerializer(UserCreateSerializer):
    """
    Сериализатор для просмотра переопределенного Usera и
    проверки просмотра подписок.
    Обязательные поля при создании пользователя:
    email, username, first_name, last_name, password.
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
        extra_kwargs = {
            "email": {"required": True},
            "username": {"required": True},
            "first_name": {"required": True},
            "last_name": {"required": True},
            "password": {"write_only": True}}
    


class ChangePasswordSerializer(serializers.Serializer):
    """
    Сериализатор для изменения пароля пользователя.
    """

    new_password = serializers.CharField(required=True)
    current_password = serializers.CharField(required=True)

    class Meta:
           model = MyUser
           fields = ('new_password', 'current_password')

    def validate(self, data):
        """
        Проверка что старый пароль должен отличаться от нового.
        """
        if data.get('current_password') == data.get('new_password'):
            raise serializers.ValidationError(
                "Новый пароль не должен совпадать со старым!"
            )
        return data
