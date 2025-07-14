# backend/outreach/serializers.py

from rest_framework import serializers
from .models import Podcast, BlogPost, Comment

class PodcastSerializer(serializers.ModelSerializer):
    thumbnail_url = serializers.SerializerMethodField()

    class Meta:
        model = Podcast
        fields = [
            "id",
            "title",
            "episode_number",
            "speaker",
            "description",
            "media_url",
            "thumbnail_url",
            "published_on",
        ]

    def get_thumbnail_url(self, obj):
        request = self.context.get("request")
        if obj.thumbnail and request:
            return request.build_absolute_uri(obj.thumbnail.url)
        return None


class BlogPostSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = [
            "id",
            "title",
            "category",
            "excerpt",
            "slug",
            "image_url",
            "published_on",
        ]

    def get_image_url(self, obj):
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = [
            "id",
            "name",
            "avatar_url",
            "comment_text",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]
