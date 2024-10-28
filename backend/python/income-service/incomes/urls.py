from django.urls import path
from . import views

urlpatterns = [
    path('incomes/create', views.create_income, name='create_income'),
    path('incomes/<int:payment_id>/update', views.update_income, name='update_income'),
    path('incomes/<int:payment_id>', views.get_income_details, name='get_income_details'),
    path('incomes/<int:payment_id>/delete', views.delete_income, name='delete_income'),
    path('incomes', views.list_all_incomes, name='list_all_incomes'),
]
