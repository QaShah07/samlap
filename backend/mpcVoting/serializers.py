from rest_framework import serializers
from .models import MemberVoting, DissentYear

class MemberVotingSerializer(serializers.ModelSerializer):
    total_votes = serializers.SerializerMethodField()

    class Meta:
        model = MemberVoting
        fields = [
            "id",
            "name",
            "tenure",
            "hikes",
            "cuts",
            "holds",
            "total_votes",
        ]

    def get_total_votes(self, obj):
        return obj.total_votes


class DissentYearSerializer(serializers.ModelSerializer):
    class Meta:
        model = DissentYear
        fields = [
            "year",
            "explicit_count",
            "implicit_count",
        ]