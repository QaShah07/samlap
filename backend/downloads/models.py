from django.db import models

USER_TYPE_CHOICES = [
    ("student",      "Student"),
    ("professional", "Professional"),
    ("other",        "Other"),
]

PURPOSE_CHOICES = [
    ("general_inquiry", "General Inquiry"),
    ("collaboration",    "Collaboration"),
    ("job_opportunity",  "Job Opportunity"),
    ("other",            "Other"),
]

RESOURCE_TYPE_CHOICES = [
    ("paper",   "Research Paper"),
    ("dataset", "Dataset"),
    ("code",    "Code Repository"),
]

class DownloadSubmission(models.Model):
    # User info
    name  = models.CharField(max_length=200)
    email = models.EmailField()

    user_type = models.CharField(
        max_length=20,
        choices=USER_TYPE_CHOICES,
        default="other",
        blank=True,
    )
    institution_name  = models.CharField(max_length=255, default="", blank=True)
    organization_name = models.CharField(max_length=255, default="", blank=True)
    other_description = models.CharField(max_length=255, default="", blank=True)

    # Purpose
    purpose_of_contact = models.CharField(
        max_length=50,
        choices=PURPOSE_CHOICES,
        default="other",
        blank=True,
    )

    comment = models.TextField(default="", blank=True)

    # Which resource
    resource_type = models.CharField(
        max_length=20,
        choices=RESOURCE_TYPE_CHOICES,
    )
    resource_slug = models.SlugField(
        max_length=100,
        help_text="Unique slug identifying the item"
    )
    resource_name = models.CharField(
        max_length=255,
        help_text="Human-readable name of the item"
    )

    submitted_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.email}) - {self.resource_slug}"
