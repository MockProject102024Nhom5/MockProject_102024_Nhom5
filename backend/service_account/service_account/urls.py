from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('auth_app.urls')),
    path('api/audit/', include('audit_app.urls')),
    path('api/user/', include('user_app.urls')),
]
