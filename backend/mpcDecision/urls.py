# backend/mpc/urls.py

from django.urls import path
from .views import MPCDecisionListAPIView

urlpatterns = [
    path("decisions/", MPCDecisionListAPIView.as_view(), name="mpc-decision-list"),
]
