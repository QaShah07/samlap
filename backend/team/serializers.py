# backend/team/serializers.py

from rest_framework import serializers
from .models import TeamMember

class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ['id', 'name', 'role', 'photo','profileUrl', 'area_of_work', 'category']
