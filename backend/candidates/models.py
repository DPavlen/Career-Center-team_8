from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

from core.constants import LenghtField
from users.models import MyUser


class Specialization(models.Model):
    """Модель направления специальности.

    Описывается следующими полями:

    name - Название направления специальности.
    slug - слаг направления специальности.
    """

    name = models.CharField(
        "Название",
        unique=True,
        max_length=LenghtField.MAX_NAME.value,
    )
    slug = models.SlugField(
        "Уникальный слаг",
        unique=True,
        max_length=LenghtField.MAX_SLUG.value,
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Направление специальности"
        verbose_name_plural = "Направления специальности"
        ordering = ["name"]


class Course(models.Model):
    """Модель курсов.

    Описывается следующими полями:

    name - Название курса.
    slug - слаг направление курса.
    """

    name = models.CharField(
        "Название",
        unique=True,
        max_length=LenghtField.MAX_NAME.value,
    )
    spec_id = models.PositiveIntegerField(
        "ID Специальности",
    )
    slug = models.SlugField(
        "Уникальный слаг",
        unique=True,
        max_length=LenghtField.MAX_SLUG.value,
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Название курса"
        verbose_name_plural = "Названия курсов"
        ordering = ["name"]


class Level(models.Model):
    """Модель уровня в IT.

    Описывается следующими полями:

    name - Название уровня.
    slug - слаг уровня.
    """

    name = models.CharField(
        "Название",
        unique=True,
        max_length=10,
    )
    slug = models.SlugField(
        "Уникальный слаг",
        unique=True,
        max_length=LenghtField.MAX_LEVEL_NAME.value,
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Уровень"
        verbose_name_plural = "Уровни"
        ordering = ["name"]


class HardCands(models.Model):
    """Модель хард скилла.

    Описывается следующими полями:

    name - Название хард скилла.
    slug - слаг hard скилла.
    """

    name = models.CharField(
        "Название",
        max_length=LenghtField.MAX_NAME.value,
    )
    slug = models.SlugField(
        "Уникальный слаг",
        unique=False,
        max_length=LenghtField.MAX_SLUG.value,
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Hard скилл"
        verbose_name_plural = "Hard скиллы"
        ordering = ["name"]


class Soft(models.Model):
    """Модель софт скиллов.

    Описывается следующими полями:

    name - Название soft скилла.
    slug - слаг soft скилла.
    """

    name = models.CharField(
        "Название",
        unique=True,
        max_length=LenghtField.MAX_NAME.value,
    )
    slug = models.SlugField(
        "Уникальный слаг",
        unique=True,
        max_length=LenghtField.MAX_SLUG.value,
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Soft скилл"
        verbose_name_plural = "Soft скиллы"
        ordering = ["name"]


class Experience(models.Model):
    """Модель опыта работы.

    Описывается следующими полями:

    name - Опыт работы .
    slug - слаг опыта.
    """

    name = models.CharField(
        "Опыт работы",
        unique=True,
        max_length=LenghtField.MAX_NAME_EXPERINCE.value,
    )
    slug = models.SlugField(
        "Уникальный слаг",
        unique=True,
        max_length=LenghtField.MAX_SLUG_EXPERINCE.value,
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Опыт работы"
        verbose_name_plural = "Опыт работы"
        ordering = ["name"]


class EmploymentType(models.Model):
    """Модель типа занятости.

    Описывается следующими полями:

    name - Тип занятости.
    slug - слаг занятости.
    """

    name = models.CharField(
        "Тип занятости",
        unique=True,
        max_length=LenghtField.MAX_EMPLOYMENT_NAME.value,
    )
    slug = models.SlugField(
        "Уникальный слаг",
        unique=True,
        max_length=LenghtField.MAX_EMPLOYMENT_SLUG.value,
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Тип заянятости"
        verbose_name_plural = "Типы заянятости"
        ordering = ["name"]


class WorkSchedule(models.Model):
    """Модель графика работы.

    Описывается следующими полями:

    name - График работы.
    slug - слаг графика.
    """

    name = models.CharField(
        "График работы",
        unique=True,
        max_length=LenghtField.MAX_WORKSHEDULE_NAME.value,
    )
    slug = models.SlugField(
        "Уникальный слаг",
        unique=True,
        max_length=LenghtField.MAX_WORKSHEDULE_SLUG.value,
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "График работы"
        verbose_name_plural = "Графики работы"
        ordering = ["name"]


class ExperienceDetailed(models.Model):
    """Модель детального опыта работы детальный для кандидата."""

    name = models.CharField(
        "Опыт работы детальный",
        unique=True,
        max_length=LenghtField.MAX_EXPERIENCEDETAILED_NAME.value,
    )
    post = models.CharField(
        "Должность",
        max_length=LenghtField.MAX_EXPERIENCEDETAILED_POST.value,
    )
    date_start = models.IntegerField(
        "Дата начала работы",
        validators=[MinValueValidator(1000), MaxValueValidator(9999)],
    )
    date_end = models.IntegerField(
        "Дата окончания работы",
        validators=[MinValueValidator(1000), MaxValueValidator(9999)],
    )
    responsibilities = models.TextField("Обязанности на рабочем месте")
    slug = models.SlugField(
        "Уникальный слаг",
        unique=True,
        max_length=LenghtField.MAX_EXPERIENCEDETAILED_SLUG.value,
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Опыт работы детальный"
        verbose_name_plural = "Опыт работы детальный"
        ordering = ["name"]


class Education(models.Model):
    """Модель Образование для кандидата."""

    class EducationLevel(models.TextChoices):
        """Уровень образования."""

        HIGHER = "Высшее", ("Высшее")
        MASTER = "Магистр", ("Магистр")
        BACHELOR = "Бакалавр", ("Бакалавр")
        UNFINISHED_HIGHER = "Неоконченное", ("Неоконченное высшее")
        CANDIDATE_SCIENS = "Кандидат", ("Кандидат наук")
        DOCTOR_SCIENS = "Доктор наук", ("Доктор наук")
        NOT_SELECTED = "Не выбрано", ("Не выбрано")

    name = models.CharField(
        "Образование детально",
        unique=True,
        max_length=LenghtField.MAX_EDUCATION_NAME.value,
    )
    education_level = models.CharField(
        "Уровень образования",
        max_length=LenghtField.MAX_EDUCATION_LEVEL.value,
        choices=EducationLevel.choices,
        default=EducationLevel.HIGHER,
    )
    date_start = models.IntegerField(
        "Дата начала учебы",
        validators=[MinValueValidator(1000), MaxValueValidator(9999)],
    )
    date_graduation = models.IntegerField(
        "Дата окончания учебы",
        validators=[MinValueValidator(1000), MaxValueValidator(9999)],
    )
    name_university = models.CharField(
        "Учебное заведение",
        max_length=LenghtField.MAX_EDUCATION_NAME_UNIVERSITY.value,
        unique=True,
    )
    faculty = models.CharField(
        "Факультет",
        max_length=LenghtField.MAX_EDUCATION_FACULTY.value,
        unique=True,
    )
    specialization = models.CharField(
        "Специализация",
        max_length=LenghtField.MAX_EDUCATION_SPECIALIZATION.value,
        unique=True,
    )
    slug = models.SlugField(
        "Уникальный слаг",
        unique=True,
        max_length=LenghtField.MAX_EDUCATION_SLUG.value,
    )

    def __str__(self):
        return f"Образование: {self.education_level}"

    class Meta:
        verbose_name = "Образование"
        verbose_name_plural = "Образования"
        ordering = ["name"]


class Candidate(models.Model):
    """Модель для резюме кандидатов.

    Описывается следующими полями:

    first_name - Имя соискателя
    middle_name - Отчество соискателя
    last_name - Фамилия соискателя
    image - Фото соискателя.
    sex - пол
    age - возраст
    contacts_phone - телефон
    contacts_email - почта
    contacts_other - другой контакт
    activity - статус соискателя
    specialization - Направление специальности
    course - курс ЯП
    level - уровень кандидата
    hards - хард скилы
    softs - софт скилы
    experience - опыт работы
    employment_type - тип занятости
    work_schedule - график работы
    experience_detailed - детальный опыт работы
    about_me - обо мне
    education - образование
    """

    class Activity(models.TextChoices):
        """Статус соискателя."""

        ACTIVE = "AC", ("Активный")
        ON_HOLD = "OH", ("В ожидании")
        NOT_ACTIVE = "NA", ("Не доступен")

    class Sex(models.TextChoices):
        """Выбор пола соискателя."""

        MALE = "М", ("Мужской")
        FEMALE = "Ж", ("Женский")
        NOT_SELECTED = "Не выбран", ("Не выбран")

    last_name = models.CharField(
        "Фамилия",
        max_length=LenghtField.MAX_CANDIDATE_LAST_NAME.value,
    )
    first_name = models.CharField(
        "Имя",
        max_length=LenghtField.MAX_CANDIDATE_FIRST_NAME.value,
    )
    middle_name = models.CharField(
        "Отчество",
        max_length=LenghtField.MAX_CANDIDATE_MIDDLE_NAME.value,
    )
    image = models.ImageField(
        "Фото",
        upload_to="candidates/images/",
        null=True,
        default=None,
        blank=True,
    )
    sex = models.CharField(
        "Пол кандидата",
        max_length=LenghtField.MAX_CANDIDATE_SEX.value,
        choices=Sex.choices,
        default=Sex.NOT_SELECTED,
    )
    age = models.PositiveIntegerField(
        "Возраст",
        validators=[MinValueValidator(18), MaxValueValidator(90)],
    )
    contacts_phone = models.CharField(
        "Телефон",
        max_length=LenghtField.MAX_CANDIDATE_CONTACTS_PHONE.value,
    )
    contacts_email = models.EmailField(
        "Почта",
        max_length=LenghtField.MAX_CANDIDATE_CONTACTS_EMAIL.value,
        unique=True,
    )
    contacts_other = models.CharField(
        "Другой контакт",
        max_length=LenghtField.MAX_CANDIDATE_CONTACTS_OTHER.value,
        blank=True,
    )
    activity = models.CharField(
        max_length=2,
        choices=Activity.choices,
        default=Activity.NOT_ACTIVE,
        verbose_name="Статус соискателя",
    )
    location = models.CharField(
        "Местонахождение",
        max_length=LenghtField.MAX_CANDIDATE_LOCATION.value,
    )
    about_me = models.TextField(
        "Обо мне",
    )
    specialization = models.ForeignKey(
        Specialization,
        related_name="candidates",
        on_delete=models.CASCADE,
        verbose_name="Специализация",
        blank=True,
    )
    course = models.ManyToManyField(
        Course,
        related_name="candidates",
        verbose_name="Курс",
        blank=True,
        through="candidates.CourseInCandidate",
    )
    level = models.ForeignKey(
        Level,
        related_name="candidates",
        on_delete=models.CASCADE,
        verbose_name="Уровень",
        blank=True,
    )
    hards = models.ManyToManyField(
        HardCands,
        related_name="candidates",
        verbose_name="Хард скиллы",
        blank=True,
        through="candidates.HardsInCandidate",
    )
    softs = models.ManyToManyField(
        Soft,
        related_name="candidates",
        verbose_name="Soft скиллы",
        blank=True,
        through="candidates.SoftsInCandidate",
    )
    experience = models.ForeignKey(
        Experience,
        related_name="candidates",
        on_delete=models.CASCADE,
        verbose_name="Опыт работы",
        blank=True,
    )
    employment_type = models.ManyToManyField(
        EmploymentType,
        related_name="candidates",
        verbose_name="Тип занятости",
        blank=True,
        through="candidates.EmploymentTypeInCandidate",
    )
    work_schedule = models.ManyToManyField(
        WorkSchedule,
        related_name="candidates",
        verbose_name="График работы",
        blank=True,
        through="candidates.WorkScheduleInCandidate",
    )
    experience_detailed = models.ManyToManyField(
        ExperienceDetailed,
        related_name="candidates",
        verbose_name="Детальный опыт работы",
        blank=True,
        through="candidates.ExperienceDetailedInCandidate",
    )
    education = models.ManyToManyField(
        Education,
        related_name="candidates",
        verbose_name="Образование",
        blank=True,
        through="candidates.EducationInCandidate",
    )

    class Meta:
        verbose_name = "Кандидат"
        verbose_name_plural = "Кандидаты"
        ordering = ["last_name"]

    def __str__(self):
        return f"{self.last_name} {self.first_name}" f" {self.middle_name}"


class ExperienceDetailedInCandidate(models.Model):
    """
    Детали опыта работы у кандидата.
    У одного кандидата может быть 1 и более мест работы.
    """

    candidate = models.ForeignKey(
        Candidate,
        on_delete=models.CASCADE,
        related_name="experience_in_candidate",
        verbose_name="Кандидат",
    )
    experience_detailed = models.ForeignKey(
        ExperienceDetailed,
        on_delete=models.CASCADE,
        verbose_name="Детальный опыт работы",
    )


class EducationInCandidate(models.Model):
    """
    Детали образования у кандидата.
    У одного кандидата может быть 1 и более образований.
    """

    candidate = models.ForeignKey(
        Candidate,
        on_delete=models.CASCADE,
        related_name="education_in_candidate",
        verbose_name="Кандидат",
    )
    education = models.ForeignKey(
        Education,
        on_delete=models.CASCADE,
        verbose_name="Образование кандидата",
    )


class WorkScheduleInCandidate(models.Model):
    """
    Детали графика работы у кандидата.
    У одного кандидата может быть 1 и более графиков работ.
    """

    candidate = models.ForeignKey(
        Candidate,
        on_delete=models.CASCADE,
        related_name="workschedule_in_candidate",
        verbose_name="Кандидат",
    )
    work_schedule = models.ForeignKey(
        WorkSchedule,
        on_delete=models.CASCADE,
        verbose_name="График работы у кандидата.",
    )


class EmploymentTypeInCandidate(models.Model):
    """Детали типа занятости у кандидата.
    У одного кандидата может быть 1 и более типов занятости.
    """

    candidate = models.ForeignKey(
        Candidate,
        on_delete=models.CASCADE,
        related_name="employmenttype_in_candidate",
        verbose_name="Кандидат",
    )
    employment_type = models.ForeignKey(
        EmploymentType,
        on_delete=models.CASCADE,
        verbose_name="Тип занятости кандидата.",
    )


class SoftsInCandidate(models.Model):
    """Детали софт скилов у кандидата.
    У одного кандидата может быть 1 и более типов скиллов.
    """

    candidate = models.ForeignKey(
        Candidate,
        on_delete=models.CASCADE,
        related_name="softs_in_candidate",
        verbose_name="Кандидат",
    )
    softs = models.ForeignKey(
        Soft, on_delete=models.CASCADE, verbose_name="Cофт скилы кандидата."
    )


class HardsInCandidate(models.Model):
    """Детали хард скилы у кандидата.
    У одного кандидата может быть 1 и более хард скилл.
    """

    candidate = models.ForeignKey(
        Candidate,
        on_delete=models.CASCADE,
        related_name="hards_in_candidate",
        verbose_name="Кандидат",
    )
    hards = models.ForeignKey(
        HardCands,
        on_delete=models.CASCADE,
        verbose_name="Хард скилы кандидата.",
    )


class CourseInCandidate(models.Model):
    """Детали курс ЯП у кандидата.
    У одного кандидата может быть 1 и более курс ЯП.
    """

    candidate = models.ForeignKey(
        Candidate,
        on_delete=models.CASCADE,
        related_name="course_in_candidate",
        verbose_name="Кандидат",
    )
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, verbose_name="Курсы ЯП кандидата."
    )


class Contact(models.Model):
    """Модель для кандидатов для контакта.

    Описывается следующими полями:

    user - Пользователь добавивший кандидата к контактам.
    candidate - Добавленный кандидат.
    """

    user = models.ForeignKey(
        MyUser,
        on_delete=models.CASCADE,
        related_name="contact",
    )
    candidate = models.ForeignKey(
        Candidate, on_delete=models.CASCADE, related_name="contact"
    )

    class Meta:
        verbose_name = "Кандидат для контакта"
        verbose_name_plural = "Кандидаты для контакта"
        constraints = [
            models.UniqueConstraint(
                fields=["user", "candidate"], name="user_contact"
            )
        ]


class Track(models.Model):
    """Модель для отслеживаемых кандидатов.

    Описывается следующими полями:

    user - Пользователь добавивший кандидата в отслеживаемые.
    candidate - Добавленный кандидат.
    """

    user = models.ForeignKey(
        MyUser,
        on_delete=models.CASCADE,
        related_name="tracks",
    )
    candidate = models.ForeignKey(
        Candidate,
        on_delete=models.CASCADE,
        related_name="tracks",
    )

    class Meta:
        verbose_name = "Отслеживаемый"
        verbose_name_plural = "Отслеживаемые"
        constraints = [
            models.UniqueConstraint(
                fields=["user", "candidate"], name="user_candidate"
            )
        ]
