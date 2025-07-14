from django.db import models

class WordFrequency(models.Model):
    """
    Model to store word frequency data from MPC meeting minutes analysis
    """
    date = models.DateField(help_text="Date of the MPC meeting")
    word = models.CharField(max_length=100, help_text="Word from the meeting minutes")
    frequency = models.PositiveIntegerField(help_text="Frequency count of the word")
    
    class Meta:
        ordering = ['-date', '-frequency']
        unique_together = ['date', 'word']  # Prevent duplicate word entries for same date
        verbose_name = "Word Frequency"
        verbose_name_plural = "Word Frequencies"
    
    def __str__(self):
        return f"{self.word} ({self.frequency}) - {self.date}"

    @property
    def year(self):
        """Get the year from the date"""
        return self.date.year
    
    @property
    def month(self):
        """Get the month from the date"""
        return self.date.month