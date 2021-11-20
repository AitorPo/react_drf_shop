from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .views import order_views, product_views, user_views

router=DefaultRouter()
router.register('products', product_views.ProductViewSet, basename='products')
router.register('users', user_views.UserViewSet, basename='users')
router.register('orders', order_views.OrderViewSet, basename='orders')

app_name='core'

urlpatterns = [
    path('', include(router.urls)),
    path('users/login', user_views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
]
