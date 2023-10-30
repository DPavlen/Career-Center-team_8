from django.core.validators import MaxValueValidator, MinValueValidator
from django.forms import ValidationError
from rest_framework import serializers
from rest_framework.fields import IntegerField, SerializerMethodField
from rest_framework.relations import PrimaryKeyRelatedField
from drf_extra_fields.fields import Base64ImageField

from candidates.models import (
    # ExperienceDetailed,
    # DetailInCandidate,
    # Education,
    Candidate,
    Specialization,
    Course,
    Level,
    Experience,
    WorkSchedule,
    EmploymentType,
    HardCands, 
    Track)


class SpecializationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialization 
        fields = ("id", "name", "slug")

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course 
        fields = ("id", "name", "slug")

class LevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Level 
        fields = ("id", "name", "slug")

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience 
        fields = ("id", "name", "slug")

class WorkScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkSchedule 
        fields = ("id", "name", "slug")

class EmploymentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmploymentType 
        fields = ("id", "name", "slug")

class HardCandsSerializer(serializers.ModelSerializer):
    class Meta:
        model = HardCands 
        fields = ("id", "name", "slug")

class CandidateSerializer(serializers.ModelSerializer):
    """Сериализатор для получения полной 
    информации о кандидате(подробная страница кандидата)."""
    experience_detailed = SerializerMethodField()
    education = SerializerMethodField()
    specialization = SerializerMethodField()        
    course = SerializerMethodField()
    level = SerializerMethodField()
    hards = SerializerMethodField()
    softs = SerializerMethodField()
    experience = SerializerMethodField()
    employment_type = SerializerMethodField()
    work_schedule = SerializerMethodField()
    image = Base64ImageField()
    is_tracked = SerializerMethodField()

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
            "about_me",
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
            "work_schedule",
            "is_tracked"
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
            "slug",
        )
        return experience_detailed
    

    def get_education(self, obj):
        """Получаем список данных об образовани для кандидата."""
        education= obj.education.values(
           "id",
            "name",
            "education_level",
            "date_start",
            "date_graduation",
            "name_university",
            "faculty",
            "specialization",
            "slug",
        )
        return education

    def get_course(self, obj):
        """Получаем список всех курсов Яндекса."""
        return obj.course.values()
    
    def get_level(self, obj):
        """Получаем уровень(грейд) кандидата."""
        return obj.level.name
    
    def get_specialization(self, obj):
        """Получаем специализацию кандидата."""
        return obj.specialization.name
    
    def get_hards(self, obj):
        """Получаем список всех хард-скилов(ключевые навыки)."""
        return obj.hards.values()
    
    def get_softs(self, obj):
        """Получаем список soft skills(мягкие навыки)."""
        return obj.softs.values()
    
    def get_experience(self, obj):
        """Получаем опыт работы(в годах)."""
        return obj.experience.name
    
    def get_employment_type(self, obj):
        """Получаем список типа занятости."""
        return obj.employment_type.values()
    
    def get_work_schedule(self, obj):
        """Получаем список графика работы."""
        return obj.work_schedule.values()
    
    def get_is_tracked(self, obj):
        return (
            self.context["request"].user.is_authenticated
            and Track.objects.filter(
                user=self.context["request"].user, candidate=obj
            ).exists()
        )




class ShortCandidateSerializer(CandidateSerializer):
    """Сериализатор для получения краткой
    информации о кандидате на главной странице.
    Необходимые поля: фото, фио, город, должность, уровень, опыт)."""
    experience_detailed = SerializerMethodField()
    level = SerializerMethodField()
    experience = SerializerMethodField()
    image = Base64ImageField()

    class Meta:
        model = Candidate
        fields = [
            "id",
            "image",
            "last_name",
            "first_name",
            "middle_name",
            "location",
            "experience_detailed",
            "level",
            "experience",
        ]

    def get_experience_detailed(self, obj):
        """Получаем из детального опыта - должность."""
        experience_detailed= obj.experience_detailed.values(
            "post",
        )
        return experience_detailed
    
    def get_level(self, obj):
        """Получаем уровень(грейд) кандидата."""
        return obj.level.name

    def get_experience(self, obj):
        """Получаем опыт работы(в годах)."""
        return obj.experience.name
