# backend/team/admin.py

from django.contrib import admin
from .models import TeamMember

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'category')
    list_filter  = ('category',)
    search_fields = ('name', 'role')
