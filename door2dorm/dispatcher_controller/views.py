from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

from .models import Ride, Student, Driver

def database_view(request):
    latest_rides_list = Ride.objects.order_by('time_requested')
    latest_drivers_list = Driver.objects.all()
    latest_students_list = Student.objects.all()
    template = loader.get_template('database_view.html')
    context = {
        'latest_rides_list': latest_rides_list,
        'latest_drivers_list': latest_drivers_list,
        'latest_students_list': latest_students_list,
    }
    return render(request, 'database_view.html', context)

def driver_app(request):
    template = loader.get_template('driver_form.html')
    return render(request, "driver_form.html")

def student_app(request):
    template = loader.get_template('student_form.html')
    return render(request, "student_form.html")

def ride_app(request):
    template = loader.get_template('ride_form.html')
    return render(request, "ride_form.html")
