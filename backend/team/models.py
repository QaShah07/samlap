# backend/team/models.py

from django.db import models

class TeamMember(models.Model):
    CATEGORY_CHOICES = [
        ('research', 'Research Team'),
        ('collaborator', 'Collaborators'),
    ]

    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    photo = models.ImageField(upload_to='team_photos/')
    profileUrl = models.URLField(blank=True, null=True)
    area_of_work = models.TextField(blank=True)

    # NEW: which group this person belongs to
    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        default='research'
    )

    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"
