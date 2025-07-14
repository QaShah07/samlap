from django.contrib import admin
from .models import WordFrequency

@admin.register(WordFrequency)
class WordFrequencyAdmin(admin.ModelAdmin):
    list_display = ('word', 'frequency', 'date', 'year', 'month')
    list_filter = ('date', 'frequency')  # Fixed: Use 'date' instead of 'date__year' and 'date__month'
    search_fields = ('word', 'date')
    ordering = ('-date', '-frequency')
    date_hierarchy = 'date'  # This provides year/month filtering automatically
    
    def year(self, obj):
        return obj.date.year
    year.short_description = 'Year'
    year.admin_order_field = 'date__year'  # Enable sorting by year
    
    def month(self, obj):
        return obj.date.strftime('%B')
    month.short_description = 'Month'
    month.admin_order_field = 'date__month'  # Enable sorting by month
    
    # Add filters for better data management
    list_per_page = 50
    
    fieldsets = (
        (None, {
            'fields': ('date', 'word', 'frequency')
        }),
    )
    
    # Add custom filters for year and month
    def get_list_filter(self, request):
        return [
            'date',
            'frequency',
            ('date', admin.DateFieldListFilter),  # This provides year/month filtering
        ]