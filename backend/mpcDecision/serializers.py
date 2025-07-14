# backend/mpcDecision/serializers.py

from rest_framework import serializers
from .models import MPCDecision

class MPCDecisionSerializer(serializers.ModelSerializer):
    # We want the string labels for policy_change (e.g. "Rate Hike" instead of "rate_hike")
    policy_change_display = serializers.SerializerMethodField()

    class Meta:
        model = MPCDecision
        fields = [
            "id",
            "date",
            "policy_change",
            "policy_change_display",
            "voting_pattern",
            "explicit_dissenter",
            "implicit_dissent_score",
        ]

    def get_policy_change_display(self, obj):
        return obj.get_policy_change_display()
