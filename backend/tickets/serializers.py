from rest_framework import serializers
from .models import Ticket, TicketAttachment, TicketLog


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'
        read_only_fields = ['status', 'created_at', 'updated_at']


class TicketDetailSerializer(serializers.ModelSerializer):
    attachments = serializers.StringRelatedField(many=True, read_only=True)
    logs = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Ticket
        fields = '__all__'


class TicketAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketAttachment
        fields = '__all__'


class TicketLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketLog
        fields = '__all__'
