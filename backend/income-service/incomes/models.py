from django.db import models
from django.contrib.auth.models import User

class Resident(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    deflag = models.BooleanField(default=True)

class PaymentType(models.Model):
    payment_name = models.CharField(max_length=100)
    description = models.TextField()

class Payment(models.Model):
    resident = models.ForeignKey(Resident, on_delete=models.CASCADE)
    payment_date = models.DateField()
    payment_type = models.ForeignKey(PaymentType, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=50, blank=True, null=True)
    deflag = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.resident.user.username} - {self.amount}'
