from django.contrib import admin
from .models import ProductCategory, Product, ProductAttribute, ProductImage, UserAuctionReqeust, WallBanners


@admin.register(ProductCategory)
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'parent','is_main')
    list_filter = ('parent',)
    search_fields = ('name',)
    ordering = ('name',)


class ProductAttributeInline(admin.TabularInline):
    model = ProductAttribute
    extra = 1
    fields = ('name', 'value')


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    fields = ('image', 'is_main')


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'name', 'seller', 'category', 'current_price', 'start_price', 'end_price', 'status', 'auction_start_date',
        'auction_end_date', 'bids_count')
    list_filter = ('status', 'category', 'auction_start_date', 'auction_end_date')
    search_fields = ('name', 'seller__phone', 'category__name')
    ordering = ('-auction_start_date',)
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProductAttributeInline, ProductImageInline]
    readonly_fields = ('bids_count',)

    fieldsets = (
        (None, {
            'fields': ('seller', 'category', 'name', 'description', 'slug')
        }),
        ('Pricing and Auction Info', {
            'fields': ('current_price', 'start_price', 'end_price', 'max_price', 'status', 'auction_start_date',
                       'auction_end_date')
        }),
        ('Extra Info', {
            'fields': ('bids_count',)
        }),
    )


@admin.register(ProductAttribute)
class ProductAttributeAdmin(admin.ModelAdmin):
    list_display = ('product', 'name', 'value')
    search_fields = ('product__name', 'name', 'value')
    ordering = ('product__name',)


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ('product', 'is_main', 'image')
    list_filter = ('is_main',)
    search_fields = ('product__name',)
    ordering = ('product__name',)


@admin.register(UserAuctionReqeust)
class UserAuctionRequestAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('user__phone', 'product__name')
    ordering = ('-created_at',)
    list_editable = ('status',)


@admin.register(WallBanners)
class WallBannersAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'is_main']
    list_filter = []
    search_fields = []
    ordering = ('-created_at',)
