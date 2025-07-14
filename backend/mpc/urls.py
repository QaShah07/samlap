# backend/mpc/urls.py
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import (
    MPCEvaluationViewSet,
    MPCDecisionViewSet,
    MPCMeetingAnalysisViewSet,
    MPCMemberViewSet,
    MPCCorrelationGraphViewSet,
    MPCVotingPatternViewSet,
)

router = DefaultRouter()
router.register(r'evaluation', MPCEvaluationViewSet)            # /api/mpc/evaluation/
router.register(r'decision', MPCDecisionViewSet)                  # /api/mpc/decision/
router.register(r'meeting-analysis', MPCMeetingAnalysisViewSet)   # /api/mpc/meeting-analysis/
router.register(r'member', MPCMemberViewSet)                      # /api/mpc/member/
router.register(r'correlation-graph', MPCCorrelationGraphViewSet)  # /api/mpc/correlation-graph/
router.register(r'voting-pattern', MPCVotingPatternViewSet)        # /api/mpc/voting-pattern/

urlpatterns = [
    path('', include(router.urls)),
]
