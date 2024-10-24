from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    position = models.CharField(max_length=255)

class Admin(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=255)
