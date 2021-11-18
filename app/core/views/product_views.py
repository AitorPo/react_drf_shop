from rest_framework import viewsets, permissions
from rest_framework.decorators import action

from ..models import Product
from ..serializers import ProductSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('?')
    serializer_class = ProductSerializer
    permission_classes = (permissions.AllowAny,)