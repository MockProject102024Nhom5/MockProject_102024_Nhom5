# account/urls.py
from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('login', views.login_view, name='api_login'),
    # path('get_token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
]
