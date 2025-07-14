from django.urls import path
from .views import MemberVotingListAPIView, DissentYearListAPIView

urlpatterns = [
    # List all members with their vote counts
    path("members/", MemberVotingListAPIView.as_view(), name="mpc-voting-members"),
    # List all years’ dissent data
    path("dissent/", DissentYearListAPIView.as_view(), name="mpc-voting-dissent"),
]
