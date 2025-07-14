from rest_framework import serializers
from .models import WordFrequency

class WordFrequencySerializer(serializers.ModelSerializer):
    year = serializers.SerializerMethodField()
    month = serializers.SerializerMethodField()
    month_name = serializers.SerializerMethodField()
    
    class Meta:
        model = WordFrequency
        fields = [
            'id',
            'date',
            'word',
            'frequency',
            'year',
            'month',
            'month_name'
        ]
    
    def get_year(self, obj):
        return obj.date.year
    
    def get_month(self, obj):
        return obj.date.month
    
    def get_month_name(self, obj):
        return obj.date.strftime('%B')

class YearlyWordCloudSerializer(serializers.Serializer):
    """Serializer for yearly word cloud data"""
    year = serializers.IntegerField()
    words = serializers.ListField(
        child=serializers.DictField(
            child=serializers.CharField()
        )
    )

class MonthlyFrequencySerializer(serializers.Serializer):
    """Serializer for monthly frequency trends"""
    year = serializers.IntegerField()
    monthly_data = serializers.ListField(
        child=serializers.DictField()
    )