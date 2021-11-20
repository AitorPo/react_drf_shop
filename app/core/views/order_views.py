from django.shortcuts import render
from rest_framework import permissions

from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from core.models import Product, Order, OrderItem, ShippingAddress
from core.serializers import ProductSerializer, OrderSerializer

from rest_framework import status, viewsets
from datetime import datetime


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_object(self):
        return super().get_object()

    @action(detail=False, methods=('POST',), permission_classes=(permissions.IsAuthenticated,))
    def add(self, request):
        user = request.user
        data = request.data
        orderItems = data['orderItems']

        if orderItems and len(orderItems) == 0:
            return Response({'detail': 'No existen productos'}, status=status.HTTP_400_BAD_REQUEST)

        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice']
        )

        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingInfo']['address'],
            city=data['shippingInfo']['city'],
            postalCode=data['shippingInfo']['postalCode'],
            country=data['shippingInfo']['country'],
        )

        for orderItem in orderItems:
            product = Product.objects.get(_id=orderItem['product'])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                units=orderItem['units'],
                price=orderItem['price'],
                image=product.image.url,
            )

            product.countInStock -= item.units
            product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)

    @action(detail=False, url_path='my-orders', permission_classes=(permissions.IsAuthenticated,))
    def my_orders(self, request):
        user = request.user
        orders = user.order_set.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
    
    @action(detail=False, url_path='list-orders', permission_classes=(permissions.IsAdminUser,))
    def list_orders(self, request):
        orders = Order.objects.all()
        serializer=OrderSerializer(orders, many=True)
        return Response(serializer.data)
    
