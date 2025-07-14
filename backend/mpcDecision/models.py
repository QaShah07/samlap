# backend/mpcDecision/models.py

from django.db import models

class MPCDecision(models.Model):
    # Choices for policy changes
    RATE_HIKE = "rate_hike"
    RATE_CUT = "rate_cut"
    RATE_HOLD = "rate_hold"
    POLICY_CHOICES = [
        (RATE_HIKE, "Rate Hike"),
        (RATE_CUT, "Rate Cut"),
        (RATE_HOLD, "Rate Hold"),
    ]

    date = models.DateField(help_text="Date of the MPC meeting")
    policy_change = models.CharField(
        max_length=20,
        choices=POLICY_CHOICES,
        help_text="Type of policy change: Rate Hike, Rate Cut, or Rate Hold"
    )
    voting_pattern = models.CharField(
        max_length=50,
        help_text='Voting pattern, e.g. "6-0 (Unanimous)" or "5-1 (Majority)"'
    )
    explicit_dissenter = models.CharField(
        max_length=100,
        help_text='Format: "6:0 NA", "6:1 OneName", or "6:2 TwoName,AnotherName"'
    )
    implicit_dissent_score = models.CharField(
        max_length=100,
        help_text='Format: "0 to 1 VADER", "0 to 1 finBERT","0 to 1 Centrab Bank RoBERTA", or "6:2 TwoName,AnotherName"'
    )

    class Meta:
        ordering = ["-date"]  # Show newest decisions first

    def __str__(self):
        return f"{self.date} – {self.get_policy_change_display()}"
