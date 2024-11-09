from django.db import models


class NonArchivedObjectsManager(models.Manager):
    """
    Custom manager to retrieve only non-archived objects.
    """
    def get_queryset(self):
        return super().get_queryset().filter(is_archived=False)
