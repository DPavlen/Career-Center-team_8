from django.urls import include, path
from rest_framework import routers

from users.views import CustomUserViewSet
from api.views import (
    ExperienceDetailedViewSet,
    EducationViewSet,
    CandidateViewSet)


app_name = "api"


router = routers.DefaultRouter()

router.register("users", CustomUserViewSet, "users")
router.register("candidate", CandidateViewSet, "candidate")
router.register("experience_detailed", 
                ExperienceDetailedViewSet, "experience_detailed")
router.register("education", EducationViewSet, "education")

urlpatterns = [
    path("", include(router.urls)),
    path("", include("djoser.urls")),
    path("auth/", include("djoser.urls.authtoken")),
]