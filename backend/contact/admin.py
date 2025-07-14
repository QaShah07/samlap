from django.contrib import admin
from .models import ContactSubmission

@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "email",
        "user_type",
        "institution_name",
        "organization_name",
        "other_description",
        "purpose_of_contact",
        "comment",
        "submitted_on",
    )
    list_filter = ("user_type", "purpose_of_contact", "submitted_on")
    search_fields = ("name", "email", "institution_name", "organization_name", "other_description")
    ordering = ("-submitted_on",)
