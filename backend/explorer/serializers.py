# backend/explorer/serializers.py
from rest_framework import serializers
from .models import (
    SentimentOvertime,
    DecentOvertime,
    TopicTrends,
    ChatbotConversation,
)

class SentimentOvertimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SentimentOvertime
        fields = '__all__'

class DecentOvertimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DecentOvertime
        fields = '__all__'

class TopicTrendsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopicTrends
        fields = '__all__'

class ChatbotConversationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatbotConversation
        fields = '__all__'
