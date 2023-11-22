from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet

from api.v1.filters import CandidatesFilter
from api.v1.pagination import PaginationCust
from api.v1.serializers import (
    CandidateSerializer,
    ShortCandidateSerializer,
    SpecializationSerializer,
    CourseSerializer,
    LevelSerializer,
    ExperienceSerializer,
    WorkScheduleSerializer,
    EmploymentTypeSerializer,
    HardCandsSerializer,
    LocationSerializer,
    VacancySerializer,
    CreateVacancySerializer,
    ExperienceDetailedSerializer,
    EducationSerializer,
    HardSerializer,
    )
from core.services import candidate_resume_pdf
from candidates.models import (
    Specialization,
    Candidate,
    Course,
    Level,
    Experience,
    WorkSchedule,
    EmploymentType,
    Track,
    HardCands,
    ExperienceDetailed,
    Education
    )
from vacancies.models import (
    Vacancy,
    Hard
)


class SpecializationViewSet(ReadOnlyModelViewSet):
    """
    View для отображения 'Специализации' кандидата.
    """
    queryset=Specialization.objects.all()
    serializer_class = SpecializationSerializer
    # permission_classes = (IsAuthenticated,)


class CourseViewSet(ReadOnlyModelViewSet):
    """
    View для отображения 'Курсов ЯП' кандидата.
    """
    queryset=Course.objects.all()
    serializer_class = CourseSerializer
    # permission_classes = (IsAuthenticated,)


class LevelViewSet(ReadOnlyModelViewSet):
    """
    View для отображения 'Образование для кандидата'.
    """
    queryset=Level.objects.all()
    serializer_class = LevelSerializer
    # permission_classes = (IsAuthenticated,)


class ExperienceViewSet(ReadOnlyModelViewSet):
    """
    View для отображения 'Опыта работы
    детальный для кандидата'.
    """
    queryset=Experience.objects.all()
    serializer_class = ExperienceSerializer
    # permission_classes = (IsAuthenticated,)


class WorkScheduleViewSet(ReadOnlyModelViewSet):
    """
    View для отображения 'Графика работы' кандидата.
    """
    queryset=WorkSchedule.objects.all()
    serializer_class = WorkScheduleSerializer
    # permission_classes = (IsAuthenticated,)


class EmploymentTypeViewSet(ReadOnlyModelViewSet):
    """
    View для отображения 'Типа занятости' кандидата.
    """
    queryset=EmploymentType.objects.all()
    serializer_class = EmploymentTypeSerializer
    # permission_classes = (IsAuthenticated,) 


class HardCandsViewSet(ReadOnlyModelViewSet):
    """
    View для отображения 'Хард скиллов' кандидата.
    """
    queryset=HardCands.objects.all()
    serializer_class = HardCandsSerializer
    # permission_classes = (IsAuthenticated,)


class LocationViewSet(ReadOnlyModelViewSet):
    """
    View для отображения 'Местоположения' кандидата.
    """
    queryset=Candidate.objects.all()
    serializer_class = LocationSerializer
    # permission_classes = (IsAuthenticated,)    


class ExperienceDetailedViewSet(ModelViewSet):
    """
    View для отображения детального опыта работы кандидата.
    """
    queryset = ExperienceDetailed.objects.all()
    serializer_class = ExperienceDetailedSerializer
    # permission_classes = (IsAuthenticated,)
    # pagination_class = None


class EducationViewSet(ModelViewSet):
    """
    View для отображения информации об образовании кандидата.
    """
    queryset = Education.objects.all()
    serializer_class = EducationSerializer
    # permission_classes = (IsAuthenticated,)
    # pagination_class = None


class CandidateViewSet(ModelViewSet):
    """
    Основная View о кандидатах.
    View для отображения сокращенной информации о кандидатах.
    View для отображения полной информации о кандидате.
    Attributes:
        - queryset: Запрос, возвращающий все объекты Candidates.
        - pagination_class: Кастомный класс пагинации.
    """
    queryset = Candidate.objects.all()
    serializer_class = CandidateSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = CandidatesFilter
    # permission_classes = (IsAuthenticated,)
    # pagination_class = PaginationCust

    @action(
        detail=True,
        methods=("post", "delete"),
        permission_classes=(IsAuthenticated,),
    )
    def track(self, request, pk):
        if request.method == "POST":
            candidate = get_object_or_404(Candidate, id=pk)
            obj, created = Track.objects.get_or_create(
                user=request.user, candidate=candidate
            )
            if created:
                serializer = ShortCandidateSerializer(candidate)
                return Response(
                    
                    serializer.data, status=status.HTTP_201_CREATED
                )
            return Response(
                {"Ошибка": "Кандидат уже отслеживается"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        obj = Track.objects.filter(
            user=request.user, candidate__id=pk
        ).delete()

        if obj[0] > 0:
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(
            {"Ошибка": "Кандидата нет в отслеживаемых"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    
    @action(
        detail=False,
        methods=("get"),
        url_path="download-candidate",
        permission_classes=(IsAuthenticated,),
    )
    def download_candidate(self, request, candidate_id):
        """
        API endpoint для скачивания резюме кандидата в формате PDF.
        GET:
        Скачивание резюме кандидата в формате PDF.
        Returns:
        Response: PDF-файл резюме кандидата.
        """
        return candidate_resume_pdf(candidate_id)
    

class HardViewSet(ReadOnlyModelViewSet):
    pagination_class = None
    queryset = Hard.objects.all()
    serializer_class = HardSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = (DjangoFilterBackend,)


class VacancyViewSet(ModelViewSet):
    """
    View для отображения информации о вакансии.
    """
    queryset = Vacancy.objects.select_related("author")
    permission_classes = (IsAuthenticated,)
    # pagination_class = PaginationCust

    def perform_create(self, serializer):
        """
        Post запрос создания вакансии для кандидата.
        """
        serializer.save(author=self.request.user)

    def get_serializer_class(self):
        """
        Выбор сериализатора в зависимости от 
        просмотра или создания вакансии.
        """
        if self.request.method in SAFE_METHODS:
            return VacancySerializer
        return CreateVacancySerializer
