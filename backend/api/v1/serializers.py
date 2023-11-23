from djoser.serializers import UserSerializer
from drf_extra_fields.fields import Base64ImageField
from rest_framework import serializers
from rest_framework.fields import IntegerField, SerializerMethodField
from rest_framework.relations import PrimaryKeyRelatedField

from django.core.validators import MaxValueValidator, MinValueValidator
from django.forms import ValidationError
from django.shortcuts import get_object_or_404

from candidates.models import (
    Candidate, Course, Education, EmploymentType, Experience,
    ExperienceDetailed, HardCands, Level, Specialization, Track, WorkSchedule,
)
from users.models import MyUser
from vacancies.models import (
    EmploymentTypeInVacancy, Hard, HardsInVacancy, Vacancy,
    WorkScheduleInVacancy,
)


class UserSerializer(UserSerializer):
    """
    Сериализатор для создания(отображения) Usera.
    """
    class Meta:
        model = MyUser
        fields = (
            "email",
            "id",
            "username",
            "first_name",
            "last_name",
        )


class SpecializationSerializer(serializers.ModelSerializer):
    """
    Сериализатор для получения специализации у кандидата.
    """
    class Meta:
        model = Specialization 
        fields = ("id", "name", "slug")


class CourseSerializer(serializers.ModelSerializer):
    """
    Сериализатор для получения курсов у кандидата.
    """
    class Meta:
        model = Course 
        fields = ("id", "name", "slug")


class LevelSerializer(serializers.ModelSerializer):
    """
    Сериализатор для получения уровеня у кандидата.
    """
    class Meta:
        model = Level 
        fields = ("id", "name", "slug")


class ExperienceSerializer(serializers.ModelSerializer):
    """
    Сериализатор для получения графика работы у кандидата.
    """
    class Meta:
        model = Experience 
        fields = ("id", "name", "slug")


class WorkScheduleSerializer(serializers.ModelSerializer):
    """
    Сериализатор для получения графика работы у кандидата.
    """
    class Meta:
        model = WorkSchedule 
        fields = ("id", "name", "slug")


class EmploymentTypeSerializer(serializers.ModelSerializer):
    """
    Сериализатор для получения типа занятости у кандидата.
    """
    class Meta:
        model = EmploymentType 
        fields = ("id", "name", "slug")


class HardCandsSerializer(serializers.ModelSerializer):
    """
    Сериализатор для получения хард скиллов у кандидата.
    """
    class Meta:
        model = HardCands 
        fields = ("id", "name", "slug")

class LocationSerializer(serializers.ModelSerializer):
    """
    Сериализатор для получения местонахождения(локации)
    о кандидате.
    """
    class Meta:
        model = Candidate 
        fields = ("location",)


class ExperienceDetailedSerializer(serializers.ModelSerializer):
    """
    Сериализатор для получения 
    детального опыта работы кандидата.
    """

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


class EducationSerializer(serializers.ModelSerializer):
    """
    Сериализатор для получения информации об 
    образовании кандидата.
    """
    class Meta:
        model = Education
        fields = (
            "id",
            "name",
            "education_level",
            "date_start",
            "date_graduation",
            "name_university",
            "faculty",
            "specialization",
        )
        read_only_fields = ("__all__",)


class CandidateSerializer(serializers.ModelSerializer):
    """
    Сериализатор для получения полной 
    информации о кандидате(подробная страница кандидата).
    """
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
        """
        Получаем список всех курсов Яндекса.
        """
        return obj.course.values()
    
    def get_level(self, obj):
        """
        Получаем уровень(грейд) кандидата.
        """
        return obj.level.name
    
    def get_specialization(self, obj):
        """
        Получаем специализацию кандидата.
        """
        return obj.specialization.name
    
    def get_hards(self, obj):
        """
        Получаем список всех хард-скилов(ключевые навыки).
        """
        return obj.hards.values()
    
    def get_softs(self, obj):
        """
        Получаем список soft skills(мягкие навыки).
        """
        return obj.softs.values()
    
    def get_experience(self, obj):
        """
        Получаем опыт работы(в годах).
        """
        return obj.experience.name
    
    def get_employment_type(self, obj):
        """Получаем список типа занятости."""
        return obj.employment_type.values()
    
    def get_work_schedule(self, obj):
        """
        Получаем список графика работы.
        """
        return obj.work_schedule.values()
    
    def get_is_tracked(self, obj):
        """Проверка - находится ли кандидад в 
        списке отслеживаемых кандидато."""
        request = self.context.get("request")
        if request is None or request.user.is_anonymous:
            return False
        return Track.objects.filter(user=request.user, candidate=obj).exists()


