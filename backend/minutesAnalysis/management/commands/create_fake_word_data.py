import random
from datetime import datetime, timedelta
from django.core.management.base import BaseCommand
from minutesAnalysis.models import WordFrequency

class Command(BaseCommand):
    help = 'Create fake word frequency data for testing'

    def add_arguments(self, parser):
        parser.add_argument(
            '--years',
            type=int,
            default=3,
            help='Number of years to generate data for (default: 3)'
        )
        parser.add_argument(
            '--entries-per-month',
            type=int,
            default=50,
            help='Number of word entries per month (default: 50)'
        )

    def handle(self, *args, **options):
        years = options['years']
        entries_per_month = options['entries_per_month']
        
        # Common monetary policy words with realistic frequencies
        monetary_words = [
            # High frequency words (policy-related)
            ('monetary', (80, 150)),
            ('policy', (70, 140)),
            ('inflation', (60, 120)),
            ('rate', (50, 100)),
            ('economic', (45, 90)),
            ('growth', (40, 85)),
            ('committee', (35, 80)),
            ('decision', (30, 75)),
            ('market', (25, 70)),
            ('financial', (20, 65)),
            
            # Medium frequency words
            ('banking', (15, 60)),
            ('liquidity', (12, 55)),
            ('credit', (10, 50)),
            ('stability', (8, 45)),
            ('transmission', (6, 40)),
            ('outlook', (5, 35)),
            ('measures', (4, 30)),
            ('framework', (3, 25)),
            ('assessment', (2, 20)),
            ('conditions', (1, 15)),
            
            # Lower frequency but important words
            ('repo', (5, 25)),
            ('reverse', (3, 20)),
            ('accommodation', (2, 15)),
            ('stance', (4, 22)),
            ('neutral', (3, 18)),
            ('tightening', (2, 12)),
            ('easing', (1, 10)),
            ('calibrated', (1, 8)),
            ('gradual', (2, 14)),
            ('prudent', (1, 9)),
            
            # Economic indicators
            ('gdp', (8, 35)),
            ('cpi', (6, 30)),
            ('wpi', (4, 25)),
            ('unemployment', (3, 20)),
            ('investment', (5, 28)),
            ('consumption', (4, 24)),
            ('exports', (3, 18)),
            ('imports', (2, 16)),
            ('deficit', (2, 14)),
            ('surplus', (1, 10)),
            
            # Sectoral terms
            ('agriculture', (3, 18)),
            ('manufacturing', (4, 22)),
            ('services', (5, 26)),
            ('infrastructure', (2, 15)),
            ('msme', (2, 12)),
            ('rural', (3, 16)),
            ('urban', (2, 14)),
            
            # Global/External factors
            ('global', (8, 35)),
            ('international', (4, 22)),
            ('external', (3, 18)),
            ('commodity', (4, 20)),
            ('crude', (3, 16)),
            ('oil', (4, 18)),
            ('geopolitical', (2, 12)),
            ('uncertainty', (5, 25)),
            
            # COVID-related (for recent years)
            ('pandemic', (10, 40)),
            ('covid', (8, 35)),
            ('recovery', (6, 30)),
            ('resilience', (4, 20)),
            ('normalisation', (3, 15)),
            
            # Digital/Technology
            ('digital', (3, 18)),
            ('technology', (2, 14)),
            ('fintech', (1, 8)),
            ('payments', (4, 20)),
            ('upi', (2, 12)),
            
            # Regulatory
            ('regulatory', (4, 22)),
            ('supervision', (3, 18)),
            ('compliance', (2, 14)),
            ('governance', (2, 12)),
            ('transparency', (1, 10)),
        ]
        
        # Clear existing data
        self.stdout.write('Clearing existing word frequency data...')
        WordFrequency.objects.all().delete()
        
        # Generate data for specified years
        current_year = datetime.now().year
        start_year = current_year - years + 1
        
        total_created = 0
        
        for year in range(start_year, current_year + 1):
            self.stdout.write(f'Generating data for year {year}...')
            
            for month in range(1, 13):
                # Generate random dates within the month
                if month == 12:
                    next_month = 1
                    next_year = year + 1
                else:
                    next_month = month + 1
                    next_year = year
                
                # Create multiple meeting dates per month (typically 1-2 MPC meetings per month)
                meeting_dates = []
                
                # First meeting (usually mid-month)
                first_meeting = datetime(year, month, random.randint(5, 15))
                meeting_dates.append(first_meeting.date())
                
                # Sometimes second meeting (usually end of month)
                if random.random() > 0.3:  # 70% chance of second meeting
                    second_meeting = datetime(year, month, random.randint(20, 28))
                    meeting_dates.append(second_meeting.date())
                
                # Generate word frequencies for each meeting date
                for meeting_date in meeting_dates:
                    words_for_date = random.sample(monetary_words, 
                                                 min(entries_per_month, len(monetary_words)))
                    
                    for word, (min_freq, max_freq) in words_for_date:
                        # Add some seasonal variation
                        seasonal_multiplier = 1.0
                        
                        # Budget-related words more frequent in Feb-Mar
                        if word in ['fiscal', 'budget', 'deficit'] and month in [2, 3]:
                            seasonal_multiplier = 1.5
                        
                        # Monsoon/agriculture words more frequent in Jun-Sep
                        if word in ['agriculture', 'monsoon', 'rural'] and month in [6, 7, 8, 9]:
                            seasonal_multiplier = 1.3
                        
                        # COVID words more frequent in 2020-2022
                        if word in ['pandemic', 'covid', 'recovery'] and year in [2020, 2021, 2022]:
                            seasonal_multiplier = 2.0
                        elif word in ['pandemic', 'covid'] and year >= 2023:
                            seasonal_multiplier = 0.3
                        
                        # Calculate frequency with variation
                        base_frequency = random.randint(min_freq, max_freq)
                        final_frequency = int(base_frequency * seasonal_multiplier)
                        
                        # Ensure minimum frequency of 1
                        final_frequency = max(1, final_frequency)
                        
                        # Create the word frequency entry
                        WordFrequency.objects.create(
                            date=meeting_date,
                            word=word,
                            frequency=final_frequency
                        )
                        total_created += 1
        
        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully created {total_created} word frequency entries '
                f'for {years} years ({start_year}-{current_year})'
            )
        )
        
        # Show some statistics
        total_words = WordFrequency.objects.count()
        unique_words = WordFrequency.objects.values('word').distinct().count()
        years_covered = WordFrequency.objects.values_list('date__year', flat=True).distinct().count()
        
        self.stdout.write(f'Statistics:')
        self.stdout.write(f'  - Total entries: {total_words}')
        self.stdout.write(f'  - Unique words: {unique_words}')
        self.stdout.write(f'  - Years covered: {years_covered}')
        
        # Show top 10 most frequent words
        from django.db.models import Sum
        top_words = WordFrequency.objects.values('word').annotate(
            total_frequency=Sum('frequency')
        ).order_by('-total_frequency')[:10]
        
        self.stdout.write(f'\nTop 10 most frequent words:')
        for i, word_data in enumerate(top_words, 1):
            self.stdout.write(f'  {i}. {word_data["word"]}: {word_data["total_frequency"]}')