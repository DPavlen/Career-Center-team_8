from django.test import TestCase
from core.validators import (username_validator, 
                             first_name_validator, 
                             last_name_validator)
from rest_framework.exceptions import ValidationError
from users.models import MyUser
from users.serializers import MyUserCreateSerializer


class MyUserModelTest(TestCase):
    def setUp(self):
        self.user = MyUser.objects.create(
            username="testuser",
            email="testuser@example.com",
            first_name="Test",
            last_name="User",
            password="testpassword",
        )

    def test_username_field(self):
        username_field = self.user._meta.get_field("username")
        self.assertEqual(username_field.max_length, 255)
        self.assertEqual(username_field.unique, True)
        self.assertIn(username_validator, username_field.validators)

    def test_email_field(self):
        email_field = self.user._meta.get_field("email")
        self.assertEqual(email_field.max_length, 255)
        self.assertEqual(email_field.unique, True)

    def test_first_name_field(self):
        first_name_field = self.user._meta.get_field("first_name")
        self.assertEqual(first_name_field.max_length, 255)
        self.assertIn(first_name_validator, first_name_field.validators)

    def test_last_name_field(self):
        last_name_field = self.user._meta.get_field("last_name")
        self.assertEqual(last_name_field.max_length, 255)
        self.assertIn(last_name_validator, last_name_field.validators)

    def test_password_field(self):
        password_field = self.user._meta.get_field("password")
        self.assertEqual(password_field.max_length, 128)

    def test_role_field(self):
        role_field = self.user._meta.get_field("role")
        self.assertEqual(role_field.max_length, 50)
        self.assertEqual(role_field.default, "hr")

    def test_str_representation(self):
        self.assertEqual(str(self.user), "testuser")