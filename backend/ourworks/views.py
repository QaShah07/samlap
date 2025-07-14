# backend/ourworks/views.py
from rest_framework import viewsets
from .models import OurWork
from .serializers import OurWorkSerializer

class OurWorkViewSet(viewsets.ModelViewSet):
    queryset = OurWork.objects.all().order_by('-created_on')
    serializer_class = OurWorkSerializer
