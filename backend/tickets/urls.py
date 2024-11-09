from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TicketViewSet, TicketAttachmentViewSet, TicketLogViewSet

router = DefaultRouter()
router.register('tickets', TicketViewSet, basename='ticket')
router.register('attachments', TicketAttachmentViewSet, basename='attachment')
router.register('logs', TicketLogViewSet, basename='log')

urlpatterns = [
    path('', include(router.urls)),
]
