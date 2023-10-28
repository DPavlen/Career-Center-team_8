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
    ShortCandidateSerializer
    )
from candidates.models import (
    ExperienceDetailed,
    Education,
    Candidate,
    Track
    )
#from .filters import CandidatesFilter


# class ExperienceDetailedViewSet(ModelViewSet):
#     """View для отображения детального опыта работы кандидата."""

#     queryset = ExperienceDetailed.objects.all()
#     serializer_class = ExperienceDetailedSerializer
#     # permission_classes = [IsAuthenticated]
#     pagination_class = None


# class EducationViewSet(ModelViewSet):
#     """View для отображения информации об образовании кандидата."""

#     queryset = Education.objects.all()
#     serializer_class = EducationSerializer
#     # permission_classes = [IsAuthenticated]
#     pagination_class = None


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
    # permission_classes = [IsAuthenticated]
    pagination_class = None