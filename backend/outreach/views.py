# backend/outreach/views.py

from rest_framework import generics, status
from rest_framework.response import Response
from .models import Podcast, BlogPost, Comment
from .serializers import PodcastSerializer, BlogPostSerializer, CommentSerializer

# 1) List all podcasts
class PodcastListAPIView(generics.ListAPIView):
    queryset = Podcast.objects.all()
    serializer_class = PodcastSerializer


# 2) List all blog posts
class BlogPostListAPIView(generics.ListAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer


# 3) List all comments & create a new comment
class CommentListCreateAPIView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    # Override create so we can do extra logic (e.g. Google Sheets logging if desired)
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        comment = serializer.save()

        # OPTIONALLY: append to Google Sheets here
        # from .google_sheets import append_comment_to_sheet
        # try:
        #     append_comment_to_sheet(comment)
        # except Exception:
        #     pass

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
