from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from django.http import HttpResponse
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet

from django.shortcuts import get_object_or_404

from api.v1.serializers import (
    # ExperienceDetailedSerializer,
    # EducationSerializer,
    CandidateSerializer,
    ShortCandidateSerializer,
    SpecializationSerializer,
    CourseSerializer,
    LevelSerializer,
    ExperienceSerializer,
    WorkScheduleSerializer,
    EmploymentTypeSerializer,
    HardCandsSerializer
    )
from candidates.models import (
    ExperienceDetailed,
    Education,
    Specialization,
    Candidate,
    Course,
    Level,
    Experience,
    WorkSchedule,
    EmploymentType,
    Track,
    HardCands
    )
from .filters import CandidatesFilter
from core.services import candidate_resume_pdf


class SpecializationViewSet(ReadOnlyModelViewSet):
    queryset=Specialization.objects.all()
    serializer_class = SpecializationSerializer

class CourseViewSet(ReadOnlyModelViewSet):
    queryset=Course.objects.all()
    serializer_class = CourseSerializer

class LevelViewSet(ReadOnlyModelViewSet):
    queryset=Level.objects.all()
    serializer_class = LevelSerializer

class ExperienceViewSet(ReadOnlyModelViewSet):
    queryset=Experience.objects.all()
    serializer_class = ExperienceSerializer

class WorkScheduleViewSet(ReadOnlyModelViewSet):
    queryset=WorkSchedule.objects.all()
    serializer_class = WorkScheduleSerializer

class EmploymentTypeViewSet(ReadOnlyModelViewSet):
    queryset=EmploymentType.objects.all()
    serializer_class = EmploymentTypeSerializer

class HardCandsViewSet(ReadOnlyModelViewSet):
    queryset=HardCands.objects.all()
    serializer_class = HardCandsSerializer

class ShortCandidateViewSet(ModelViewSet):
    """View для отображения сокращенной информации о кандидатах."""

    queryset = Candidate.objects.all()
    serializer_class = ShortCandidateSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = CandidatesFilter
    # permission_classes = [IsAuthenticated]
    pagination_class = None


class CandidateViewSet(ModelViewSet):
    """View для отображения полной информации о кандидате."""

    queryset = Candidate.objects.all()
    serializer_class = CandidateSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = CandidatesFilter
    # permission_classes = [IsAuthenticated]
    pagination_class = None

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
                serializer = CandidateSerializer(candidate)
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
        methods=("post", "delete"),
        permission_classes=(IsAuthenticated,),
    )
    @staticmethod
    def download_shopping_cart(self, request):
        """
        API endpoint для скачивания резюме кандидата в формате PDF.
        GET:
        Скачивание резюме кандидата в формате PDF.
        Returns:
        Response: PDF-файл резюме кандидата.
        """
        return candidate_resume_pdf(request.user)
