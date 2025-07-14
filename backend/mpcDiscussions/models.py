from django.db import models

class MPCDiscussion(models.Model):
    MEMBER_TYPE_CHOICES = [
        ('internal', 'Internal'),
        ('external', 'External'),
    ]
    
    month_year = models.CharField(
        max_length=20, 
        help_text="Format: 'Oct 2016', 'Jan 2017', etc."
    )
    name = models.CharField(max_length=100, help_text="MPC Member name")
    member_type = models.CharField(
        max_length=10, 
        choices=MEMBER_TYPE_CHOICES,
        help_text="Internal or External member"
    )
    
    # Inflation data - Changed to store analysis strings
    inflation_actual = models.CharField(max_length=500, help_text="Actual inflation analysis", blank=True, null=True)
    inflation_predicted = models.CharField(max_length=500, help_text="Predicted inflation analysis", blank=True, null=True)
    inflation_error = models.CharField(max_length=500, help_text="Inflation error analysis", blank=True, null=True)
    
    # Growth data - Changed to store analysis strings
    growth_actual = models.CharField(max_length=500, help_text="Actual growth analysis", blank=True, null=True)
    growth_predicted = models.CharField(max_length=500, help_text="Predicted growth analysis", blank=True, null=True)
    growth_error = models.CharField(max_length=500, help_text="Growth error analysis", blank=True, null=True)
    
    # GDP data - Changed to store analysis strings
    gdp_actual = models.CharField(max_length=500, help_text="Actual GDP analysis", blank=True, null=True)
    gdp_predicted = models.CharField(max_length=500, help_text="Predicted GDP analysis", blank=True, null=True)
    gdp_error = models.CharField(max_length=500, help_text="GDP error analysis", blank=True, null=True)
    
    # Analysis score for correlation plot
    analysis_score = models.FloatField(
        help_text="Analysis score for correlation plotting",
        default=0.0
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['month_year', 'name']
        verbose_name = "MPC Discussion"
        verbose_name_plural = "MPC Discussions"
    
    def __str__(self):
        return f"{self.name} - {self.month_year} ({self.member_type})"
    
    @property
    def year(self):
        """Extract year from month_year string"""
        try:
            return int(self.month_year.split()[-1])
        except:
            return None
    
    @property
    def month(self):
        """Extract month from month_year string"""
        try:
            return self.month_year.split()[0]
        except:
            return None