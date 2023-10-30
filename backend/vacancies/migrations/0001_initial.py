

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("candidates", "0004_delete_detailincandidate"),
    ]

    operations = [
        migrations.CreateModel(
            name="Hard",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "spec_id",
                    models.PositiveIntegerField(
                        verbose_name="ID Специальности"
                    ),
                ),
                (
                    "name",
                    models.CharField(
                        max_length=255, unique=True, verbose_name="Название"
                    ),
                ),
                (
                    "slug",
                    models.SlugField(
                        max_length=255,
                        unique=True,
                        verbose_name="Уникальный слаг",
                    ),
                ),
                (
                    "develop",
                    models.PositiveIntegerField(
                        verbose_name="Навык разработчика"
                    ),
                ),
                (
                    "data_sc",
                    models.PositiveIntegerField(
                        verbose_name="Навык Data Science"
                    ),
                ),
                (
                    "design",
                    models.PositiveIntegerField(
                        verbose_name="Навык дизайнера"
                    ),
                ),
                (
                    "manager",
                    models.PositiveIntegerField(
                        verbose_name="Навык менеджера"
                    ),
                ),
                (
                    "marketing",
                    models.PositiveIntegerField(
                        verbose_name="Навык маркетолога"
                    ),
                ),
            ],
            options={
                "verbose_name": "Hard скилл",
                "verbose_name_plural": "Hard скиллы",
                "ordering": ["name"],
            },
        ),
        migrations.CreateModel(
            name="Vacancy",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "pub_date",
                    models.DateTimeField(
                        auto_now_add=True, verbose_name="Дата создания"
                    ),
                ),
                (
                    "name",
                    models.CharField(
                        max_length=255,
                        unique=True,
                        verbose_name="Название/Должность",
                    ),
                ),
                (
                    "company",
                    models.CharField(max_length=255, verbose_name="Компания"),
                ),
                (
                    "salary_low",
                    models.PositiveIntegerField(
                        blank=True, verbose_name="Уровень дохода мин."
                    ),
                ),
                (
                    "salary_high",
                    models.PositiveIntegerField(
                        blank=True, verbose_name="Уровень дохода макс."
                    ),
                ),
                (
                    "responsibilities",
                    models.TextField(verbose_name="Обязанности"),
                ),
                (
                    "requirements",
                    models.TextField(verbose_name="Обязательные требования"),
                ),
                (
                    "optional",
                    models.TextField(verbose_name="Необязательные требования"),
                ),
                ("conditions", models.TextField(verbose_name="Условия")),
                ("stages", models.TextField(verbose_name="Этапы отбора")),
                (
                    "location",
                    models.CharField(
                        blank=True,
                        max_length=150,
                        verbose_name="Местонахождение",
                    ),
                ),
                (
                    "author",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="vacancies",
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="Автор вакансии",
                    ),
                ),
                (
                    "course",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="vacancies",
                        to="candidates.course",
                        verbose_name="Курс ЯП",
                    ),
                ),
                (
                    "employment_type",
                    models.ManyToManyField(
                        related_name="vacancies",
                        to="candidates.employmenttype",
                        verbose_name="Тип занятости",
                    ),
                ),
                (
                    "experience",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="vacancies",
                        to="candidates.experience",
                        verbose_name="Опыт работы",
                    ),
                ),
                (
                    "hards",
                    models.ManyToManyField(
                        related_name="vacancies",
                        to="vacancies.hard",
                        verbose_name="Хард скиллы",
                    ),
                ),
                (
                    "level",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="vacancies",
                        to="candidates.level",
                        verbose_name="Уровень",
                    ),
                ),
                (
                    "specialization",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="vacancies",
                        to="candidates.specialization",
                        verbose_name="Специализация",
                    ),
                ),
                (
                    "work_schedule",
                    models.ManyToManyField(
                        related_name="vacancies",
                        to="candidates.workschedule",
                        verbose_name="График работы",
                    ),
                ),
            ],
            options={
                "verbose_name": "Вакансия",
                "verbose_name_plural": "Вакансии",
                "ordering": ["-pub_date"],
            },
        ),
        migrations.CreateModel(
            name="WorkScheduleInVacancy",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "schedule",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="schedulesinvacancy",
                        to="candidates.employmenttype",
                    ),
                ),
                (
                    "vacancy",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="vacancyschedule",
                        to="vacancies.vacancy",
                        verbose_name="Вакансия",
                    ),
                ),
            ],
            options={
                "verbose_name": "Графики в вакансии",
                "verbose_name_plural": "Графики в вакансиях",
            },
        ),
        migrations.CreateModel(
            name="HardsInVacancy",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "hard",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="hardsinvacancy",
                        to="vacancies.hard",
                    ),
                ),
                (
                    "vacancy",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="vacancyhard",
                        to="vacancies.vacancy",
                        verbose_name="Вакансия",
                    ),
                ),
            ],
            options={
                "verbose_name": "Харды в вакансии",
                "verbose_name_plural": "Харды в вакансиях",
            },
        ),
        migrations.CreateModel(
            name="EmploymentTypeInVacancy",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "type",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="typesinvacancy",
                        to="candidates.employmenttype",
                    ),
                ),
                (
                    "vacancy",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="vacancytype",
                        to="vacancies.vacancy",
                        verbose_name="Вакансия",
                    ),
                ),
            ],
            options={
                "verbose_name": "Типы в вакансии",
                "verbose_name_plural": "Типы в вакансиях",
            },
        ),
    ]
