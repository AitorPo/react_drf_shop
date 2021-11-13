from django.http.response import JsonResponse
from django.shortcuts import render
from .products import products

from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def get_routes(request):
    return JsonResponse('Hello', safe=False)

@api_view(['GET'])
def list_products(request):
    return Response(products)

@api_view(['GET'])
def retrieve_product(request, id):
    product = None
    for p in products:
        if p['_id'] == id:
            product = p
            break
    return Response(product)
