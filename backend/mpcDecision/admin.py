# backend/mpcDecision/admin.py

from django.contrib import admin
from .models import MPCDecision

@admin.register(MPCDecision)
class MPCDecisionAdmin(admin.ModelAdmin):
    list_display = (
        "date",
        "policy_change",
        "voting_pattern",
        "explicit_dissenter",
        "implicit_dissent_score",
    )
    list_filter = ("policy_change",)
    search_fields = ("date", "policy_change", "explicit_dissenter")
    ordering = ("-date",)
