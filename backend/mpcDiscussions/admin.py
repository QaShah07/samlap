from django.contrib import admin
from .models import MPCDiscussion

@admin.register(MPCDiscussion)
class MPCDiscussionAdmin(admin.ModelAdmin):
    list_display = ['name', 'month_year', 'member_type', 'analysis_score', 'created_at']
    list_filter = ['member_type', 'month_year', 'name']
    search_fields = ['name', 'month_year']
    ordering = ['-created_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('month_year', 'name', 'member_type', 'analysis_score')
        }),
        ('Inflation Analysis', {
            'fields': ('inflation_actual', 'inflation_predicted', 'inflation_error'),
            'classes': ('collapse',)
        }),
        ('Growth Analysis', {
            'fields': ('growth_actual', 'growth_predicted', 'growth_error'),
            'classes': ('collapse',)
        }),
        ('GDP Analysis', {
            'fields': ('gdp_actual', 'gdp_predicted', 'gdp_error'),
            'classes': ('collapse',)
        }),
    )
    
    def get_readonly_fields(self, request, obj=None):
        if obj:  # editing an existing object
            return ['created_at']
        return []