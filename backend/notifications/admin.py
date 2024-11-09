from django.contrib import admin
from .models import Notification


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'is_read', 'created_at', 'link')
    list_filter = ('is_read', 'created_at')
    search_fields = ('user__phone', 'title', 'message')
    list_editable = ('is_read',)
    ordering = ('-created_at',)
    readonly_fields = ('created_at',)

    fieldsets = (
        (None, {
            'fields': ('user', 'title', 'message', 'link', 'is_read')
        }),
        ('Timestamps', {
            'fields': ('created_at',)
        }),
    )

