# backend/outreach/urls.py

from django.urls import path
from .views import PodcastListAPIView, BlogPostListAPIView, CommentListCreateAPIView

urlpatterns = [
    path("podcasts/", PodcastListAPIView.as_view(), name="podcast-list"),
    path("blogs/", BlogPostListAPIView.as_view(), name="blogpost-list"),
    path("comments/", CommentListCreateAPIView.as_view(), name="comment-list-create"),
]
