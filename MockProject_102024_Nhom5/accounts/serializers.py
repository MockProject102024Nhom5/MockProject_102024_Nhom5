from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.contrib.auth import authenticate

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        username = attrs.get("username")  # mặc định là username
        password = attrs.get("password")

        if username and password:
            user = authenticate(username=username, password=password)
            
            if user:
                refresh = self.get_token(user)
                data = {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
                return data
            else:
                raise serializers.ValidationError({"error": "Invalid credentials"})
        else:
            raise serializers.ValidationError({"error": "Username and password required"})
