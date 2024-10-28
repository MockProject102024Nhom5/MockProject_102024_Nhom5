from rest_framework import generics
from .models import AuditLog
from .serializers import AuditLogSerializer

class AuditLogListView(generics.ListCreateAPIView):
    queryset = AuditLog.objects.all()
    serializer_class = AuditLogSerializer
