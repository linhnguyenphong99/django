
from django.urls import path, include

from product import views

urlpatterns = [
    path('product', views.list, name='list'),
    path('product/<slug:slug>/', views.show, name='show'),
]
