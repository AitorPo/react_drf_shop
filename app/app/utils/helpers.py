import uuid, os
from django.utils.deconstruct import deconstructible
from rest_framework import pagination
from rest_framework.response import Response

@deconstructible
class PathAndRename(object):
    def __init__(self, sub_path):
        self.path = sub_path

    def __call__(self, instance, filename):
        ext = filename.split(".")[-1]
        filename = f"{uuid.uuid4()}.{ext}"
        return os.path.join(self.path, filename)
    
    
class CustomPagination(pagination.PageNumberPagination):
    def get_paginated_response(self, data):
        return Response({
            'pages': self.page.paginator.num_pages,
            'page': self.get_page_number(self.request, self),
            'results': data
        })