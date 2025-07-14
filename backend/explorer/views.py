# backend/explorer/views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import (
    SentimentOvertime,
    DecentOvertime,
    TopicTrends,
    ChatbotConversation,
)
from .serializers import (
    SentimentOvertimeSerializer,
    DecentOvertimeSerializer,
    TopicTrendsSerializer,
    ChatbotConversationSerializer,
)

class SentimentOvertimeViewSet(viewsets.ModelViewSet):
    queryset = SentimentOvertime.objects.all().order_by('date')
    serializer_class = SentimentOvertimeSerializer

class DecentOvertimeViewSet(viewsets.ModelViewSet):
    queryset = DecentOvertime.objects.all().order_by('date')
    serializer_class = DecentOvertimeSerializer

class TopicTrendsViewSet(viewsets.ModelViewSet):
    queryset = TopicTrends.objects.all().order_by('-last_updated')
    serializer_class = TopicTrendsSerializer

class ChatbotConversationViewSet(viewsets.ModelViewSet):
    queryset = ChatbotConversation.objects.all().order_by('-timestamp')
    serializer_class = ChatbotConversationSerializer

    # Optionally override create() to integrate a chatbot backend service
    def create(self, request, *args, **kwargs):
        user_msg = request.data.get('user_message', '')
        # Here you could call an NLP service to generate bot_response.
        bot_response = f"Echo: {user_msg}"
        convo = ChatbotConversation.objects.create(
            user_message=user_msg,
            bot_response=bot_response
        )
        serializer = self.get_serializer(convo)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
