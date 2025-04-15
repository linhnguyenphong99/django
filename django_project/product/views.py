from django.shortcuts import render
from django.db.models import Q

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.pagination import PageNumberPagination

from .models import Product
from .serializers import ProductSerializers, ProductSerializer
from django.shortcuts import get_object_or_404

@api_view(['GET'])
def list(request):
    try:
        class ProductPagination(PageNumberPagination):
            page_size = 5  # Set the number of items per page

        query  = Q()
        if name  := request.GET.get('name'):
           query  = Q(name__icontains=name)
           query |= Q(description__icontains=name)

        products           = Product.objects.filter(query)
        paginator          = ProductPagination()
        paginated_products = paginator.paginate_queryset(products, request)
        serializer         = ProductSerializers(paginated_products, many=True)

        # Include total page count in the response
        response_data = {
            'total'   : paginator.page.paginator.num_pages,
            'page'    : paginator.page.number,
            'next'    : paginator.get_next_link(),
            'previous': paginator.get_previous_link(),
            'results' : serializer.data,
        }
        return Response(response_data, status=status.HTTP_200_OK)
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



