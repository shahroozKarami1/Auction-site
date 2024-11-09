from django.db import models
from core.models import BaseModel


class Ticket(BaseModel):
    user = models.ForeignKey('accounts.User', on_delete=models.CASCADE, related_name='tickets')
    subject = models.CharField(max_length=255)
    message = models.TextField()
    response = models.TextField(blank=True, null=True)

    priority_choices = (
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('critical', 'Critical'),
    )
    priority = models.CharField(choices=priority_choices, max_length=50, default='medium')

    status_choices = (
        ('open', 'Open'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved'),
        ('closed', 'Closed'),
        ('pending', 'Pending'),
        ('reopened', 'Reopened'),
    )
    status = models.CharField(choices=status_choices, max_length=50, default='open')

    department_choices = (
        ('support', 'Support'),
        ('billing', 'Billing'),
        ('technical', 'Technical'),
    )
    department = models.CharField(choices=department_choices, max_length=50, default='support')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Ticket {self.id} by {self.user.phone} - {self.subject}"

    class Meta:
        ordering = ['-created_at']


class TicketAttachment(BaseModel):
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE, related_name='attachments')
    file = models.FileField(upload_to='ticket_attachments/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Attachment for Ticket {self.ticket.id}"


class TicketLog(BaseModel):
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE, related_name='logs')
    action = models.CharField(max_length=255)
    performed_by = models.ForeignKey('accounts.User', on_delete=models.SET_NULL, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Log {self.action} on Ticket {self.ticket.id} by {self.performed_by.phone}"

    class Meta:
        ordering = ['-timestamp']
