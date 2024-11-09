from django.urls import path
from accounts.views import SignUpView, LoginView, UserProfileCRUDView

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', UserProfileCRUDView.as_view(), name='profile-crud'),

]