class ShortCandidateSerializer(CandidateSerializer):
    """
    Сериализатор для получения краткой
    информации о кандидате на главной странице.
    Необходимые поля: фото, фио, город, должность, уровень, опыт).
    """
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
        """
        Получаем из детального опыта - должность.
        """
        experience_detailed= obj.experience_detailed.values(
            "post",
        )
        return experience_detailed
    
    def get_level(self, obj):
        """
        Получаем уровень(грейд) кандидата.
        """
        return obj.level.name

    def get_experience(self, obj):
        """
        Получаем опыт работы(в годах).
        """
        return obj.experience.name


class HardsInVacancySerializer(serializers.ModelSerializer):
    """
    Сериализатор для получения хард скиллов в вакансии.
    """
    id = serializers.IntegerField()

    class Meta:
        model = HardsInVacancy
        fields = ("id",)

        
class EmploymentInVacancySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()

    class Meta:
        model = EmploymentType
        fields = ("id",)


class ScheduleInVacancySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()

    class Meta:
        model = WorkSchedule
        fields = ("id",)
        

class HardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hard
        fields = (
            "id",
            "name",
            "slug",
            "spec_id",
            "develop",
            "data_sc",
            "design",
            "manager",
            "marketing",
        )


class VacancySerializer(serializers.ModelSerializer):
    """
    Сериализатор для просмотра информации о вакансии.
    """
    author = UserSerializer(read_only=True)
    specialization = SerializerMethodField()        
    course = SerializerMethodField()
    level = SerializerMethodField()
    hards = SerializerMethodField()
    experience = SerializerMethodField()
    employment_type = SerializerMethodField()
    work_schedule = SerializerMethodField()

    class Meta:
        model = Vacancy
        fields = (
            "id",
            "name",
            "author",
            "company",
            "salary_low",
            "salary_high",
            "responsibilities",
            "requirements",
            "optional",
            "conditions",
            "stages",
            "location",
            "specialization",
            "level",
            "course",
            "hards",
            "experience",
            "employment_type",
            "work_schedule"
        )

    def get_level(self, obj):
        """
        Получаем уровень(грейд) кандидата.
        """
        return obj.level.name
    
    def get_specialization(self, obj):
        """
        Получаем специализацию кандидата.
        """
        return obj.specialization.name
    
    def get_course(self, obj):
        """
        Получаем специализацию кандидата.
        """
        return obj.course.name
    
    def get_hards(self, obj):
        hards = obj.hards.values(
            "id",
            "name",
            "slug",
        )
        return hards
    
    def get_experience(self, obj):
        """
        Получаем опыт работы(в годах).
        """
        return obj.experience.name
    
    def get_employment_type(self, obj):
        """
        Получаем тип занятости.
        """
        employment_type = obj.employment_type.values(
            "id",
            "name",
            "slug",
        )
        return employment_type
    
    def get_work_schedule(self, obj):
        """
        Получаем тип занятости.
        """
        work_schedule = obj.work_schedule.values(
            "id",
            "name",
            "slug",
        )
        return work_schedule


class CreateVacancySerializer(serializers.ModelSerializer):
    """
    Сериализатор для создании вакансии кандидата.
    """
    specialization = serializers.PrimaryKeyRelatedField(
        queryset=Specialization.objects.all(),
        many=False
        )
    author = UserSerializer(read_only=True)
    level = serializers.PrimaryKeyRelatedField(
        queryset=Level.objects.all(),
        many=False
        )
    hards = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Hard.objects.all()
        )
    experience = serializers.PrimaryKeyRelatedField(
        queryset=Experience.objects.all(),
        many=False
        )
    course = serializers.PrimaryKeyRelatedField(
        queryset=Course.objects.all(),
        many=False
        )
    employment_type = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=EmploymentType.objects.all()
        )
    work_schedule = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=WorkSchedule.objects.all()
        )
   
    class Meta(VacancySerializer.Meta):
        fields = (
            "id",
            "name",
            "author",
            "company",
            "salary_low",
            "salary_high",
            "responsibilities",
            "requirements",
            "optional",
            "conditions",
            "stages",
            "location",
            "specialization",
            "level",
            "course",
            "hards",
            "experience",
            "employment_type",
            "work_schedule"
        )

    def to_representation(self, instance):
        request = self.context.get("request")
        context = {"request": request}
        return VacancySerializer(instance, context=context).data