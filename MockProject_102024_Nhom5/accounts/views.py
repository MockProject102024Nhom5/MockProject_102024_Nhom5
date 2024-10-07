# accounts/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if username and password:
        user = authenticate(request, username=username, password=password)

        if user is not None:
            return Response({
                'message': "Login successful"
            })

            # refresh = RefreshToken.for_user(user)
            # return Response({
            #     'refresh': str(refresh),
            #     'access': str(refresh.access_token),
            # })
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
    return Response({"error": "Please provide email/phone and password"}, status=status.HTTP_400_BAD_REQUEST)
