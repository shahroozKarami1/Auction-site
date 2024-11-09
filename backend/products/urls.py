from rest_framework import routers
from django.urls import path, include
from .views import (
    ProductCategoryViewSet, ProductViewSet,
    ProductAttributeViewSet, ProductImageViewSet,
    UserAuctionRequestViewSet, WallBannersViewSet, ProductSearchAPIView
)

router = routers.DefaultRouter()

router.register(r'categories', ProductCategoryViewSet, basename='productcategory')
router.register(r'products', ProductViewSet, basename='product')
router.register(r'attributes', ProductAttributeViewSet, basename='productattribute')
router.register(r'images', ProductImageViewSet, basename='productimage')
router.register(r'auction-requests', UserAuctionRequestViewSet, basename='userauctionrequest')
router.register(r'wall-banners', WallBannersViewSet, basename='wallbanners')


urlpatterns = [
    path('products/search/', ProductSearchAPIView.as_view(), name='product-search'),
    path('', include(router.urls)),
]
