from django.db.models import Q
from rest_framework import viewsets, filters, generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend

from core.permissions import IsOwnerOrAdminOrReadOnly, IsAdminUserOrReadOnly, IsOwner
from .models import ProductCategory, Product, ProductAttribute, ProductImage, UserAuctionReqeust, WallBanners
from .serializers import (
    ProductCategorySerializer, ProductSerializer,
    ProductAttributeSerializer, ProductImageSerializer,
    UserAuctionRequestSerializer, WallBannersSerializer
)


class ProductCategoryViewSet(viewsets.ModelViewSet):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer
    permission_classes = [IsAdminUserOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['name', 'parent__slug','is_main']
    search_fields = ['name']
    ordering_fields = ['name']
    lookup_field = 'slug'


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['seller', 'category__slug', 'status']
    search_fields = ['name', 'description', 'category__name']
    ordering_fields = ['current_price', 'auction_start_date', 'auction_end_date', 'name']
    lookup_field = 'slug'

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)


class ProductAttributeViewSet(viewsets.ModelViewSet):
    queryset = ProductAttribute.objects.all()
    serializer_class = ProductAttributeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['product', 'name']
    search_fields = ['name', 'value']
    ordering_fields = ['name', 'value']


class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['product', 'is_main']
    search_fields = ['product__name']
    ordering_fields = ['is_main']


class ProductSearchAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        query = self.request.query_params.get('query', None)
        city = self.request.query_params.get('city', None)

        # Apply search filter if 'query' parameter is provided
        if query:
            queryset = queryset.filter(
                Q(name__icontains=query) | Q(description__icontains=query)
            )

        # Apply city filter if 'city' parameter is provided
        if city:
            queryset = queryset.filter(city__iexact=city)

        return queryset


class UserAuctionRequestViewSet(viewsets.ModelViewSet):
    queryset = UserAuctionReqeust.objects.all()
    serializer_class = UserAuctionRequestSerializer
    permission_classes = [IsAuthenticated, IsOwner]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['user', 'product', 'status']
    search_fields = ['user__username', 'product__name']
    ordering_fields = ['status']

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class WallBannersViewSet(viewsets.ModelViewSet):
    queryset = WallBanners.objects.all()
    serializer_class = WallBannersSerializer
    permission_classes = [IsAdminUserOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['is_main', 'category__slug']
    search_fields = []
    ordering_fields = ['id']

