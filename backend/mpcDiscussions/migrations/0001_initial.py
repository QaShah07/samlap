# Generated migration for mpcDiscussions app

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MPCDiscussion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('month_year', models.CharField(help_text="Format: 'Oct 2016', 'Jan 2017', etc.", max_length=20)),
                ('name', models.CharField(help_text='MPC Member name', max_length=100)),
                ('member_type', models.CharField(choices=[('internal', 'Internal'), ('external', 'External')], help_text='Internal or External member', max_length=10)),
                ('inflation_actual', models.CharField(help_text='Actual inflation value', max_length=50)),
                ('inflation_predicted', models.CharField(help_text='Predicted inflation value', max_length=50)),
                ('inflation_error', models.CharField(help_text='Inflation error value', max_length=50)),
                ('growth_actual', models.CharField(help_text='Actual growth value', max_length=50)),
                ('growth_predicted', models.CharField(help_text='Predicted growth value', max_length=50)),
                ('growth_error', models.CharField(help_text='Growth error value', max_length=50)),
                ('gdp_actual', models.CharField(help_text='Actual GDP value', max_length=50)),
                ('gdp_predicted', models.CharField(help_text='Predicted GDP value', max_length=50)),
                ('gdp_error', models.CharField(help_text='GDP error value', max_length=50)),
                ('analysis_score', models.FloatField(default=0.0, help_text='Analysis score for correlation plotting')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'verbose_name': 'MPC Discussion',
                'verbose_name_plural': 'MPC Discussions',
                'ordering': ['month_year', 'name'],
            },
        ),
    ]