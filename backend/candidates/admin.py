from django.contrib import admin
from django.db.models import Count

from .models import (
    Specialization,
    Course,
    Level,
    Hard,
    Soft,
    Experience,
    EmploymentType,
    WorkSchedule,
    Candidate,
    Contact,
    Track,
)


@admin.register(Specialization)
class SpecializationAdmin(admin.ModelAdmin):
    list_display = ("pk", "name", "slug")
    list_display_links = ("name",)
    search_fields = ("name",)
    empty_value_display = "-пусто-"


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("pk", "name", "slug")
    list_display_links = ("name",)
    search_fields = ("name",)
    empty_value_display = "-пусто-"


@admin.register(Level)
class LevelAdmin(admin.ModelAdmin):
    list_display = ("pk", "name", "slug")
    list_display_links = ("name",)
    search_fields = ("name",)
    empty_value_display = "-пусто-"


@admin.register(Hard)
class HardAdmin(admin.ModelAdmin):
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
    list_display = ("pk", "last_name", "first_name", "tracks")
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
            queryset.select_related("last_name")
            .prefetch_related("specialization", "course")
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
            super().get_queryset(request).select_related("user", "candidate")
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
