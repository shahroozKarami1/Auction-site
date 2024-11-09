from django.contrib import admin
from .models import Payment


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('user', 'amount', 'status', 'authority', 'ref_id', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('user__phone', 'authority', 'ref_id')
    list_editable = ('status',)
    ordering = ('-created_at',)
    readonly_fields = ('created_at',)

    fieldsets = (
        (None, {
            'fields': ('user', 'amount', 'authority', 'status', 'ref_id')
        }),
        ('Timestamps', {
            'fields': ('created_at',)
        }),
    )
