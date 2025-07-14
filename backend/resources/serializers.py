from rest_framework import serializers
from .models import ResourceItem

class ResourceItemSerializer(serializers.ModelSerializer):
    thumbnail_url = serializers.SerializerMethodField()
    file_url = serializers.SerializerMethodField()

    class Meta:
        model = ResourceItem
        fields = [
            "id",
            "title",
            "description",
            "category",
            "slug",
            "thumbnail_url",
            "file_url",
            "external_url",
        ]

    def get_thumbnail_url(self, obj):
        request = self.context.get("request")
        if obj.thumbnail and request:
            return request.build_absolute_uri(obj.thumbnail.url)
        return None

    def get_file_url(self, obj):
        request = self.context.get("request")
        if obj.file and request:
            return request.build_absolute_uri(obj.file.url)
        return None
