from rest_framework import status, generics
from rest_framework.response import Response
from .models import DownloadSubmission
from .serializers import DownloadSubmissionSerializer
from .google_sheets import append_download_to_sheet

class DownloadSubmissionCreateAPIView(generics.CreateAPIView):
    """
    POST /api/downloads/
    Saves form data to the DB, then appends it to Google Sheets.
    """
    queryset = DownloadSubmission.objects.all()
    serializer_class = DownloadSubmissionSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        submission = serializer.save()

        # Append to Google Sheet (logging inside the helper)
        try:
            append_download_to_sheet(submission)
        except Exception:
            pass

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
