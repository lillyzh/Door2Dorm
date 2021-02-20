from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

from .models import Ride, Student, Driver

def ride_queue_view(request):
    latest_rides_list = Ride.objects.order_by('time_requested')
    latest_drivers_list = Driver.objects.all()
    latest_students_list = Student.objects.all()
    template = loader.get_template('ride_queue.html')
    context = {
        'latest_rides_list': latest_rides_list,
        'latest_drivers_list': latest_drivers_list,
        'latest_students_list': latest_students_list,
    }
    return render(request, 'ride_queue.html', context)

def create_student(request):
    student = Student.create(1213123, "testing", "mandy", "li", "jk@gmail.com", 1233123213)
    template = loader.get_template('cr_student.html')
    context = {
        'student': student,
    }
    student.save()
    return render(request, 'cr_student.html', context)

def driver_login(request):
    template = loader.get_template('driver_form.html')
    return render(request, "driver_form.html")
