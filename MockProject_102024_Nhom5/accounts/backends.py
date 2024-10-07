# account/backends.py
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

class EmailOrPhoneBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        User = get_user_model()

        try:
            if '@' in username:  # Nếu là email
                user = User.objects.get(email=username)
            else:  # Nếu là số điện thoại
                user = User.objects.get(phone_number=username)
        except User.DoesNotExist:
            return None

        if user.check_password(password):
            return user
        return None
