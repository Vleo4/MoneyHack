from google.auth.transport import requests
from google.oauth2 import id_token
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import *

class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Generating jwt token
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "access": access_token,
            "refresh": str(refresh),
        })

class GoogleAuthAPIView(generics.CreateAPIView):
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        CLIENT_ID = '488276422870-q1thm6trrih9sj4l9k4e22785rt47muu.apps.googleusercontent.com'
        token = request.data.get('token')
        try:
            idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)

            if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                raise ValueError('Wrong issuer.')

            email = idinfo['email']
            username = email.split('@')[0]
            user, created = FinanceUser.objects.get_or_create(username=username, email=email)

            if created:
                user.set_unusable_password()
                user.save()

            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            return Response({'access': access_token, 'refresh': str(refresh)})

        except ValueError as e:
            print(str(e))
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)