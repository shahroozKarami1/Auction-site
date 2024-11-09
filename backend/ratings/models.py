from django.db import models
from core.models import BaseModel


class Rating(BaseModel):
    user = models.ForeignKey('accounts.User', on_delete=models.CASCADE, related_name='ratings')
    product = models.ForeignKey('products.Product', on_delete=models.CASCADE, related_name='ratings')
    rating = models.IntegerField()  # 1-5 stars
    review = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Rating by {self.user.phone} for {self.product.name} - {self.rating} stars"

    class Meta:
        unique_together = ['user', 'product']


class Report(BaseModel):
    reported_by = models.ForeignKey('accounts.User', on_delete=models.CASCADE, related_name='reports')
    product = models.ForeignKey('products.Product', on_delete=models.CASCADE, related_name='reports')
    reason = models.TextField()
    status_choices = (
        ('pending', 'Pending'),
        ('reviewed', 'Reviewed'),
        ('resolved', 'Resolved'),
    )
    status = models.CharField(choices=status_choices, max_length=10, default='pending')

    def __str__(self):
        return f"Report on {self.product.name} by {self.reported_by.phone}"

    class Meta:
        ordering = ['-created_at']

