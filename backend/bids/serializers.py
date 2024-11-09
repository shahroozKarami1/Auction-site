from rest_framework import serializers

from products.models import Product
from .models import Bid, BidStep, ScoreLevel


class BidSerializer(serializers.ModelSerializer):
    is_winner = serializers.BooleanField(read_only=True)
    is_highest = serializers.BooleanField(read_only=True)

    class Meta:
        model = Bid
        fields = [
            'id',
            'user',
            'product',
            'amount',
            'status',
            'manual_update',
            'is_winner',
            'is_highest',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id','user', 'status', 'is_winner', 'is_highest', 'manual_update', 'created_at', 'updated_at']

    def validate_amount(self, value):
        product_id = self.instance.product if self.instance else self.initial_data.get('product')
        print(product_id)
        product = Product.objects.get(id=product_id)
        if value <= product.current_price:
            raise serializers.ValidationError("Bid amount must be higher than the current price")
        return value

    def create(self, validated_data):

        return super().create(validated_data)

    def update(self, instance, validated_data):
        if instance.manual_update:
            raise serializers.ValidationError("Manual updates are not allowed for this bid")
        return super().update(instance, validated_data)


class BidStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = BidStep
        fields = ['id', 'step_size', 'start_price', 'end_price', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate(self, data):
        if data['start_price'] >= data['end_price']:
            raise serializers.ValidationError("Start price must be less than the end price")
        return data


class ScoreLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScoreLevel
        fields = ['id', 'level', 'score', 'max_amount_bid', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
