from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BidsAPI, BidStepsAPI

router = DefaultRouter()
router.register(r'bids', BidsAPI, basename='bids')
router.register(r'bid-steps', BidStepsAPI, basename='bid-steps')

urlpatterns = [
    path('', include(router.urls)),
]
