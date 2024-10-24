from django.urls import path
from .views import EmployeeListCreateView, AdminListCreateView

urlpatterns = [
    path('employees/', EmployeeListCreateView.as_view(), name='employee-list-create'),
    path('admins/', AdminListCreateView.as_view(), name='admin-list-create'),
]
