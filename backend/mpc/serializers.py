# backend/mpc/serializers.py
from rest_framework import serializers
from .models import (
    MPCEvaluation,
    MPCDecision,
    MPCMeetingAnalysis,
    MPCMember,
    MPCCorrelationGraph,
    MPCVotingPattern,
)

class MPCEvaluationSerializer(serializers.ModelSerializer):
    class Meta:
        model = MPCEvaluation
        fields = '__all__'

class MPCDecisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MPCDecision
        fields = '__all__'

class MPCMeetingAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = MPCMeetingAnalysis
        fields = '__all__'

class MPCMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = MPCMember
        fields = '__all__'

class MPCCorrelationGraphSerializer(serializers.ModelSerializer):
    class Meta:
        model = MPCCorrelationGraph
        fields = '__all__'

class MPCVotingPatternSerializer(serializers.ModelSerializer):
    class Meta:
        model = MPCVotingPattern
        fields = '__all__'
