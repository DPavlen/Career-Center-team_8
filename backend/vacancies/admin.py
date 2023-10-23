from django.contrib import admin
from django.db.models import Count

from .models import (
    Hard, HardsInVacancy, Vacancy
)

@admin.register(Hard)
class HardAdmin(admin.ModelAdmin):
    list_display = ("pk", "spec_id", "name", "slug")
    list_display_links = ("name",)
    search_fields = ("name",)
    empty_value_display = "-пусто-"


@admin.register(Vacancy)
class VacancyAdmin(admin.ModelAdmin):
    list_display = ("pk", "name", "author", "description")
    list_display_links = ("name",)
    search_fields = (
        "author__username",
        "name",
        "author__email",
    )
    list_filter = ("author", "name")
    empty_value_display = "-пусто-"


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
