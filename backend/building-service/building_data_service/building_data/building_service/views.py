from django.shortcuts import render
from rest_framework import viewsets
from .models import BuildingAmenities, Buildings,Buildingdocuments
from .serializers import BuildingAmenitiesSerializer, BuildingSerializer,BuildingdocumentsSerializer

class BuildingAmenitiesViewSet(viewsets.ModelViewSet):
    queryset = BuildingAmenities.objects.all()
    serializer_class = BuildingAmenitiesSerializer

class BuildingdocumentsViewSet(viewsets.ModelViewSet):
    queryset = Buildingdocuments.objects.all()
    serializer_class = BuildingdocumentsSerializer
class BuildingViewSet(viewsets.ModelViewSet):
    queryset = Buildings.objects.all()
    serializer_class = BuildingSerializer
