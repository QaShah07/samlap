from rest_framework import serializers
from .models import MPCDiscussion

class MPCDiscussionSerializer(serializers.ModelSerializer):
    year = serializers.SerializerMethodField()
    month = serializers.SerializerMethodField()
    
    class Meta:
        model = MPCDiscussion
        fields = [
            'id',
            'month_year',
            'name',
            'member_type',
            'analysis_score',
            'inflation_actual',
            'inflation_predicted',
            'inflation_error',
            'growth_actual',
            'growth_predicted',
            'growth_error',
            'gdp_actual',
            'gdp_predicted',
            'gdp_error',
            'year',
            'month'
        ]
    
    def get_year(self, obj):
        return obj.year
    
    def get_month(self, obj):
        return obj.month

class CorrelationDataSerializer(serializers.Serializer):
    """Serializer for correlation plot data"""
    month_year = serializers.CharField()
    analysis_score = serializers.FloatField()
    month = serializers.CharField()

class MemberAnalysisSerializer(serializers.Serializer):
    """Serializer for individual member analysis data"""
    month_year = serializers.CharField()
    month = serializers.CharField()
    inflation_actual = serializers.CharField(allow_blank=True, allow_null=True)
    inflation_predicted = serializers.CharField(allow_blank=True, allow_null=True)
    inflation_error = serializers.CharField(allow_blank=True, allow_null=True)
    growth_actual = serializers.CharField(allow_blank=True, allow_null=True)
    growth_predicted = serializers.CharField(allow_blank=True, allow_null=True)
    growth_error = serializers.CharField(allow_blank=True, allow_null=True)
    gdp_actual = serializers.CharField(allow_blank=True, allow_null=True)
    gdp_predicted = serializers.CharField(allow_blank=True, allow_null=True)
    gdp_error = serializers.CharField(allow_blank=True, allow_null=True)