from rest_framework import generics
from .models import ResourceItem
from .serializers import ResourceItemSerializer

class ResourceItemListAPIView(generics.ListAPIView):
    """
    GET /api/resources/
    Returns a list of all ResourceItem objects, including thumbnail and file URLs.
    """
    queryset = ResourceItem.objects.all()
    serializer_class = ResourceItemSerializer
