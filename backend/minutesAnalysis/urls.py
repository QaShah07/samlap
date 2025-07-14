from django.urls import path
from .views import (
    WordFrequencyListAPIView,
    available_years,
    yearly_word_cloud,
    monthly_frequency_trends,
    word_statistics
)

urlpatterns = [
    # List all word frequency data
    path('words/', WordFrequencyListAPIView.as_view(), name='word-frequency-list'),
    
    # Get available years
    path('years/', available_years, name='available-years'),
    
    # Get word cloud data for specific year
    path('wordcloud/<int:year>/', yearly_word_cloud, name='yearly-word-cloud'),
    
    # Get monthly frequency trends for specific year
    path('trends/<int:year>/', monthly_frequency_trends, name='monthly-frequency-trends'),
    
    # Get general statistics
    path('statistics/', word_statistics, name='word-statistics'),
]