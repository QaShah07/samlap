from django.urls import path
from .views import (
    MPCDiscussionListAPIView,
    available_years,
    available_members,
    correlation_data,
    member_analysis_data,
    statistics
)

urlpatterns = [
    # List all discussions
    path('', MPCDiscussionListAPIView.as_view(), name='mpc-discussions-list'),
    
    # Get available years
    path('years/', available_years, name='available-years'),
    
    # Get available members
    path('members/', available_members, name='available-members'),
    
    # Get correlation data for internal/external members by year
    path('correlation/<int:year>/<str:member_type>/', correlation_data, name='correlation-data'),
    
    # Get member analysis data by year and member name
    path('member-analysis/<int:year>/<str:member_name>/', member_analysis_data, name='member-analysis-data'),
    
    # Get general statistics
    path('statistics/', statistics, name='statistics'),
]