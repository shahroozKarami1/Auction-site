from django.contrib import admin
from .models import Rating, Report


@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'rating', 'created_at')
    list_filter = ('rating', 'created_at')
    search_fields = ('user__phone', 'product__name')
    ordering = ('-created_at',)
    readonly_fields = ('created_at',)

    fieldsets = (
        (None, {
            'fields': ('user', 'product', 'rating', 'review')
        }),
        ('Date Information', {
            'fields': ('created_at',)
        }),
    )


@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ('reported_by', 'product', 'reason', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('reported_by__phone', 'product__name', 'reason')
    ordering = ('-created_at',)
    list_editable = ('status',)
    readonly_fields = ('created_at',)

    fieldsets = (
        (None, {
            'fields': ('reported_by', 'product', 'reason')
        }),
        ('Status', {
            'fields': ('status',)
        }),
        ('Date Information', {
            'fields': ('created_at',)
        }),
    )
