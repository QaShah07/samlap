from datetime import datetime, timedelta
from django.core.management.base import BaseCommand
from minutesAnalysis.models import WordFrequency

class Command(BaseCommand):
    help = 'Create simple test data for word frequency analysis'

    def handle(self, *args, **options):
        # Clear existing data
        self.stdout.write('Clearing existing data...')
        WordFrequency.objects.all().delete()
        
        # Simple test data for 2023 and 2024
        test_data = [
            # 2023 data
            ('2023-01-15', 'monetary', 45),
            ('2023-01-15', 'policy', 38),
            ('2023-01-15', 'inflation', 32),
            ('2023-01-15', 'rate', 28),
            ('2023-01-15', 'growth', 25),
            ('2023-01-15', 'economic', 22),
            ('2023-01-15', 'committee', 18),
            ('2023-01-15', 'decision', 15),
            ('2023-01-15', 'market', 12),
            ('2023-01-15', 'banking', 10),
            
            ('2023-02-20', 'monetary', 42),
            ('2023-02-20', 'policy', 35),
            ('2023-02-20', 'inflation', 30),
            ('2023-02-20', 'rate', 26),
            ('2023-02-20', 'growth', 23),
            ('2023-02-20', 'economic', 20),
            ('2023-02-20', 'stability', 16),
            ('2023-02-20', 'liquidity', 14),
            ('2023-02-20', 'credit', 11),
            ('2023-02-20', 'framework', 8),
            
            # 2024 data
            ('2024-01-10', 'monetary', 48),
            ('2024-01-10', 'policy', 41),
            ('2024-01-10', 'inflation', 35),
            ('2024-01-10', 'rate', 31),
            ('2024-01-10', 'growth', 28),
            ('2024-01-10', 'economic', 25),
            ('2024-01-10', 'digital', 20),
            ('2024-01-10', 'technology', 18),
            ('2024-01-10', 'recovery', 15),
            ('2024-01-10', 'resilience', 12),
            
            ('2024-02-15', 'monetary', 44),
            ('2024-02-15', 'policy', 39),
            ('2024-02-15', 'inflation', 33),
            ('2024-02-15', 'rate', 29),
            ('2024-02-15', 'growth', 26),
            ('2024-02-15', 'economic', 23),
            ('2024-02-15', 'global', 19),
            ('2024-02-15', 'uncertainty', 16),
            ('2024-02-15', 'outlook', 13),
            ('2024-02-15', 'assessment', 10),
        ]
        
        created_count = 0
        for date_str, word, frequency in test_data:
            date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()
            WordFrequency.objects.create(
                date=date_obj,
                word=word,
                frequency=frequency
            )
            created_count += 1
        
        self.stdout.write(
            self.style.SUCCESS(f'Successfully created {created_count} test entries')
        )