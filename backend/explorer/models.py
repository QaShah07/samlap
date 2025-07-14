# backend/explorer/models.py
from django.db import models

class SentimentOvertime(models.Model):
    date = models.DateField()
    sentiment_score = models.FloatField()
    # e.g. store date / average sentiment
    def __str__(self):
        return f"Sentiment {self.date}"

class DecentOvertime(models.Model):
    date = models.DateField()
    descent_value = models.FloatField()
    # e.g. “Decent” might track some metric over time
    def __str__(self):
        return f"Decent {self.date}"

class TopicTrends(models.Model):
    topic = models.CharField(max_length=200)
    frequency = models.IntegerField()
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.topic

class ChatbotConversation(models.Model):
    user_message = models.TextField()
    bot_response = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Chat at {self.timestamp}"
