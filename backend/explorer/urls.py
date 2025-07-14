# backend/explorer/urls.py
from rest_framework.routers import DefaultRouter
from django.urls import include, path
from .views import (
    SentimentOvertimeViewSet,
    DecentOvertimeViewSet,
    TopicTrendsViewSet,
    ChatbotConversationViewSet,
)

router = DefaultRouter()
router.register(r'sentiment-overtime', SentimentOvertimeViewSet)  # /api/explorer/sentiment-overtime/
router.register(r'decent-overtime', DecentOvertimeViewSet)        # /api/explorer/decent-overtime/
router.register(r'topic-trends', TopicTrendsViewSet)              # /api/explorer/topic-trends/
router.register(r'chatbot', ChatbotConversationViewSet)           # /api/explorer/chatbot/

urlpatterns = [
    path('', include(router.urls)),
]
