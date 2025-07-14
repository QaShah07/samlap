# backend/mpc/models.py
from django.db import models

class MPCEvaluation(models.Model):
    date = models.DateField()
    summary = models.TextField()
    # ... other fields specific to evaluation …

    def __str__(self):
        return f"Eval {self.date}"

class MPCDecision(models.Model):
    date = models.DateField()
    decision_text = models.TextField()
    # ... other decision-specific fields …

    def __str__(self):
        return f"Decision {self.date}"

class MPCMeetingAnalysis(models.Model):
    meeting_date = models.DateField()
    analysis_text = models.TextField()
    # ... fields …

    def __str__(self):
        return f"MeetingAnalysis {self.meeting_date}"

class MPCMember(models.Model):
    name = models.CharField(max_length=100)
    designation = models.CharField(max_length=100)
    joined_date = models.DateField()
    # ... maybe profile picture or bio …

    def __str__(self):
        return self.name

class MPCCorrelationGraph(models.Model):
    created_on = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='mpc_correlation/')
    description = models.TextField(blank=True)

    def __str__(self):
        return f"CorrelationGraph {self.id}"

class MPCVotingPattern(models.Model):
    date = models.DateField()
    pattern_data = models.JSONField()  
    # You might store voting percentages, member votes, etc. in JSON.

    def __str__(self):
        return f"VotingPattern {self.date}"
