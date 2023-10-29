from django.urls import include, path
from rest_framework import routers

from users.views import CustomUserViewSet
from api.v1.views import (
    # ExperienceDetailedViewSet,
    # EducationViewSet,
    SpecializationViewSet,
    CourseViewSet,
    LevelViewSet,
    ExperienceViewSet,
    EmploymentTypeViewSet,
    WorkScheduleViewSet,
    CandidateViewSet,
    ShortCandidateViewSet,
    HardCandsViewSet
    )


app_name = "api.v1"


router = routers.DefaultRouter()

router.register("users", CustomUserViewSet, "users")
router.register("short_candidates", ShortCandidateViewSet, "short_candidates")
router.register("candidates", CandidateViewSet, "candidates")
router.register("specialization", SpecializationViewSet)
router.register("course", CourseViewSet)
router.register("level", LevelViewSet)
router.register("experience", ExperienceViewSet)
router.register("employment_type", EmploymentTypeViewSet)
router.register("work_schedule", WorkScheduleViewSet)
router.register("hards_in_cands", HardCandsViewSet)

# router.register("experience_detailed", 
#                 ExperienceDetailedViewSet, "experience_detailed")
# router.register("education", EducationViewSet, "education")

urlpatterns = [
    path("v1/", include(router.urls)),
    path("v1/", include("djoser.urls")),
    path("auth/", include("djoser.urls.authtoken")),
]