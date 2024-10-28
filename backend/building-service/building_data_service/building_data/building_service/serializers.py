from rest_framework import serializers
from .models import Buildings,Buildingdocuments,BuildingAmenities

class BuildingdocumentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Buildingdocuments
        fields = '__all__'

class BuildingAmenitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = BuildingAmenities
        fields = '__all__'
class BuildingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Buildings
        fields = '__all__'
