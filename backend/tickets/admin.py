from django.contrib import admin
from .models import Ticket, TicketAttachment, TicketLog


@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    list_display = ('user', 'subject', 'status', 'priority', 'department', 'created_at', 'updated_at')
    list_filter = ('status', 'priority', 'department', 'created_at', 'updated_at')
    search_fields = ('user__phone', 'subject', 'message', 'response')
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)


@admin.register(TicketAttachment)
class TicketAttachmentAdmin(admin.ModelAdmin):
    list_display = ('ticket', 'file', 'uploaded_at')
    readonly_fields = ('uploaded_at',)


@admin.register(TicketLog)
class TicketLogAdmin(admin.ModelAdmin):
    list_display = ('ticket', 'action', 'performed_by', 'timestamp')
    readonly_fields = ('timestamp',)
