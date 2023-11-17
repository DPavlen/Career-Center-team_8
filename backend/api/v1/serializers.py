from djoser.serializers import UserSerializer
from django.core.validators import MaxValueValidator, MinValueValidator
from django.forms import ValidationError
from django.shortcuts import get_object_or_404
from rest_framework import serializers
from rest_framework.fields import IntegerField, SerializerMethodField
from rest_framework.relations import PrimaryKeyRelatedField
from drf_extra_fields.fields import Base64ImageField

from candidates.models import (
    Candidate,
    Specialization,
    Course,
    Level,
    Experience,
    WorkSchedule,
    EmploymentType,
    HardCands, 
    Track,
    ExperienceDetailed,
    Education,)

from vacancies.models import (
    Hard,
    Vacancy,
    HardsInVacancy,
    EmploymentTypeInVacancy,
    WorkScheduleInVacancy,
       
)
from users.models import MyUser


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
            "level",
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
        queryset=Specialization.objects.all(), many=False
    )
    author = UserSerializer(read_only=True)
    level = serializers.PrimaryKeyRelatedField(
        queryset=Level.objects.all(), many=False
    )
    hards = HardsInVacancySerializer(many=True)
    experience = serializers.PrimaryKeyRelatedField(
        queryset=Experience.objects.all(), many=False
    )
    course = serializers.PrimaryKeyRelatedField(
        queryset=Course.objects.all(), many=False
    )
    employment_type = EmploymentInVacancySerializer(many=True)
    work_schedule = ScheduleInVacancySerializer(many=True)
   
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

    def validate_hards(self, value):
        hards = value
        hards_list = []
        for item in hards:
            hard = get_object_or_404(Hard, id=item["id"])
            hards_list.append(hard)
        return value
    
    def validate_employment_type(self, value):
        employment_type = value
        if not employment_type:
            raise ValidationError(
                {"employment_type": "Выберите хотябы один тип занятости"}
            )
        employment_type_list = []
        for item in employment_type:
            employment = get_object_or_404(EmploymentType, id=item["id"])
            if employment in employment_type_list:
                raise ValidationError(
                    {"employment_type": "Тип занятости должен быть уникальным."}
                )
            employment_type_list.append(employment)
        return value
    
    def validate_work_schedule(self, value):
        work_schedule = value
        if not work_schedule:
            raise ValidationError(
                {"work_schedule": "Выберите хотябы один график работы"}
            )
        work_schedule_list = []
        for item in work_schedule:
            schedule = get_object_or_404(WorkSchedule, id=item["id"])
            if schedule in work_schedule_list:
                raise ValidationError(
                    {"work_schedule": "График работы должен быть уникальным."}
                )
            work_schedule_list.append(schedule)
        return value

    def validate_specialization(self, value):
        specialization = value
        if not specialization:
            raise ValidationError({"specialization": "Выберите одно направление."})
        return value

    def validate_level(self, value):
        level = value
        if not level:
            raise ValidationError({"level": "Выберите уровень."})
        return value
    
    def validate_experience(self, value):
        experience = value
        if not experience:
            raise ValidationError({"experience": "Выберите опыт работы."})
        return value
    
    def validate_course(self, value):
        course = value
        if not course:
            raise ValidationError({"course": "Выберите курс ЯП."})
        return value


    def create_hards(self, hards, vacancy):
        HardsInVacancy.objects.bulk_create(
            [
                HardsInVacancy(
                    hard=Hard.objects.get(id=hards["id"]),
                    vacancy=vacancy
                )
                for hard in hards
            ]
        )

    # def create_employment(self, employment_type, vacancy):
    #     EmploymentTypeInVacancy.objects.bulk_create(
    #         [
    #             EmploymentTypeInVacancy(
    #                 employment=EmploymentType.objects.get(id=employment_type["id"]),
    #                 vacancy=vacancy
    #             )
    #             for employment in employment_type
    #         ]
    #     )
    
    def create_schedule(self, work_schedule, vacancy):
        WorkScheduleInVacancy.objects.bulk_create(
            [
                WorkScheduleInVacancy(
                    schedule=WorkSchedule.objects.get(id= work_schedule["id"]),
                    vacancy=vacancy
                )
                for  schedule in work_schedule
            ]
        )

    def create(self, validated_data):
        hards = validated_data.pop("hards")
        employment_type = validated_data.pop("employment_type")
        work_schedule = validated_data.pop("work_schedule")
        vacancy = Vacancy.objects.create(**validated_data)
        # self.create_employment(vacancy=vacancy, employment_type=employment_type)
        self.create_schedule(vacancy=vacancy, work_schedule=work_schedule)
        self.create_hards(vacancy=vacancy, hards=hards)
        return vacancy

#     def update(self, instance, validated_data):
#         tags = validated_data.pop("tags")
#         ingredients = validated_data.pop("ingredients")
#         instance = super().update(instance, validated_data)
#         instance.tags.clear()
#         instance.tags.set(tags)
#         instance.ingredients.clear()
#         self.create_ingredients(recipe=instance, ingredients=ingredients)
#         instance.save()
#         return instance

    def to_representation(self, instance):
        request = self.context.get("request")
        context = {"request": request}
        return VacancySerializer(instance, context=context).data


