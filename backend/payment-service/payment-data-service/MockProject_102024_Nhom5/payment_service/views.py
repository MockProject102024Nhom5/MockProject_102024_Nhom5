from django.shortcuts import render
from rest_framework import viewsets
from .models import Paymenttypes, Payments
from .serializers import PaymentSerializer, PaymentTypeSerializer

class PaymentTypeViewSet(viewsets.ModelViewSet):
    queryset = Paymenttypes.objects.all()
    serializer_class = PaymentTypeSerializer

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payments.objects.all()
    serializer_class = PaymentSerializer
