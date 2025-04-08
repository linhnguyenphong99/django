from django.shortcuts import render
from django.db.models import Q

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Product
from .serializers import ProductSerializers, ProductSerializer
from django.shortcuts import get_object_or_404

@api_view(['GET'])
def list(request):
    try:
        query = Q()
        if name := request.GET.get('name'):
            query = Q(name__icontains=name)
            query |= Q(description__icontains=name)

        products = Product.objects.filter(query)
        serializer =ProductSerializers(products, many=True)
        return Response(serializer.data)
    except:
        return Response(
            {'error': 'Internal Server Error'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def show(request, slug):
    product = get_object_or_404(Product, slug=slug)
    serializer = ProductSerializer(product)
    return Response(serializer.data)



