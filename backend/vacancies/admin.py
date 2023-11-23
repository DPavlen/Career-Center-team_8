from django.contrib import admin

from .models import (
    EmploymentTypeInVacancy,
    Hard,
    HardsInVacancy,
    Vacancy,
    WorkScheduleInVacancy,
)


class VacancyHardsInline(admin.TabularInline):
    model = HardsInVacancy
    verbose_name_plural = "Hard-скиллы"
    extra = 0


class VacancyTypeInline(admin.TabularInline):
    model = EmploymentTypeInVacancy
    verbose_name_plural = "Типы занятости"
    extra = 0


class VacancyScheduleInline(admin.TabularInline):
    model = WorkScheduleInVacancy
    verbose_name_plural = "Графики работы"
    extra = 0


@admin.register(Hard)
class HardAdmin(admin.ModelAdmin):
    list_display = ("pk", "spec_id", "name", "slug")
    list_display_links = ("name",)
    search_fields = ("name",)
    empty_value_display = "-пусто-"


@admin.register(Vacancy)
class VacancyAdmin(admin.ModelAdmin):
    list_display = (
        "pk",
        "name",
        "author",
        "pub_date",
        "hards_count",
    )
    list_display_links = ("name",)
    search_fields = (
        "author__username",
        "name",
        "author__email",
    )
    list_filter = ("author", "name", "pub_date")
    empty_value_display = "-пусто-"
    inlines = [VacancyHardsInline, VacancyTypeInline, VacancyScheduleInline]

    @admin.display(description="Кол-во хардов")
    def hards_count(self, obj):
        return obj.hards.count()

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        queryset = queryset.select_related("author").prefetch_related(
            "hards", "employment_type", "work_schedule"
        )
        return queryset


@admin.register(HardsInVacancy)
class HardInVacancyAdmin(admin.ModelAdmin):
    list_display = ("pk", "vacancy", "hard")
    list_display_links = ("vacancy", "hard")
    empty_value_display = "-пусто-"

    def get_queryset(self, request):
        queryset = (
            super()
            .get_queryset(request)
            .select_related("vacancy")
            .prefetch_related("hard")
        )
        return queryset


@admin.register(EmploymentTypeInVacancy)
class EmploymentTypeInVacancyAdmin(admin.ModelAdmin):
    list_display = ("pk", "vacancy", "type")
    list_display_links = ("vacancy", "type")
    empty_value_display = "-пусто-"

    def get_queryset(self, request):
        queryset = (
            super()
            .get_queryset(request)
            .select_related("vacancy")
            .prefetch_related("type")
        )
        return queryset


@admin.register(WorkScheduleInVacancy)
class WorkScheduleInVacancyAdmin(admin.ModelAdmin):
    list_display = ("pk", "vacancy", "schedule")
    list_display_links = ("vacancy", "schedule")
    empty_value_display = "-пусто-"

    def get_queryset(self, request):
        queryset = (
            super()
            .get_queryset(request)
            .select_related("vacancy")
            .prefetch_related("schedule")
        )
        return queryset
