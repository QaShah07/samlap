from django.urls import path
from .views import DownloadSubmissionCreateAPIView

urlpatterns = [
    path("", DownloadSubmissionCreateAPIView.as_view(), name="download-create"),
]
