from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, status, permissions

from .models import Product
from .serializers import ProductSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permissions = (permissions.AllowAny,)

    def get_object(self):
        return super().get_object()

    @action(detail=False,)
    def list_products(self, request):
        products = Product.objects.all()
        return Response(ProductSerializer(products, many=True).data, 
                        status=status.HTTP_200_OK)

    @action(detail=True, )
    def retrieve_product(self, request, pk=None):
        product = self.get_object()
        return Response(ProductSerializer(product).data, 
                        status=status.HTTP_200_OK)
