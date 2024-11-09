from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import (
    SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView, TokenVerifyView, TokenRefreshView
)

# Admin and CKEditor routes
urlpatterns = [
    path('admin/', admin.site.urls),
    path('ckeditor/', include('ckeditor_uploader.urls')),
]

# Authentication (JWT + Rest Framework Auth) routes
urlpatterns += [
    path('api-auth/', include('rest_framework.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]

# API Schema/Documentation routes
urlpatterns += [
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]

# Application API routes
urlpatterns += [
    path('api/', include('accounts.urls')),
    path('api/', include('core.urls')),
    path('api/', include('bids.urls')),
    path('api/', include('panels.urls')),
    path('api/', include('notifications.urls')),
    path('api/', include('payments.urls')),
    path('api/', include('products.urls')),
    path('api/', include('ratings.urls')),
    path('api/', include('tickets.urls')),
]

# Static and Media URLs (only in development)
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
