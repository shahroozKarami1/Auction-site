from django.core.validators import validate_email
from rest_framework import generics, status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

from accounts.models import User
from accounts.serializers import SignUpSerializer, LoginSerializer
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from accounts.serializers import UserProfileSerializer

from core.permissions import IsOwnerOrAdminOrReadOnly


class SignUpView(generics.CreateAPIView):
    serializer_class = SignUpSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            tokens = {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
            return Response({'message': 'User created successfully!', 'tokens': tokens}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        identifier = serializer.validated_data['phone']
        password = serializer.validated_data['password']
        try:
            print(identifier)
            obj = User.objects.get(email=identifier)
            user = authenticate(phone=obj.phone, password=password)

        except ValidationError:
            print('d')
            user = authenticate(phone=identifier, password=password)

        if user is not None:
            tokens = self.get_tokens_for_user(user)
            return Response({'message': 'Login successful!', 'tokens': tokens}, status=status.HTTP_200_OK)
        return Response({'message': 'اطلاعات وارد شده صحیح نمی باشد.'}, status=status.HTTP_400_BAD_REQUEST)

    def get_tokens_for_user(self, user):
        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }


class UserProfileCRUDView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrAdminOrReadOnly]

    def get_object(self):
        return self.request.user
