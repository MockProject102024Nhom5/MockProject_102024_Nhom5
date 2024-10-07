from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, email=None, phone_number=None, password=None):
        if not email and not phone_number:
            raise ValueError('Users must have an email address or phone number')
 
        user = self.model(
            email=self.normalize_email(email),
            phone_number=phone_number,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

class User(AbstractBaseUser,  PermissionsMixin):
    email = models.EmailField(unique=True, blank=True, null=True)
    phone_number = models.CharField(max_length=15, unique=True, blank=True, null=True)
    
    USERNAME_FIELD = 'email'  # Nếu dùng email làm username, nếu không có thì để phone_number
    REQUIRED_FIELDS = []  # Trường yêu cầu khác nếu cần

    objects = UserManager()
    
    def __str__(self):
        return self.email or self.phone_number
