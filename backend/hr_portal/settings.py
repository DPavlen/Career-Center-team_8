import os
from pathlib import Path

from decouple import config

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config("SECRET_KEY", "")

DEBUG = config("DEBUG", "False") == "True"

ALLOWED_HOSTS = config("ALLOWED_HOSTS", "*").split(" ")

CSRF_TRUSTED_ORIGINS = config("CSRF", "*").split(" ")

CORS_ALLOWED_ORIGINS = config("CORS_ALLOWED_ORIGINS", "").split(" ")

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",
    "users.apps.UsersConfig",
    "rest_framework",
    "rest_framework.authtoken",
    "django_filters",
    "djoser",
    "candidates.apps.CandidatesConfig",
    "vacancies.apps.VacanciesConfig",
    "api.v1.apps.ApiConfig",
    "core",
    "drf_yasg",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


ROOT_URLCONF = "hr_portal.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "hr_portal.wsgi.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": config("POSTGRES_DB", "django"),
        "USER": config("POSTGRES_USER", "django"),
        "PASSWORD": config("POSTGRES_PASSWORD", ""),
        "HOST": config("DB_HOST", ""),
        "PORT": config("DB_PORT", 5432),
    }
}

# DATABASES = {
#   'default': {
#       'ENGINE': 'django.db.backends.sqlite3',
#       'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#   }
# }

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.AllowAny",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.TokenAuthentication",
    ],
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend"
    ],
}

DJOSER = {
    "SERIALIZERS": {
        "user_create": "users.serializers.MyUserCreateSerializer",
        "user": "users.serializers.MyUserCreateSerializer",
        "current_user": "users.serializers.MyUserCreateSerializer",
        "token": "djoser.serializers.TokenSerializer",
        "set_password": "users.serializers.ChangePasswordSerializer",
    },
    "PERMISSIONS": {
        "user": ["djoser.permissions.CurrentUserOrAdminOrReadOnly"],
        "user_list": ["rest_framework.permissions.IsAuthenticatedOrReadOnly"],
    },
    "HIDE_USERS": False,
}

SWAGGER_SETTINGS = {
    "SECURITY_DEFINITIONS": {
        "Bearer Token": {
            "type": "apiKey",
            "name": "Authorization",
            "in": "header",
        }
    },
    "USE_SESSION_AUTH": False,
}

SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")


AUTH_USER_MODEL = "users.MyUser"

LANGUAGE_CODE = "en-ru"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True

STATIC_URL = "/backend_static/"
STATIC_ROOT = os.path.join(BASE_DIR, "static")

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


MEDIA_URL = "/backend_media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")
