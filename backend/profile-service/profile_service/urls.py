from django.contrib import admin
from django.urls import path, include

from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    # USER URLs
    path('user_detail_api/', views.user_detail_api, name='user_detail_api'),
    path('user_update_api/', views.user_update_api, name='user_update_api'),
    path('user_delete_api/', views.user_delete_api, name='user_delete_api'),
    
    path('user_detail_api/employee_contract_detail/', views.employee_contract_api, name='employee_contract_detail'),
    path('user_detail_api/employee_timekeeping_detail/', views.employee_timekeeping_api, name='employee_timekeeping_detail'),
    path('user_detail_api/employee_trainingschedule_detail/', views.employee_trainingschedule_api, name='employee_trainingschedule_detail'),
]