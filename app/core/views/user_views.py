from rest_framework import viewsets, permissions
from django.contrib.auth import get_user_model
from rest_framework.decorators import action

from ..serializers import UserSerializer, UserSerializerWithToken

from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)

    def get_serializer_class(self):
        if self.action == 'register' or self.action == 'modify':
            return UserSerializerWithToken
        elif self.action == 'list_users' or self.action == 'profile':
            return UserSerializer
        return UserSerializer

    def get_object(self):
        return self.request.user

    def get_queryset(self):
        return get_user_model().objects.all()

    @action(detail=False, permission_classes=(permissions.IsAuthenticated,))
    def profile(self, request):
        serializer = self.get_serializer(self.get_object())
        return Response(serializer.data)

    @action(detail=False, permission_classes=(permissions.IsAdminUser,))
    def list_users(self, request):
        users = get_user_model().objects.all()
        serializer = self.get_serializer(users, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=('POST',), permission_classes=(permissions.AllowAny,))
    def register(self, request):
        try:
            user = get_user_model().objects.create(
                first_name=request.data['name'],
                username=request.data['email'],
                email=request.data['email'],
                password=make_password(request.data['password'])
            )
            serializer = self.get_serializer(user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except:
            message = {'detail': 'Ya existe un usuario con este email'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=('PUT',), url_path=('update'), permission_classes=(permissions.IsAuthenticated,))
    def modify(self, request):
        user = self.request.user
        serializer = self.get_serializer(user)

        user.first_name = request.data['name']
        user.username = request.data['email']
        user.email = request.data['email']

        if request.data['password'] != '':
            user.password = make_password(request.data['password'])
        user.save()

        return Response(serializer.data)
