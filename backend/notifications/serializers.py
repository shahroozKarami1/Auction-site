from rest_framework import serializers
from .models import Notification


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'user', 'title', 'message', 'link', 'is_read', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def update(self, instance, validated_data):
        if 'is_read' in validated_data and validated_data['is_read'] == True:
            instance.mark_as_read()
        return super().update(instance, validated_data)
