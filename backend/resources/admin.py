from django.contrib import admin
from .models import ResourceItem

@admin.register(ResourceItem)
class ResourceItemAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "category",
        "slug",
        "created_on",
    )
    list_filter = (
        "category",
        "created_on",
    )
    search_fields = ("title", "description", "slug")
    prepopulated_fields = {"slug": ("title",)}  # auto‐populate slug from title in the admin form
    readonly_fields = ("created_on",)

    fieldsets = (
        (None, {
            "fields": ("title", "description", "category", "slug")
        }),
        ("Media Files", {
            "fields": ("thumbnail", "file", "external_url"),
            "description": "Upload a thumbnail image and/or a downloadable file. Alternatively, provide an external URL.",
        }),
        ("Metadata", {
            "fields": ("created_on",),
            "classes": ("collapse",),
        }),
    )
