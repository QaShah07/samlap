from django.db import models

# Choices for user_type and purpose_of_contact
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

class ContactSubmission(models.Model):
    name  = models.CharField(max_length=200)
    email = models.EmailField()

    # Give default="other" and allow blank, so existing rows get "other" automatically
    user_type = models.CharField(
        max_length=20,
        choices=USER_TYPE_CHOICES,
        default="other",
        blank=True,
    )

    # These three have default="" and blank=True so no migration prompt
    institution_name  = models.CharField(max_length=255, default="", blank=True)
    organization_name = models.CharField(max_length=255, default="", blank=True)
    other_description = models.CharField(max_length=255, default="", blank=True)

    # Give default="other" and allow blank, so existing rows get "other" automatically
    purpose_of_contact = models.CharField(
        max_length=50,
        choices=PURPOSE_CHOICES,
        default="other",
        blank=True,
    )

    # comment now has default="" and blank=True so no migration prompt
    comment = models.TextField(default="", blank=True)

    submitted_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.email})"
