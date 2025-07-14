from django.urls import path
from .views import ResourceItemListAPIView

urlpatterns = [
    path("", ResourceItemListAPIView.as_view(), name="resource-list"),
]
