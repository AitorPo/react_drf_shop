from rest_framework import viewsets, permissions
from django.contrib.auth import get_user_model
from rest_framework.decorators import action

from ..models import Product
from ..serializers import ProductSerializer, UserSerializer, UserSerializerWithToken

from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status