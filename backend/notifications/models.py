from django.db import models
from core.models import BaseModel


class Notification(BaseModel):
    user = models.ForeignKey('accounts.User', on_delete=models.CASCADE, related_name='notifications')
    title = models.CharField(max_length=255)
    message = models.TextField()
    link = models.URLField(null=True, blank=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"Notification for {self.user.phone} - {self.title}"

    class Meta:
        ordering = ['-created_at']

    def mark_as_read(self):
        self.is_read = True
        self.save()
