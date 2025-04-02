
from django.urls import path, include

from product import views

urlpatterns = [
    path('product', views.list, name='list'),
    path('product/<int:product_id>/', views.show, name='show'),
]
