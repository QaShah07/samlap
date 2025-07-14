# Generated migration for minutesAnalysis app

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='WordFrequency',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(help_text='Date of the MPC meeting')),
                ('word', models.CharField(help_text='Word from the meeting minutes', max_length=100)),
                ('frequency', models.PositiveIntegerField(help_text='Frequency count of the word')),
            ],
            options={
                'verbose_name': 'Word Frequency',
                'verbose_name_plural': 'Word Frequencies',
                'ordering': ['-date', '-frequency'],
            },
        ),
        migrations.AddConstraint(
            model_name='wordfrequency',
            constraint=models.UniqueConstraint(fields=('date', 'word'), name='unique_word_per_date'),
        ),
    ]