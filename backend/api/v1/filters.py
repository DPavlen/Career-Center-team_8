from django_filters.rest_framework import FilterSet, filters

from candidates.models import Specialization, Candidate, Course, Level, Experience, WorkSchedule, EmploymentType, HardCands 


class HardsCandsFilter(FilterSet):
    name = filters.CharFilter(field_name="name", method="name_filter")

    def name_filter(self, queryset, name, value):
        return queryset.filter(name__istartswith=value)

    class Meta:
        model = HardCands
        fields = ("name",)


class CandidatesFilter(FilterSet):
    specialization = filters.ModelChoiceFilter(
        field_name="specialization__slug",
        to_field_name="slug",
        queryset=Specialization.objects.all(),
    )
    course = filters.ModelChoiceFilter(
        field_name="course__slug",
        to_field_name="slug",
        queryset=Course.objects.all(),
    )
    level = filters.ModelChoiceFilter(
        field_name="level__slug",
        to_field_name="slug",
        queryset=Level.objects.all(),
    )
    experience = filters.ModelChoiceFilter(
        field_name="experience__slug",
        to_field_name="slug",
        queryset=Experience.objects.all(),
    )
    work_schedule = filters.ModelMultipleChoiceFilter(
        field_name="work_schedule__slug",
        to_field_name="slug",
        queryset=WorkSchedule.objects.all()
    )
    employment_type = filters.ModelMultipleChoiceFilter(
        field_name="employment_type__slug",
        to_field_name="slug",
        queryset=EmploymentType.objects.all(),
    )
    is_tracked = filters.BooleanFilter(method="is_tracked_filter")
    hards_cands = filters.ModelMultipleChoiceFilter(
        field_name = "hards_cands__slug",
        to_field_name="slug",
        queryset = HardCands.objects.all(),
    )

    class Meta:
        model = Candidate
        fields = ("specialization", "course", "level", "experience", "work_schedule", "employment_type", "hards_cands", "is_tracked")

    def is_tracked_filter(self, queryset, name, value):
        user = self.request.user
        if value and not user.is_anonymous:
            return queryset.filter(tracks__user=user)
        return queryset


