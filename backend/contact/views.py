from rest_framework import status, generics
from rest_framework.response import Response
from .models import ContactSubmission
from .serializers import ContactSubmissionSerializer
from .google_sheets import append_submission_to_sheet

class ContactSubmissionCreateAPIView(generics.CreateAPIView):
    """
    Handles POST /api/contact/:
      1) Save form data to the database.
      2) Append that data to the Google Sheet.
    """
    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSubmissionSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        submission = serializer.save()

        # Append to Google Sheets
        try:
            append_submission_to_sheet(submission)
        except Exception:
            # The helper logs internally; we don’t fail the request if sheets append fails
            pass

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
