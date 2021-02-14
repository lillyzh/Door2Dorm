from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('rider/', views.riderView, name='riderView'),
]
