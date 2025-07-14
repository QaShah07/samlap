# backend/ourworks/serializers.py
from rest_framework import serializers
from .models import OurWork

class OurWorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = OurWork
        fields = '__all__'
