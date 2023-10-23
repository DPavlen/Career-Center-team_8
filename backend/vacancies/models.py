from django.db import models
from django.contrib.auth import get_user_model
from candidates.models import (
    Specialization,
    Soft,
    EmploymentType,
    Experience,
    WorkSchedule,
    Level,
)

User = get_user_model()


class Hard(models.Model):
    """Модель хард скилла для вакансии.

    Описывается следующими полями:

    name - Название хард скилла.
    slug - слаг hard скилла.
    spec_id - id профессии
    develop - если 1, то навык для разработчиков
    data_sc - если 1, то навык для аналитики данных
    design - если 1, то навык для дизайнеров
    manager - если 1, то навык для менеджеров
    marketing - если 1, то навык для маркетологов
    """

    spec_id = models.PositiveIntegerField(
        "ID Специальности",
    )
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
    develop =  models.PositiveIntegerField(
        "Навык разработчика",
    )
    data_sc =  models.PositiveIntegerField(
        "Навык Data Science",
    )
    design =  models.PositiveIntegerField(
        "Навык дизайнера",
    )
    manager =  models.PositiveIntegerField(
        "Навык менеджера",
    )
    marketing =  models.PositiveIntegerField(
        "Навык маркетолога",
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Hard скилл"
        verbose_name_plural = "Hard скиллы"
        ordering = ["name"]


class Vacancy(models.Model):
    """Модель для вакансии от HR.

    Описывается следующими полями:
    author - HR добвивший вакансию
    name - наименование вакансии
    specialization - Направление специальности
    level - уровень кандидата
    hards - хард скилы
    softs - софт скилы
    experience - опыт работы
    employment_type - тип занятости
    work_schedule - график работы
    description - описание вакансии
    """

    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name="Автор вакансии",
        related_name="vacancies",
    )
    name = models.CharField(
        "Название",
        unique=True,
        max_length=255,
    )
    specialization = models.ManyToManyField(
        Specialization,
        related_name="vacancies",
        verbose_name="Специализация",
    )
    level = models.ManyToManyField(
        Level,
        related_name="vacancies",
        verbose_name="Уровень",
    )
    hards = models.ManyToManyField(
        Hard,
        related_name="vacancies",
        verbose_name="Хард скиллы",
    )
    softs = models.ManyToManyField(
        Soft,
        related_name="vacancies",
        verbose_name="Soft скиллы",
    )
    experience = models.ManyToManyField(
        Experience,
        related_name="vacancies",
        verbose_name="Опыт работы",
    )
    employment_type = models.ManyToManyField(
        EmploymentType,
        related_name="vacancies",
        verbose_name="Тип занятости",
    )
    work_schedule = models.ManyToManyField(
        WorkSchedule,
        related_name="vacancies",
        verbose_name="График работы",
    )
    description = models.CharField(
        "Описание",
        max_length=2000,
    )

    class Meta:
        verbose_name = "Вакансия"
        verbose_name_plural = "Вакансии"
        ordering = ["name"]

    def __str__(self):
        return self.name

class HardsInVacancy(models.Model):
    """Модель хардов в вакансии.

    Описывается следующими полями:

    hard - хард-скилл из модели хардов.
    """

    vacancy = models.ForeignKey(
        Vacancy,
        on_delete=models.CASCADE,
        related_name="vacancyhard",
        verbose_name="Вакансия",
    )

    hard = models.ForeignKey(
        Hard,
        on_delete=models.CASCADE,
        related_name="hardsinvacancy",
    )

    def __str__(self):
        return f"{self.hard.name}"

    class Meta:
        verbose_name = "Харды в вакансии"
        verbose_name_plural = "Харды в вакансиях"

class EmploymentTypeInVacancy(models.Model):
    """Модель типа занятости в вакансии.

    Описывается следующими полями:

    type - тип из модели типов занятости.
    """

    vacancy = models.ForeignKey(
        Vacancy,
        on_delete=models.CASCADE,
        related_name="vacancytype",
        verbose_name="Вакансия",
    )

    type = models.ForeignKey(
        EmploymentType,
        on_delete=models.CASCADE,
        related_name="typesinvacancy",
    )

    def __str__(self):
        return f"{self.type.name}"

    class Meta:
        verbose_name = "Типы в вакансии"
        verbose_name_plural = "Типы в вакансиях"

class WorkScheduleInVacancy(models.Model):
    """Модель графика работы в вакансии.

    Описывается следующими полями:

    schedule - график из модели графиков занятости.
    """

    vacancy = models.ForeignKey(
        Vacancy,
        on_delete=models.CASCADE,
        related_name="vacancyschedule",
        verbose_name="Вакансия",
    )

    schedule = models.ForeignKey(
        EmploymentType,
        on_delete=models.CASCADE,
        related_name="schedulesinvacancy",
    )

    def __str__(self):
        return f"{self.schedule.name}"

    class Meta:
        verbose_name = "Графики в вакансии"
        verbose_name_plural = "Графики в вакансиях"        