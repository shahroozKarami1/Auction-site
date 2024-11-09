from django.db import models
from core.managers import NonArchivedObjectsManager


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_created=True, auto_now_add=True)
    updated_at = models.DateTimeField(auto_created=True, auto_now=True)
    is_archived = models.BooleanField(default=False)

    objects = NonArchivedObjectsManager()

    def delete(self, using=None, keep_parents=False):
        self.is_archived = True
        self.save()

    class Meta:
        abstract = True
