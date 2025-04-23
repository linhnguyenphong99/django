
from django.urls import path, include

from userProfile import views

urlpatterns = [
    path('login', views.login_user, name='login_user'),
    path('register', views.register_user, name='register_user'),
    path('user/info', views.get_user, name='get_user'),
]
