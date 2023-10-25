from django.core.validators import MaxValueValidator, MinValueValidator
from django.forms import ValidationError
from rest_framework import serializers
from rest_framework.fields import IntegerField, SerializerMethodField
from rest_framework.relations import PrimaryKeyRelatedField
from drf_extra_fields.fields import Base64ImageField

from candidates.models import (
    ExperienceDetailed,
    DetailInCandidate,
    Education,
    Candidate,)


class ExperienceDetailedSerializer(serializers.ModelSerializer):
    """Сериализатор для получения 
    детального опыта работы кандидата."""

    class Meta:
        model = ExperienceDetailed
        fields = (
            "id",
            "name",
            "date_start",
            "date_end",
            "post",
            "responsibilities",
        )
        read_only_fields = ("__all__",)


# class DetailInCandidateSerializer(serializers.ModelSerializer):
#     """Сериализатор для получения детального 
#     опыта работы у кандидата. Их может быть несколько."""

#     id = IntegerField(write_only=True)

#     class Meta:
#         model = DetailInCandidate
#         fields = (
#             "id",
#             "amount",
#         )


class EducationSerializer(serializers.ModelSerializer):
    """Сериализатор для получения информации об 
    образовании кандидата."""

    class Meta:
        model = Education
        fields = (
            "id",
            "name",
            "level",
            "date_start",
            "date_graduation",
            "name_university",
            "faculty",
            "specialization",
        )
        read_only_fields = ("__all__",)


class CandidateSerializer(serializers.ModelSerializer):
    """Сериализатор для получения полной 
    информации о кандидате."""
    # id = IntegerField(read_only=True)
    experience_detailed = SerializerMethodField()
    education = SerializerMethodField()
    # image = Base64ImageField()
    class Meta:
        model = Candidate
        fields = (
            "id",
            "last_name",
            "first_name",
            "middle_name",
            "experience_detailed",
            "education",
            "image",
            "sex",
            "age",
            "contacts_phone",
            "contacts_email",
            "contacts_other",
            "activity",
            "location",
            "specialization",
            "course",
            "level",
            "hards",
            "softs",
            "experience",
            "employment_type",
            "work_schedule"
        )


    def get_experience_detailed(self, obj):
        """Получаем список детального опыта работы для кандидата."""
        candidate = obj
        experience_detailed= candidate.experience_detailed.values(
            "id",
            "name",
            "date_start",
            "date_end",
            "post",
            "responsibilities",
            # amount=F("detailincandidate__amount"),
        )
        return experience_detailed
    

    def get_education(self, obj):
        """Получаем список данных об образовани для кандидата."""
        candidate = obj
        education= candidate.education.values(
           "id",
            "name",
            "level",
            "date_start",
            "date_graduation",
            "name_university",
            "faculty",
            "specialization",
        )
        return education