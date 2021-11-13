from django.urls import path, include

from rest_framework.routers import DefaultRouter

from . import views

router=DefaultRouter()
router.register('products', views.ProductViewSet, basename='products')

app_name='core'

urlpatterns = [
    path('', include(router.urls)),
]
