# backend/mpc/views.py
from rest_framework import viewsets
from .models import (
    MPCEvaluation,
    MPCDecision,
    MPCMeetingAnalysis,
    MPCMember,
    MPCCorrelationGraph,
    MPCVotingPattern,
)
from .serializers import (
    MPCEvaluationSerializer,
    MPCDecisionSerializer,
    MPCMeetingAnalysisSerializer,
    MPCMemberSerializer,
    MPCCorrelationGraphSerializer,
    MPCVotingPatternSerializer,
)

class MPCEvaluationViewSet(viewsets.ModelViewSet):
    queryset = MPCEvaluation.objects.all().order_by('-date')
    serializer_class = MPCEvaluationSerializer

class MPCDecisionViewSet(viewsets.ModelViewSet):
    queryset = MPCDecision.objects.all().order_by('-date')
    serializer_class = MPCDecisionSerializer

class MPCMeetingAnalysisViewSet(viewsets.ModelViewSet):
    queryset = MPCMeetingAnalysis.objects.all().order_by('-meeting_date')
    serializer_class = MPCMeetingAnalysisSerializer

class MPCMemberViewSet(viewsets.ModelViewSet):
    queryset = MPCMember.objects.all().order_by('name')
    serializer_class = MPCMemberSerializer

class MPCCorrelationGraphViewSet(viewsets.ModelViewSet):
    queryset = MPCCorrelationGraph.objects.all().order_by('-created_on')
    serializer_class = MPCCorrelationGraphSerializer

class MPCVotingPatternViewSet(viewsets.ModelViewSet):
    queryset = MPCVotingPattern.objects.all().order_by('-date')
    serializer_class = MPCVotingPatternSerializer
