from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from core.models import Product, Order, OrderItem, ShippingAddress
from core.serializers import ProductSerializer, OrderSerializer

from rest_framework import status, viewsets, permissions
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

        ShippingAddress.objects.create(
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
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, url_path='my-orders', permission_classes=(permissions.IsAuthenticated,))
    def my_orders(self, request):
        user = request.user
        orders = user.order_set.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False, permission_classes=(permissions.IsAuthenticated,), url_path='order')
    def order(self, request):
        user = request.user
        pk = self.request.query_params.get('id')
        try:
            order = Order.objects.get(_id=pk)
            if user.is_staff or order.user == user:
                serializer = OrderSerializer(order)
                return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({'detail':'No existe ese pedido'}, status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=False, url_path='list-orders', permission_classes=(permissions.IsAdminUser,))
    def list_orders(self, request):
        orders = Order.objects.all().order_by('-_id')
        serializer=OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=('PUT',) ,permission_classes=(permissions.IsAuthenticated,), url_path='pay')
    def payOrder(self, request):
        pk = self.request.query_params.get('id')
        order = Order.objects.get(_id=pk)
        order.isPaid = True
        order.paidAt = datetime.now()
        order.save()
        return Response({'detail': 'Pedido pagado y actualizado'}, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=('PUT',), url_path=('deliver'), permission_classes=(permissions.IsAdminUser,))
    def modify_order_by_admin(self, request):
        pk = self.request.query_params.get('id')
        order = get_object_or_404(Order, _id=pk)

        order.isDelivered = True
        order.deliveredAt = datetime.now()
        
        order.save()

        return Response({'detail':'Pedido enviado'}, status=status.HTTP_200_OK)
    
    
