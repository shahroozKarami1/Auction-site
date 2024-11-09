from rest_framework import serializers
from .models import Payment


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'user', 'amount', 'authority', 'status', 'ref_id', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
