from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UsersPanelAPI,
    ProductsPanelAPI,
    BidsPanelAPI,
    BidStepsPanelAPI,
    ScoreLevelViewSet,
    NotificationsPanelAPI,
    PaymentViewSet,
    TicketsPanelAPI,
    RatingPanelAPI,
    ReportPanelAPI
)

router = DefaultRouter()

router.register(r'users', UsersPanelAPI, basename='users')
router.register(r'products', ProductsPanelAPI, basename='products')
router.register(r'bids', BidsPanelAPI, basename='bids')
router.register(r'bid-steps', BidStepsPanelAPI, basename='bid-steps')
router.register(r'score-levels', ScoreLevelViewSet, basename='score-levels')
router.register(r'notifications', NotificationsPanelAPI, basename='notifications')
router.register(r'payments', PaymentViewSet, basename='payments')
router.register(r'tickets', TicketsPanelAPI, basename='tickets')
router.register(r'ratings', RatingPanelAPI, basename='ratings')
router.register(r'reports', ReportPanelAPI, basename='reports')

urlpatterns = [
    path('admin-panels/', include(router.urls)),
]
