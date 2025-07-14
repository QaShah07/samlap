from rest_framework import serializers
from .models import DownloadSubmission

class DownloadSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DownloadSubmission
        fields = [
            "id",
            "name",
            "email",
            "user_type",
            "institution_name",
            "organization_name",
            "other_description",
            "purpose_of_contact",
            "comment",
            "resource_type",
            "resource_slug",
            "resource_name",
            "submitted_on",
        ]
        read_only_fields = ["id", "submitted_on"]
