from enum import IntEnum


class LenghtField(IntEnum):
    """Длины полей в приложении Юзеров и т.д."""

    # Атрибуты приложения Юзеров
    # Максимальная длина поля email User.email
    MAX_LENGHT_EMAIL = 254
    # Максимальная длина поля username User.username
    MAX_LENGHT_USERNAME = 150
    # Максимальная длина поля first_name User.first_name
    MAX_LENGHT_FIRST_NAME = 150
    # Максимальная длина поля last_name User.last_name
    MAX_LENGHT_LAST_NAME = 150
    # Максимальная длина поля password User.password
    MAX_LENGHT_PASSWORD = 150
    # Максимальная длина поля role User.role
    MAX_LENGHT_ROLE = 150

    # page_size = 6 for API PaginationCust.page_size
    PAGE_SIZE = 6

    # Минимальная длина логина пользователя
    MIN_LENGHT_LOGIN_USER = 1
    # Минимальная длина поля first_name
    MIN_LENGHT_FIRST_NAME = 1
    # Минимальная длина поля last_name
    MIN_LENGHT_LAST_NAME = 1


    # Атрибуты приложения Кандидатов
     # Максимальная длина поля slug для моделей общий
    MAX_SLUG = 150
    # Максимальная длина поля name для моделей общий
    MAX_NAME = 150

    # Максимальная длина поля slug для Level
    MAX_LEVEL_NAME = 30
    # Максимальная длина поля slug для Level
    MAX_LEVEL_SLUG = 15

    # Максимальная длина поля name для Experience
    MAX_NAME_EXPERINCE = 20
    # Максимальная длина поля slug для Experience
    MAX_SLUG_EXPERINCE = 20

    # Максимальная длина поля name для Employment
    MAX_EMPLOYMENT_NAME = 20
    # Максимальная длина поля slug для Employment
    MAX_EMPLOYMENT_SLUG = 20

    # Максимальная длина поля name для WorkSchedule
    MAX_WORKSHEDULE_NAME = 20
    # Максимальная длина поля slug для WorkSchedule
    MAX_WORKSHEDULE_SLUG = 20

    # Максимальная длина поля name для ExperienceDetailed
    MAX_EXPERIENCEDETAILED_NAME = 150
    # Максимальная длина поля post для ExperienceDetailed
    MAX_EXPERIENCEDETAILED_POST = 100
    # Максимальная длина поля slug для ExperienceDetailed
    MAX_EXPERIENCEDETAILED_SLUG = 100

    # Максимальная длина поля name для Education
    MAX_EDUCATION_NAME = 150
    # Максимальная длина поля level для Education
    MAX_EDUCATION_LEVEL = 30
    # Максимальная длина поля name_university для Education
    MAX_EDUCATION_NAME_UNIVERSITY = 150
    # Максимальная длина поля faculty для Education
    MAX_EDUCATION_FACULTY = 150
    # Максимальная длина поля specialization для Education
    MAX_EDUCATION_SPECIALIZATION = 150
    # Максимальная длина поля slug для Education
    MAX_EDUCATION_SLUG = 150

    # Максимальная длина поля last_name для Candidate
    MAX_CANDIDATE_LAST_NAME = 150
    # Максимальная длина поля first_name для Candidate
    MAX_CANDIDATE_FIRST_NAME = 150
    # Максимальная длина поля middle_name для Candidate
    MAX_CANDIDATE_MIDDLE_NAME = 150
    # Максимальная длина поля sex для Candidate
    MAX_CANDIDATE_SEX = 10
    # Максимальная длина поля contacts_phone для Candidate
    MAX_CANDIDATE_CONTACTS_PHONE = 20
    # Максимальная длина поля contacts_email, для Candidate
    MAX_CANDIDATE_CONTACTS_EMAIL = 254
    # Максимальная длина поля contacts_other для Candidate
    MAX_CANDIDATE_CONTACTS_OTHER = 150
    # Максимальная длина поля location для Candidate
    MAX_CANDIDATE_LOCATION = 150

