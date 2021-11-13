from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_routes, name='routes'),
    path('products/', views.list_products, name='products'),
    path('products/<str:id>', views.retrieve_product, name='products'),
]
