from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    first_name = models.CharField(max_length=255, verbose_name="Имя")
    last_name = models.CharField(max_length=255, verbose_name="Фамилия")
    email = models.EmailField(
        max_length=255, unique=True, verbose_name="Почта"
    )

    REQUIRED_FIELDS = ["first_name", "last_name", "email"]
