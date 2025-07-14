# backend/outreach/admin.py

from django.contrib import admin
from .models import Podcast, BlogPost, Comment

@admin.register(Podcast)
class PodcastAdmin(admin.ModelAdmin):
    list_display = ("episode_number", "title", "speaker", "published_on")
    list_filter = ("published_on",)
    search_fields = ("title", "speaker", "episode_number")
    # prepopulated_fields = {"slug": ("title",)}


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "slug", "published_on")
    list_filter = ("category", "published_on")
    search_fields = ("title", "category", "slug")
    # prepopulated_fields = {"slug": ("title",)}


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("name", "created_at")
    list_filter = ("created_at",)
    search_fields = ("name", "comment_text")
    readonly_fields = ("created_at",)
