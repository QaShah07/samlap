import random
from datetime import datetime
from django.core.management.base import BaseCommand
from mpcDiscussions.models import MPCDiscussion

class Command(BaseCommand):
    help = 'Create sample MPC discussion data for testing'

    def add_arguments(self, parser):
        parser.add_argument(
            '--years',
            type=int,
            default=3,
            help='Number of years to generate data for (default: 3)'
        )

    def handle(self, *args, **options):
        years = options['years']
        
        # Sample MPC members
        members_data = [
            # Internal members
            ('Sanjay Malhotra', 'internal'),
            ('Poonam Gupta', 'internal'),
            ('Rajiv Ranjan', 'internal'),
            
            # External members
            ('Ram Singh', 'external'),
            ('Saugata Bhattacharya', 'external'),
            ('Nagesh Kumar', 'external'),
        ]
        
        # Months for data generation
        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        
        # Clear existing data
        self.stdout.write('Clearing existing MPC discussion data...')
        MPCDiscussion.objects.all().delete()
        
        # Generate data for specified years
        current_year = datetime.now().year
        start_year = current_year - years + 1
        
        total_created = 0
        
        for year in range(start_year, current_year + 1):
            self.stdout.write(f'Generating data for year {year}...')
            
            # Generate data for each month (not all months may have data)
            for month in months:
                # 70% chance of having data for this month
                if random.random() > 0.3:
                    month_year = f"{month} {year}"
                    
                    # Generate data for each member (not all members may have data each month)
                    for name, member_type in members_data:
                        # 80% chance of having data for this member in this month
                        if random.random() > 0.2:
                            # Generate realistic economic data
                            inflation_actual = round(random.uniform(2.0, 8.0), 2)
                            inflation_predicted = round(inflation_actual + random.uniform(-1.5, 1.5), 2)
                            inflation_error = round(abs(inflation_actual - inflation_predicted), 2)
                            
                            growth_actual = round(random.uniform(3.0, 9.0), 2)
                            growth_predicted = round(growth_actual + random.uniform(-2.0, 2.0), 2)
                            growth_error = round(abs(growth_actual - growth_predicted), 2)
                            
                            gdp_actual = round(random.uniform(1500000, 3500000), 0)  # In crores
                            gdp_predicted = round(gdp_actual + random.uniform(-200000, 200000), 0)
                            gdp_error = round(abs(gdp_actual - gdp_predicted), 0)
                            
                            # Analysis score (correlation metric)
                            base_score = random.uniform(0.3, 0.9)
                            # Add some correlation with inflation
                            if inflation_actual > 6.0:
                                base_score += random.uniform(0.1, 0.3)
                            analysis_score = min(1.0, base_score)
                            
                            MPCDiscussion.objects.create(
                                month_year=month_year,
                                name=name,
                                member_type=member_type,
                                inflation_actual=str(inflation_actual),
                                inflation_predicted=str(inflation_predicted),
                                inflation_error=str(inflation_error),
                                growth_actual=str(growth_actual),
                                growth_predicted=str(growth_predicted),
                                growth_error=str(growth_error),
                                gdp_actual=str(int(gdp_actual)),
                                gdp_predicted=str(int(gdp_predicted)),
                                gdp_error=str(int(gdp_error)),
                                analysis_score=round(analysis_score, 3)
                            )
                            total_created += 1
        
        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully created {total_created} MPC discussion entries '
                f'for {years} years ({start_year}-{current_year})'
            )
        )
        
        # Show some statistics
        total_discussions = MPCDiscussion.objects.count()
        unique_members = MPCDiscussion.objects.values('name').distinct().count()
        internal_members = MPCDiscussion.objects.filter(member_type='internal').values('name').distinct().count()
        external_members = MPCDiscussion.objects.filter(member_type='external').values('name').distinct().count()
        
        self.stdout.write(f'Statistics:')
        self.stdout.write(f'  - Total discussions: {total_discussions}')
        self.stdout.write(f'  - Unique members: {unique_members}')
        self.stdout.write(f'  - Internal members: {internal_members}')
        self.stdout.write(f'  - External members: {external_members}')
        
        # Show sample data
        sample_data = MPCDiscussion.objects.all()[:5]
        self.stdout.write(f'\nSample data:')
        for discussion in sample_data:
            self.stdout.write(f'  - {discussion.name} ({discussion.member_type}) - {discussion.month_year}')