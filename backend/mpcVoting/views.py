from rest_framework import generics
from .models import MemberVoting, DissentYear
from .serializers import MemberVotingSerializer, DissentYearSerializer

class MemberVotingListAPIView(generics.ListAPIView):
    """
    GET /api/mpcVoting/members/
    Returns a JSON list of all MemberVoting rows (name, hikes, cuts, holds, total_votes).
    """
    queryset = MemberVoting.objects.all()
    serializer_class = MemberVotingSerializer


class DissentYearListAPIView(generics.ListAPIView):
    """
    GET /api/mpcVoting/dissent/
    Returns a JSON list of all DissentYear rows (year, explicit_count, implicit_count).
    """
    queryset = DissentYear.objects.all()
    serializer_class = DissentYearSerializer
