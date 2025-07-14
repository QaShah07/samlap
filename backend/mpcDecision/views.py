# backend/mpcDecision/views.py

from rest_framework import generics, filters
from .models import MPCDecision
from .serializers import MPCDecisionSerializer

class MPCDecisionListAPIView(generics.ListAPIView):
    """
    GET /api/mpcDecision/decisions/
    Returns a list of all MPCDecision records, ordered by date descending.
    Supports:
      - search on 'date' or 'policy_change'
      - ordering on any field
    """
    queryset = MPCDecision.objects.all()
    serializer_class = MPCDecisionSerializer

    # Enable filtering by search and ordering
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["date", "policy_change"]  # user can search by date or policy_change
    ordering_fields = [
        "date",
        "policy_change",
        "voting_pattern",
        "implicit_dissent_score",
    ]
    ordering = ["-date"]  # default ordering if none specified
