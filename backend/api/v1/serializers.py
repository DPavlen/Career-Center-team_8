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
    course = SerializerMethodField()
    level = SerializerMethodField()
    hards = SerializerMethodField()
    softs = SerializerMethodField()
    experience = SerializerMethodField()
    employment_type = SerializerMethodField()
    work_schedule = SerializerMethodField()

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
        experience_detailed= obj.experience_detailed.values(
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
        education= obj.education.values(
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
    
    def get_course(self, obj):
        """Получаем список всех курсов Яндекса."""
        return obj.course.values()
    
    def get_level(self, obj):
        """Получаем список всех уровней(грейдов)."""
        return obj.level.values()
    
    def get_hards(self, obj):
        """Получаем список всех хард-скилов(ключевые навыки)."""
        return obj.hards.values()
    
    def get_softs(self, obj):
        """Получаем список soft skills(мягкие навыки)."""
        return obj.softs.values()
    
    def get_experience(self, obj):
        """Получаем список опыта работы(в годах)."""
        return obj.experience.values()
    
    def get_employment_type(self, obj):
        """Получаем список типа занятости."""
        return obj.employment_type.values()
    
    def get_work_schedule(self, obj):
        """Получаем список графика работы."""
        return obj.work_schedule.values()