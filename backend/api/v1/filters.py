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
    specialization_id = filters.ModelMultipleChoiceFilter(
        field_name="specialization_id__name",
        to_field_name="name",
        queryset=Specialization.objects.all(),
    )
    course = filters.ModelMultipleChoiceFilter(
        field_name="course__name",
        to_field_name="name",
        queryset=Course.objects.all(),
    )
    level_id = filters.ModelMultipleChoiceFilter(
        field_name="level_id__name",
        to_field_name="name",
        queryset=Level.objects.all(),
    )
    experience_id = filters.ModelMultipleChoiceFilter(
        field_name="experience_id__name",
        to_field_name="name",
        queryset=Experience.objects.all(),
    )
    work_schedule = filters.ModelMultipleChoiceFilter(
        field_name="work_schedule__name",
        to_field_name="name",
        queryset=WorkSchedule.objects.all()
    )
    employment_type = filters.ModelMultipleChoiceFilter(
        field_name="employment_type__name",
        to_field_name="name",
        queryset=EmploymentType.objects.all(),
    )

    is_tracked = filters.BooleanFilter(method="is_tracked_filter")

    hards = filters.ModelMultipleChoiceFilter(
        field_name = "hards__name",
        to_field_name="name",
        queryset = HardCands.objects.all(),
    )

    location = filters.ModelMultipleChoiceFilter(
        field_name = "location",
        to_field_name="location",
        queryset = Candidate.objects.all().distinct("location").order_by(),
    )
    class Meta:
        model = Candidate
        fields = ("specialization_id", "course", "level_id", "experience_id", "work_schedule", "employment_type", "hards", "is_tracked")

    def is_tracked_filter(self, queryset, name, value):
        user = self.request.user
        if value and not user.is_anonymous:
            return queryset.filter(tracks__user=user)
        return queryset


