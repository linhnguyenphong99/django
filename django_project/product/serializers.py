from rest_framework import serializers
from .models import Product

class ProductSerializers(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'slug',
            'get_absolute_url',
            'description',
            'price',
            'image',
            'get_image',
        ]
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'slug',
            'get_absolute_url',
            'description',
            'price',
            'image',
            'get_image',
        ]


