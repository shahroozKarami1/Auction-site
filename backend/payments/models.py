from django.db import models
from core.models import BaseModel


class Payment(BaseModel):
    user = models.ForeignKey('accounts.User', on_delete=models.CASCADE, related_name='iranian_payments')
    amount = models.PositiveIntegerField()
    authority = models.CharField(max_length=255, unique=True)
    status_choices = (
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    )
    status = models.CharField(choices=status_choices, max_length=10, default='pending')
    ref_id = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment {self.amount} Tomans by {self.user.phone} - Status: {self.status}"

    class Meta:
        ordering = ['-created_at']
