from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from rest_framework.response import Response

from ..models import Product, Review
from ..serializers import ProductSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('?')
    serializer_class = ProductSerializer
    permission_classes = (permissions.AllowAny,)
    
    def get_serializer_class(self):
        return ProductSerializer
    
    @action(detail=False, permission_classes=(permissions.IsAdminUser,), url_path='product')
    def get_product(self, request):
        pk = self.request.query_params.get('id')
        product = get_object_or_404(Product, _id=pk)
        serializer = self.get_serializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=('POST',), permission_classes=(permissions.IsAdminUser,), url_path='create/sample')
    def create_sample_product(self, request):
        user = request.user
        
        product = Product.objects.create(
            user=user,
            name='Producto de ejemplo',
            price=0,
            brand='Marca de ejemplo',
            countInStock=0,
            category='Categoría de ejemplo',
            description=''
        )
        serializer = self.get_serializer(product)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['DELETE'], permission_classes=(permissions.IsAdminUser,), url_path='delete')
    def delete_product(self, request):
        pk = self.request.query_params.get('id')
        deleted_product = get_object_or_404(Product, _id=pk)
        deleted_product.delete()
        return Response({'detail':'Producto eliminado'}, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=('PUT',), url_path=('update'), permission_classes=(permissions.IsAdminUser,))
    def modify(self, request):
        pk = self.request.query_params.get('id')
        product = get_object_or_404(Product, _id=pk)

        product.name = request.data['name']
        product.price = request.data['price']
        product.brand = request.data['brand']
        product.category = request.data['category']
        product.description = request.data['description']
        product.countInStock = request.data['countInStock']
        
        product.save()
        serializer = self.get_serializer(product)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=('POST',), url_path=('upload'))
    def uploadImage(self, request):
        data = request.data

        product_id = data['product_id']
        product = get_object_or_404(Product, _id=product_id)

        product.image = request.FILES.get('image')
        product.save()

        return Response('Imagen subida')
    
    @action(detail=True, methods=('POST',), permission_classes=(permissions.IsAuthenticated,))
    def review(self, request, pk):
        user = request.user
        product = get_object_or_404(Product, _id=pk)
        data = request.data
        
        review_exists = product.review_set.filter(user=user).exists()
        if(review_exists):
            content = {'detail': 'El producto ha sido valorado'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        elif data['rating'] == 0:
            content = {'detail': 'Selecciona una puntuación'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        else:
            review = Review.objects.create(
                user=user,
                product=product,
                name=user.first_name,
                rating=data['rating'],
                comment=data['comment'],
            )
            reviews_qs = product.review_set.all()
            product.numReviews = len(reviews_qs)
            total = 0
            
            for x in reviews_qs:
                total += x.rating
                
            product.rating = total / len(reviews_qs)
            product.save()
            
            return Response({'detail':'Valoración añadida'}, status=status.HTTP_201_CREATED)