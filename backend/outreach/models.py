# backend/outreach/models.py

from django.db import models

# 1) Model: Podcast
class Podcast(models.Model):
    # You can upload a thumbnail image for the podcast episode
    thumbnail = models.ImageField(
        upload_to="outreach/thumbnails/podcasts/",
        blank=True,
        null=True,
        help_text="Thumbnail image for this podcast episode"
    )
    title = models.CharField(max_length=255)
    episode_number = models.PositiveIntegerField(help_text="Episode number (e.g. 1, 2, 3)")
    speaker = models.CharField(max_length=255, help_text="Name of the speaker (e.g. Dr. Anya Sharma)")
    description = models.TextField(help_text="Description of this episode")
    # Either an audio file (MP3) or video URL (YouTube, Vimeo, etc.); for simplicity we'll use a URL field
    media_url = models.URLField(
        max_length=500,
        help_text="URL to the podcast audio or video (e.g. an MP3 link or YouTube embed URL)"
    )
    published_on = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ["-episode_number"]

    def __str__(self):
        return f"Episode {self.episode_number}: {self.title}"


# 2) Model: BlogPost
class BlogPost(models.Model):
    CATEGORY_CHOICES = [
        ("policy_updates", "Policy Updates"),
        ("communication_analysis", "Communication Analysis"),
        ("media_mentions", "Media Mentions"),
    ]

    title = models.CharField(max_length=255)
    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES,
        default="policy_updates",
        help_text="Blog category"
    )
    excerpt = models.TextField(help_text="Short excerpt or subtitle")
    content = models.TextField(help_text="Full blog content (not shown in list view)")
    image = models.ImageField(
        upload_to="outreach/blog/images/",
        blank=True,
        null=True,
        help_text="Feature image for the blog post"
    )
    slug = models.SlugField(max_length=100, unique=True)
    published_on = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ["-published_on"]

    def __str__(self):
        return f"{self.get_category_display()} – {self.title}"


# 3) Model: Comment
class Comment(models.Model):
    # In this simplified version, we only ask for a name and text. Avatar can be a URL or left blank.
    name = models.CharField(max_length=100)
    avatar_url = models.URLField(
        max_length=500,
        blank=True,
        null=True,
        help_text="Optional URL to user’s avatar image"
    )
    comment_text = models.TextField(help_text="The comment body")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} ({self.created_at:%Y-%m-%d %H:%M})"
