from django.urls import include, path
from rest_framework import routers

from users.views import CustomUserViewSet
from api.v1.views import (
    ExperienceDetailedViewSet,
    EducationViewSet,
    CandidateViewSet,
    ShortCandidateViewSet)


app_name = "api.v1"


router = routers.DefaultRouter()

router.register("users", CustomUserViewSet, "users")
router.register("short_candidate", ShortCandidateViewSet, "short_candidate")
router.register("candidate", CandidateViewSet, "candidate")
router.register("experience_detailed", 
                ExperienceDetailedViewSet, "experience_detailed")
router.register("education", EducationViewSet, "education")

urlpatterns = [
    path("v1/", include(router.urls)),
    path("v1/", include("djoser.urls")),
    path("auth/", include("djoser.urls.authtoken")),
]