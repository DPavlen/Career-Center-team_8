from django.contrib import admin
from django.db.models import Count

from candidates.models import (
    Specialization,
    Course,
    Level,
    HardCands,
    Soft,
    Experience,
    EmploymentType,
    WorkSchedule,
    Candidate,
    Contact,
    Track,
    ExperienceDetailed,
    Education,
    ExperienceDetailedInCandidate,
    EducationInCandidate,
    WorkScheduleInCandidate,
    EmploymentTypeInCandidate,
    SoftsInCandidate,
    HardsInCandidate,
    CourseInCandidate
)


@admin.register(Specialization)
class SpecializationAdmin(admin.ModelAdmin):
    list_display = ("pk", "name", "slug")
    list_display_links = ("name",)
    search_fields = ("name",)
    empty_value_display = "-пусто-"


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    """Вывести Название специальности."""
    list_display = ("pk", "spec_id", "name", "slug")
    list_display_links = ("name",)
    search_fields = ("name",)
    empty_value_display = "-пусто-"


@admin.register(Level)
class LevelAdmin(admin.ModelAdmin):
    list_display = ("pk", "name", "slug")
    list_display_links = ("name",)
    search_fields = ("name",)
    empty_value_display = "-пусто-"


@admin.register(HardCands)
class HardCandsAdmin(admin.ModelAdmin):
    list_display = ("pk", "name", "slug")
    list_display_links = ("name",)
    search_fields = ("name",)
    empty_value_display = "-пусто-"


@admin.register(Soft)
class SoftAdmin(admin.ModelAdmin):
    list_display = ("pk", "name", "slug")
    list_display_links = ("name",)
    search_fields = ("name",)
    empty_value_display = "-пусто-"


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("pk", "name", "slug")
    list_display_links = ("name",)
    search_fields = ("name",)
    empty_value_display = "-пусто-"


@admin.register(EmploymentType)
class EmploymentTypeAdmin(admin.ModelAdmin):
    list_display = ("pk", "name", "slug")
    list_display_links = ("name",)
    search_fields = ("name",)
    empty_value_display = "-пусто-"


@admin.register(WorkSchedule)
class WorkScheduleAdmin(admin.ModelAdmin):
    list_display = ("pk", "name", "slug")
    list_display_links = ("name",)
    search_fields = ("name",)
    empty_value_display = "-пусто-"


@admin.register(Candidate)
class CandidateAdmin(admin.ModelAdmin):
    list_display = ("pk", "last_name", "first_name", "activity", "tracks")
    list_display_links = ("last_name",)
    search_fields = (
        "last_name",
        "specialization",
        "course",
    )
    list_filter = ("specialization", "course")
    empty_value_display = "-пусто-"

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        queryset = (
            queryset.
            prefetch_related("specialization", "course")
            .annotate(favorited=Count("tracks"))
        )
        return queryset

    def tracks(self, obj):
        return obj.favorited

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ("pk", "user", "candidate")
    list_display_links = ("user", "candidate")
    search_fields = (
        "user__username",
        "candidate__contacts_email",
        "candidate__last_name",
    )
    empty_value_display = "-пусто-"

    def get_queryset(self, request):
        queryset = (
            super().get_queryset(request).
            select_related("user", "candidate")
        )
        return queryset


@admin.register(Track)
class TrackAdmin(admin.ModelAdmin):
    list_display = ("pk", "user", "candidate")
    list_display_links = ("user", "candidate")
    search_fields = (
        "user__username",
        "candidate__contacts_email",
        "candidate__last_name",
    )
    empty_value_display = "-пусто-"

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        queryset = queryset.select_related("user", "candidate")
        return queryset


@admin.register(ExperienceDetailed)
class ExperienceDetailedAdmin(admin.ModelAdmin):
    list_display = ("pk", "name", "post", "responsibilities")
    list_display_links = ("name",)
    search_fields = ("name",)
    empty_value_display = "-пусто-"


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ("pk", "name", 
                    "name_university", "specialization")
    list_display_links = ("name", "name_university",)
    search_fields = ("name",)
    empty_value_display = "-пусто-"


