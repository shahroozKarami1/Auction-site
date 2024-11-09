from rest_framework import serializers
from .models import ProductCategory, Product, ProductAttribute, ProductImage, UserAuctionReqeust, WallBanners


class ProductCategorySerializer(serializers.ModelSerializer):
    subcategories = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = ProductCategory
        fields = ['id', 'name', 'parent',"slug", "is_main", 'subcategories', 'products']
        read_only_fields = ['id']
        depth = 1


class ProductAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductAttribute
        fields = ['id', 'name', 'value', 'product']
        read_only_fields = ['id']


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'product', 'image', 'is_main']
        read_only_fields = ['id']


class ProductSerializer(serializers.ModelSerializer):
    attributes = ProductAttributeSerializer(many=True, read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    bids_count = serializers.IntegerField(read_only=True)
    sold_out = serializers.BooleanField(read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'seller', 'category', 'name', 'description', 'slug',
            'current_price', 'start_price', 'end_price', 'max_price',
            'status', 'auction_start_date', 'auction_end_date',
            'attributes', 'images', 'bids_count', 'sold_out', 'for_level', "current_step"
        ]
        read_only_fields = ['id']
        depth = 2


class UserAuctionRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAuctionReqeust
        fields = ['id', 'user', 'product', 'status']
        read_only_fields = ['id']
        depth = 2


class WallBannersSerializer(serializers.ModelSerializer):
    class Meta:
        model = WallBanners
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']
        depth = 2

