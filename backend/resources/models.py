from django.db import models
from django.utils.text import slugify

# Category choices
CATEGORY_CHOICES = [
    ("paper", "Research Paper"),
    ("dataset", "Dataset"),
    ("code", "Code Repository"),
]

def upload_to_thumbnail(instance, filename):
    """
    Determines the upload path for thumbnails.
    E.g.: 'thumbnails/paper-impact-monetary-policy-inflation.jpg'
    """
    # instance.slug is the unique slug for this resource
    base, ext = filename.rsplit(".", 1)
    return f"thumbnails/{instance.category}-{instance.slug}.{ext.lower()}"


def upload_to_file(instance, filename):
    """
    Determines the upload path for files (PDF, CSV, etc.).
    E.g.: 'files/paper-impact-monetary-policy-inflation.pdf'
    """
    base, ext = filename.rsplit(".", 1)
    return f"files/{instance.category}-{instance.slug}.{ext.lower()}"


class ResourceItem(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        default="paper",
    )
    slug = models.SlugField(
        max_length=100,
        unique=True,
        help_text="Unique slug for this resource (e.g. 'impact-monetary-policy-inflation')"
    )

    # The thumbnail image for display (e.g. a JPG or PNG)
    thumbnail = models.ImageField(
        upload_to=upload_to_thumbnail,
        blank=True,
        null=True,
        help_text="Upload a thumbnail image (JPG, PNG)."
    )

    # The actual file that users download (e.g. PDF, CSV, XLSX)
    file = models.FileField(
        upload_to=upload_to_file,
        blank=True,
        null=True,
        help_text="Upload the downloadable file (PDF, CSV, XLSX, etc.)."
    )

    # If you instead want an external URL (like a GitHub link), use this.
    external_url = models.URLField(
        max_length=500,
        blank=True,
        null=True,
        help_text="Optional: external URL (e.g. GitHub repo). If provided, file field can be blank."
    )

    created_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_on"]
        verbose_name = "Resource Item"
        verbose_name_plural = "Resource Items"

    def __str__(self):
        return f"{self.get_category_display()} – {self.title}"

    def save(self, *args, **kwargs):
        # Auto‐generate slug from the title if not provided
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
