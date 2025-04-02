from django.shortcuts import render
from django.db.models import Q

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Product
from .serializers import ProductSerializers, ProductSerializer
from django.shortcuts import get_object_or_404

@api_view(['GET'])
def list(request):
    product = Product.objects.filter(
        Q(name__icontains=request.query_params.get("name")) |
        Q(description__icontains=request.query_params.get("name"))
    )
    serializer =ProductSerializers(product, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def show(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    serializer = ProductSerializer(product)
    return Response(serializer.data)