@admin.register(EducationInCandidate)
class EducationInCandidateAdmin(admin.ModelAdmin):
    """
    Класс администратора для модели StudentSchedule.

    Параметры:
        - list_display: Поля, которые будут отображаться в списке связей
        студентов и графиков работы.
        - list_filter: Поля, по которым можно фильтровать список связей.
        - search_fields: Поля, по которым можно выполнять поиск связей.

    Модель:
        - .
    """
    list_display = ('id', 'candidate', 'education')
    list_filter = ('candidate', 'education')
    # search_fields = (
    #     'candidate__first_name',
    #     'candidate__last_name',
    #     'candidate__name'
    # )


@admin.register(ExperienceDetailedInCandidate)
class ExperienceDetailedInCandidateAdmin(admin.ModelAdmin):
    """
    Класс администратора для модели StudentSchedule.

    Параметры:
        - list_display: Поля, которые будут отображаться в списке связей
        кандидат и детального опыта работы.
        - list_filter: Поля, по которым можно фильтровать список связей.
        - search_fields: Поля, по которым можно выполнять поиск связей.

    Модель:
        - .
    """
    list_display = ('id', 'candidate', 'experience_detailed')
    list_filter = ('candidate', 'experience_detailed')
    # search_fields = (
    #     'сandidate'
    # )

@admin.register(WorkScheduleInCandidate)
class WorkScheduleInCandidateAdmin(admin.ModelAdmin):
    """
    Класс администратора для модели StudentSchedule.

    Параметры:
        - list_display: Поля, которые будут отображаться в списке связей
        кандидат и детального опыта работы.
        - list_filter: Поля, по которым можно фильтровать список связей.
        - search_fields: Поля, по которым можно выполнять поиск связей.

    Модель:
        - .
    """
    list_display = ('id', 'candidate', 'work_schedule')
    list_filter = ('candidate', 'work_schedule')
    # search_fields = (
    #     'сandidate'
    # )


@admin.register(EmploymentTypeInCandidate)
class EmploymentTypeInCandidate(admin.ModelAdmin):
    """
    Класс администратора для модели StudentSchedule.

    Параметры:
        - list_display: Поля, которые будут отображаться в списке связей
        кандидат и детального опыта работы.
        - list_filter: Поля, по которым можно фильтровать список связей.
        - search_fields: Поля, по которым можно выполнять поиск связей.

    Модель:
        - .
    """
    list_display = ('id', 'candidate', 'employment_type')
    list_filter = ('candidate', 'employment_type')
    # search_fields = (
    #     'сandidate'
    # )


@admin.register(SoftsInCandidate)
class SoftsInCandidate(admin.ModelAdmin):
    """
    Класс администратора для модели StudentSchedule.

    Параметры:
        - list_display: Поля, которые будут отображаться в списке связей
        кандидат и детального опыта работы.
        - list_filter: Поля, по которым можно фильтровать список связей.
        - search_fields: Поля, по которым можно выполнять поиск связей.

    Модель:
        - .
    """
    list_display = ('id', 'candidate', 'softs')
    list_filter = ('candidate', 'softs')
    # search_fields = (
    #     'сandidate'
    # )

@admin.register(HardsInCandidate)
class HardsInCandidate(admin.ModelAdmin):
    """
    Класс администратора для модели StudentSchedule.

    Параметры:
        - list_display: Поля, которые будут отображаться в списке связей
        кандидат и детального опыта работы.
        - list_filter: Поля, по которым можно фильтровать список связей.
        - search_fields: Поля, по которым можно выполнять поиск связей.

    Модель:
        - .
    """
    list_display = ('id', 'candidate', 'hards')
    list_filter = ('candidate', 'hards')
    # search_fields = (
    #     'сandidate'
    # )


@admin.register(CourseInCandidate)
class CourseInCandidate(admin.ModelAdmin):
    """
    Класс администратора для модели StudentSchedule.

    Параметры:
        - list_display: Поля, которые будут отображаться в списке связей
        кандидат и детального опыта работы.
        - list_filter: Поля, по которым можно фильтровать список связей.
        - search_fields: Поля, по которым можно выполнять поиск связей.

    Модель:
        - .
    """
    list_display = ('id', 'candidate', 'course')
    list_filter = ('candidate', 'course')
    # search_fields = (
    #     'сandidate'
    # )