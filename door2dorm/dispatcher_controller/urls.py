from django.urls import path

from . import views

urlpatterns = [
    path('', views.database_view, name='database_view'),
    path('driver/application/', views.driver_app, name='driver_app'),
    path('student/application/', views.student_app, name='student_app'),
    path('ride/application/', views.ride_app, name='ride_app'),
]
