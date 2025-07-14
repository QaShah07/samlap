from rest_framework import serializers
from .models import ContactSubmission

class ContactSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
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
            "submitted_on",
        ]
        read_only_fields = ["id", "submitted_on"]
