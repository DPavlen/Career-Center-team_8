from django.contrib.auth.models import AbstractUser
from django.db import models

from core.constants import LenghtField
from core.validators import (
    first_name_validator,
    last_name_validator,
    username_validator,
)


class MyUser(AbstractUser):
    """
    Кастомная модель переопределенного юзера.
    При создании пользователя все поля обязательны для заполнения.
    """

    class RoleChoises(models.TextChoices):
        """
        Определение роли юзера.
        """

        USER = "user"
        HR = "hr"
        ADMIN = "admin"

    REQUIRED_FIELDS = ["first_name", "last_name", "email"]

    email = models.EmailField(
        max_length=LenghtField.MAX_LENGHT_EMAIL.value,
        unique=True,
        verbose_name="email address",
    )
    username = models.CharField(
        "Логин пользователя",
        max_length=LenghtField.MAX_LENGHT_USERNAME.value,
        unique=True,
        validators=[username_validator],
    )
    first_name = models.CharField(
        "Имя пользователя",
        max_length=LenghtField.MAX_LENGHT_FIRST_NAME.value,
        validators=[first_name_validator],
    )
    last_name = models.CharField(
        "Фамилия пользователя",
        max_length=LenghtField.MAX_LENGHT_LAST_NAME.value,
        validators=[last_name_validator],
    )
    password = models.CharField(
        "Пароль пользователя",
        max_length=LenghtField.MAX_LENGHT_PASSWORD.value,
    )
    role = models.TextField(
        "Пользовательская роль юзера",
        choices=RoleChoises.choices,
        default=RoleChoises.HR,
        max_length=LenghtField.MAX_LENGHT_ROLE.value,
    )

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"
        ordering = ["-id"]

    def __str__(self):
        return str(self.username)
