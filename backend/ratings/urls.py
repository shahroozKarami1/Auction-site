from rest_framework.routers import DefaultRouter
from .views import RatingViewSet, ReportViewSet

router = DefaultRouter()
router.register(r'ratings', RatingViewSet)
router.register(r'reports', ReportViewSet)

urlpatterns = [] + router.urls
