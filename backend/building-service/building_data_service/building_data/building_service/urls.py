from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BuildingAmenitiesViewSet, BuildingdocumentsViewSet,BuildingViewSet

router = DefaultRouter()
router.register(r'building-amenities', BuildingAmenitiesViewSet)
router.register(r'building-document', BuildingdocumentsViewSet)
router.register(r'building', BuildingViewSet)
urlpatterns = [
    path('', include(router.urls)),
]