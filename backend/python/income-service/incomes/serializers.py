from rest_framework import serializers
from .models import Payment

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'resident', 'payment_type', 'payment_date', 'amount', 'payment_method']
