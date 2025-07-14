from django.contrib import admin
from .models import DownloadSubmission

@admin.register(DownloadSubmission)
class DownloadSubmissionAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "email",
        "user_type",
        "institution_name",
        "organization_name",
        "other_description",
        "purpose_of_contact",
        "resource_type",
        "resource_slug",
        "resource_name",
        "submitted_on",
    )
    list_filter = (
        "user_type",
        "purpose_of_contact",
        "resource_type",
        "submitted_on",
    )
    search_fields = (
        "name",
        "email",
        "institution_name",
        "organization_name",
        "other_description",
        "resource_slug",
        "resource_name",
    )
    ordering = ("-submitted_on",)
    readonly_fields = ("submitted_on",)

    fieldsets = (
        (None, {
            "fields": (
                "name",
                "email",
                "user_type",
                "institution_name",
                "organization_name",
                "other_description",
                "purpose_of_contact",
                "comment",
            )
        }),
        ("Resource Info", {
            "fields": (
                "resource_type",
                "resource_slug",
                "resource_name",
            )
        }),
        ("Metadata", {
            "fields": ("submitted_on",),
            "classes": ("collapse",),
        }),
    )
