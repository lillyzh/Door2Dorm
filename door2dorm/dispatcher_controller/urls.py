from django.urls import path

from . import views

urlpatterns = [
    path('', views.ride_queue_view, name='ride_queue_view'),
    path('cr-student/', views.create_student, name='create_student'),
    path('driver/login/', views.driver_login, name='driver_login'),
]
