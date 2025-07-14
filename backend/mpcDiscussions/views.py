from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db.models import Avg
from .models import MPCDiscussion
from .serializers import (
    MPCDiscussionSerializer, 
    CorrelationDataSerializer, 
    MemberAnalysisSerializer
)

class MPCDiscussionListAPIView(generics.ListAPIView):
    """
    GET /api/mpcDiscussions/
    Returns all MPC discussion data
    """
    queryset = MPCDiscussion.objects.all()
    serializer_class = MPCDiscussionSerializer

@api_view(['GET'])
def available_years(request):
    """
    GET /api/mpcDiscussions/years/
    Returns list of available years
    """
    years = MPCDiscussion.objects.values_list('month_year', flat=True).distinct()
    unique_years = set()
    
    for month_year in years:
        try:
            year = int(month_year.split()[-1])
            unique_years.add(year)
        except:
            continue
    
    return Response(sorted(list(unique_years), reverse=True))

@api_view(['GET'])
def available_members(request):
    """
    GET /api/mpcDiscussions/members/
    Returns list of available members with their types
    """
    members = MPCDiscussion.objects.values('name', 'member_type').distinct().order_by('name')
    return Response(list(members))

@api_view(['GET'])
def correlation_data(request, year, member_type):
    """
    GET /api/mpcDiscussions/correlation/{year}/{member_type}/
    Returns correlation data for internal/external members by year
    """
    try:
        # Filter by year and member type
        discussions = MPCDiscussion.objects.filter(
            month_year__endswith=str(year),
            member_type=member_type
        )
        
        # Group by month_year and calculate average analysis score
        monthly_data = {}
        for discussion in discussions:
            month_year = discussion.month_year
            if month_year not in monthly_data:
                monthly_data[month_year] = []
            monthly_data[month_year].append(discussion.analysis_score)
        
        # Calculate averages and prepare response
        correlation_data = []
        for month_year, scores in monthly_data.items():
            avg_score = sum(scores) / len(scores) if scores else 0
            month = month_year.split()[0]
            
            correlation_data.append({
                'month_year': month_year,
                'analysis_score': round(avg_score, 2),
                'month': month
            })
        
        # Sort by month order
        month_order = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        
        correlation_data.sort(key=lambda x: month_order.index(x['month']) if x['month'] in month_order else 12)
        
        serializer = CorrelationDataSerializer(correlation_data, many=True)
        return Response(serializer.data)
        
    except Exception as e:
        return Response(
            {'error': f'Failed to fetch correlation data: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def member_analysis_data(request, year, member_name):
    """
    GET /api/mpcDiscussions/member-analysis/{year}/{member_name}/
    Returns analysis data for a specific member by year
    """
    try:
        # Filter by year and member name
        discussions = MPCDiscussion.objects.filter(
            month_year__endswith=str(year),
            name=member_name
        ).order_by('month_year')
        
        # Prepare data for response
        analysis_data = []
        for discussion in discussions:
            month = discussion.month_year.split()[0]
            
            analysis_data.append({
                'month_year': discussion.month_year,
                'month': month,
                'inflation_actual': discussion.inflation_actual,
                'inflation_predicted': discussion.inflation_predicted,
                'inflation_error': discussion.inflation_error,
                'growth_actual': discussion.growth_actual,
                'growth_predicted': discussion.growth_predicted,
                'growth_error': discussion.growth_error,
                'gdp_actual': discussion.gdp_actual,
                'gdp_predicted': discussion.gdp_predicted,
                'gdp_error': discussion.gdp_error,
            })
        
        # Sort by month order
        month_order = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        
        analysis_data.sort(key=lambda x: month_order.index(x['month']) if x['month'] in month_order else 12)
        
        serializer = MemberAnalysisSerializer(analysis_data, many=True)
        return Response(serializer.data)
        
    except Exception as e:
        return Response(
            {'error': f'Failed to fetch member analysis data: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def statistics(request):
    """
    GET /api/mpcDiscussions/statistics/
    Returns general statistics about the MPC discussions data
    """
    try:
        total_discussions = MPCDiscussion.objects.count()
        unique_members = MPCDiscussion.objects.values('name').distinct().count()
        internal_members = MPCDiscussion.objects.filter(member_type='internal').values('name').distinct().count()
        external_members = MPCDiscussion.objects.filter(member_type='external').values('name').distinct().count()
        
        years_covered = len(set([
            int(month_year.split()[-1]) 
            for month_year in MPCDiscussion.objects.values_list('month_year', flat=True).distinct()
            if month_year.split()
        ]))
        
        stats = {
            'total_discussions': total_discussions,
            'unique_members': unique_members,
            'internal_members': internal_members,
            'external_members': external_members,
            'years_covered': years_covered
        }
        
        return Response(stats)
        
    except Exception as e:
        return Response(
            {'error': f'Failed to fetch statistics: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )