from django.db import models
from django.core.validators import MinValueValidator
from django.contrib.auth import get_user_model

User = get_user_model()


class Specialization(models.Model):
    """Модель направления специальности.

    Описывается следующими полями:

    name - Название направления специальности.
    slug - слаг направления специальности.
    """

    name = models.CharField(
        "Название",
        unique=True,
        max_length=255,
    )
    slug = models.SlugField(
        "Уникальный слаг",
        unique=True,
        max_length=255,
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
        max_length=255,
    )
    spec_id = models.PositiveIntegerField(
        "ID Специальности",
    )
    slug = models.SlugField(
        "Уникальный слаг",
        unique=True,
        max_length=255,
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
        max_length=10,
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
        max_length=255,
    )
    slug = models.SlugField(
        "Уникальный слаг",
        unique=False,
        max_length=255,
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
        max_length=255,
    )
    slug = models.SlugField(
        "Уникальный слаг",
        unique=True,
        max_length=255,
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
        max_length=20,
    )
    slug = models.SlugField(
        "Уникальный слаг",
        unique=True,
        max_length=20,
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
        max_length=20,
    )
    slug = models.SlugField(
        "Уникальный слаг",
        unique=True,
        max_length=20,
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
        max_length=20,
    )
    slug = models.SlugField(
        "Уникальный слаг",
        unique=True,
        max_length=20,
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "График работы"
        verbose_name_plural = "Графики работы"
        ordering = ["name"]


class Candidate(models.Model):
    """Модель для резюме кандидатов.

    Описывается следующими полями:

    fist_name - Имя соискателя
    middle_name - Отчество соискателя
    last_name - Фамилия соискателя
    image - Фото соискателя.
    sex - пол
    age - возраст
    contacts_phone - телефон
    contacts_email - почта
    contacts_other - другой контакт
    specialization - Направление специальности
    course - курс ЯП
    level - уровень кандидата
    hards - хард скилы
    softs - софт скилы
    experience - опыт работы
    employment_type - тип занятости
    work_schedule - график работы
    """
    class Activity(models.TextChoices):
        ACTIVE = 'AC', ('Активный')
        ON_HOLD = 'OH', ('В ожидании')
        NOT_ACTIVE = 'NA', ('Не доступен')
        
    
    last_name = models.CharField(
        "Фамилия",
        max_length=25,
    )
    first_name = models.CharField(
        "Имя",
        max_length=20,
    )
    middle_name = models.CharField(
        "Отчество",
        max_length=25,
    )
    image = models.ImageField(
        "Фото", 
        upload_to="candidates/images/", 
        null=True, 
        default=None,
    )
    sex = models.CharField(
        "Пол",
        max_length=10,
    )
    age = models.PositiveIntegerField(
        "Возраст",
        validators=[MinValueValidator(18)],
    )
    contacts_phone = models.CharField(
        "Телефон",
        max_length=20,
    )
    contacts_email = models.EmailField(
        "Почта",
        max_length=255,
        unique=True,
    )
    contacts_other = models.CharField(
        "Другой контакт",
        max_length=150,
        blank=True,
    )
    activity = models.CharField(
        max_length=2,
        choices=Activity.choices,
        default=Activity.NOT_ACTIVE,
    )
    location =  models.CharField(
        "Местонахождение",
        max_length=150,
        blank=True,
    )
    specialization = models.ManyToManyField(
        Specialization,
        related_name="candidates",
        verbose_name="Специализация",
    )
    course = models.ManyToManyField(
        Course,
        related_name="candidates",
        verbose_name="Курс",
    )
    level = models.ManyToManyField(
        Level,
        related_name="candidates",
        verbose_name="Уровень",
    )
    hards = models.ManyToManyField(
        HardCands,
        related_name="candidates",
        verbose_name="Хард скиллы",
    )
    softs = models.ManyToManyField(
        Soft,
        related_name="candidates",
        verbose_name="Soft скиллы",
    )
    experience = models.ManyToManyField(
        Experience,
        related_name="candidates",
        verbose_name="Опыт работы",
    )
    employment_type = models.ManyToManyField(
        EmploymentType,
        related_name="candidates",
        verbose_name="Тип занятости",
    )
    work_schedule = models.ManyToManyField(
        WorkSchedule,
        related_name="candidates",
        verbose_name="График работы",
    )

    class Meta:
        verbose_name = "Кандидат"
        verbose_name_plural = "Кандидаты"
        ordering = ["last_name"]

    def __str__(self):
        return self.last_name


class Contact(models.Model):
    """Модель для кандидатов для контакта.

    Описывается следующими полями:

    user - Пользователь добавивший кандидата к контактам.
    candidate - Добавленный кандидат.
    """

    user = models.ForeignKey(
        User,
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
        User,
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
