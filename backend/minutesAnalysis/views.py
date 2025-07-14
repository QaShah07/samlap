from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db.models import Sum, Count
from collections import defaultdict
import calendar
from .models import WordFrequency
from .serializers import WordFrequencySerializer, YearlyWordCloudSerializer, MonthlyFrequencySerializer

class WordFrequencyListAPIView(generics.ListAPIView):
    """
    GET /api/minutesAnalysis/words/
    Returns all word frequency data
    """
    queryset = WordFrequency.objects.all()
    serializer_class = WordFrequencySerializer

@api_view(['GET'])
def available_years(request):
    """
    GET /api/minutesAnalysis/years/
    Returns list of available years
    """
    years = WordFrequency.objects.values_list('date__year', flat=True).distinct().order_by('-date__year')
    return Response(list(years))

@api_view(['GET'])
def yearly_word_cloud(request, year):
    """
    GET /api/minutesAnalysis/wordcloud/{year}/
    Returns word frequency data for a specific year for word cloud generation
    """
    try:
        # Get all words for the specified year, summed by frequency
        word_data = WordFrequency.objects.filter(
            date__year=year
        ).values('word').annotate(
            total_frequency=Sum('frequency')
        ).order_by('-total_frequency')
        
        # Format data for word cloud
        words = [
            {
                'word': item['word'],
                'frequency': item['total_frequency']
            }
            for item in word_data
        ]
        
        response_data = {
            'year': year,
            'words': words
        }
        
        serializer = YearlyWordCloudSerializer(response_data)
        return Response(serializer.data)
        
    except Exception as e:
        return Response(
            {'error': f'Failed to fetch word cloud data: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def monthly_frequency_trends(request, year):
    """
    GET /api/minutesAnalysis/trends/{year}/
    Returns monthly word frequency trends for a specific year
    """
    try:
        # Get top words for the year (limit to top 10 for readability)
        top_words = WordFrequency.objects.filter(
            date__year=year
        ).values('word').annotate(
            total_frequency=Sum('frequency')
        ).order_by('-total_frequency')[:10]
        
        top_word_list = [item['word'] for item in top_words]
        
        # Get monthly data for these top words
        monthly_data = []
        
        for month in range(1, 13):
            month_name = calendar.month_name[month]
            month_words = {}
            
            # Get frequency for each top word in this month
            for word in top_word_list:
                frequency = WordFrequency.objects.filter(
                    date__year=year,
                    date__month=month,
                    word=word
                ).aggregate(total=Sum('frequency'))['total'] or 0
                
                month_words[word] = frequency
            
            monthly_data.append({
                'month': month,
                'month_name': month_name,
                'words': month_words
            })
        
        response_data = {
            'year': year,
            'monthly_data': monthly_data
        }
        
        serializer = MonthlyFrequencySerializer(response_data)
        return Response(serializer.data)
        
    except Exception as e:
        return Response(
            {'error': f'Failed to fetch monthly trends: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def word_statistics(request):
    """
    GET /api/minutesAnalysis/statistics/
    Returns general statistics about the word frequency data
    """
    try:
        total_words = WordFrequency.objects.count()
        unique_words = WordFrequency.objects.values('word').distinct().count()
        years_covered = WordFrequency.objects.values_list('date__year', flat=True).distinct().count()
        
        # Get most frequent word overall
        most_frequent = WordFrequency.objects.values('word').annotate(
            total_frequency=Sum('frequency')
        ).order_by('-total_frequency').first()
        
        stats = {
            'total_entries': total_words,
            'unique_words': unique_words,
            'years_covered': years_covered,
            'most_frequent_word': most_frequent['word'] if most_frequent else None,
            'highest_frequency': most_frequent['total_frequency'] if most_frequent else 0
        }
        
        return Response(stats)
        
    except Exception as e:
        return Response(
            {'error': f'Failed to fetch statistics: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )