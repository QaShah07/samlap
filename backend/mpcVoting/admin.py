from django.contrib import admin
from .models import MemberVoting, DissentYear

@admin.register(MemberVoting)
class MemberVotingAdmin(admin.ModelAdmin):
    list_display = ("name", "tenure", "hikes", "cuts", "holds", "total_votes")
    search_fields = ("name", "tenure")
    ordering = ("name",)
    
    # Explicitly define which fields to show in the form
    fields = ("name", "tenure", "hikes", "cuts", "holds")
    
    # Make total_votes read-only since it's a property
    readonly_fields = ()
    
    def total_votes(self, obj):
        return obj.total_votes
    total_votes.short_description = "Total Votes"


@admin.register(DissentYear)
class DissentYearAdmin(admin.ModelAdmin):
    list_display = ("year", "explicit_count", "implicit_count")
    ordering = ("-year",)
    fields = ("year", "explicit_count", "implicit_count")