from rest_framework import serializers
from .models import Paymenttypes, Payments

class PaymentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paymenttypes
        fields = '__all__'

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payments
        fields = '__all__'
