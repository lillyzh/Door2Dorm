from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

from .models import Ride, Student, Driver
from .serializers import StudentSerializer, RideSerializer, DriverSerializer
# CommentTag: MAKE_POST
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
import random
from django.utils.dateparse import parse_datetime
from django.db import models
from datetime import datetime

def get_value(name, val_type, request):
    if not request:
        return None
    val = request.GET[name]
    if not val: 
        return None
    
    if val_type == 'str':
        return str(val)
    if val_type == 'int':
        return int(val)
    if val_type == 'float':
        return float(val)
    

class StudentViewSet(viewsets.ModelViewSet):
    # CommentTag: MAKE_POST
    permission_classes = (permissions.AllowAny,)
    serializer_class = StudentSerializer
    queryset = Student.objects.all()

    # TODO: 
    # CommentTag: MAKE_POST (Search for this and you can find residual code where I attempted at this)
    # Make this a 'post'. Is that necessary? 
    # If we simply get axios.get() from requestPage.js on the webapp side,
    # we get a status code 405. Will probably need to play around with
    # rest_framework.permissions
    @action(methods=['get'], detail=True,
            url_path='cr-student', url_name='create_student')
    def cr_student_func(self, request, pk=None):

        student_id = get_value("student_id", 'int', request)
        sunet = get_value("sunet", 'str', request)
        first = get_value("first", 'str', request)
        last = get_value("last", 'str', request)
        email = get_value("email", 'str', request)
        phone = get_value("phone", 'int', request)

        student = Student.create(
            student_id,
            sunet,
            first,
            last,
            email,
            phone
        )
        template = loader.get_template('cr_student.html')
        context = {
            'student': student,
        }
        student.save()
        serializer = StudentSerializer(student)

        properties = {
            'student_id': student_id,
            'current_lat': student_id,
            'current_long': student_id,
            'dest_lat': student_id,
            'dest_long': student_id,
            'num_passengers': student_id,
            'safety_lvl': student_id,
            'priority': student_id,
            'time_requested': student_id,
            'picked_up': student_id,
            'dropped_off': student_id,
            'assigned': student_id,
        }
        ride = Ride.create(properties)
        ride_ser = RideSerializer(ride)
        
        both_data = dict(serializer.data).copy()
        both_data.update(dict(ride_ser.data))
        return Response(both_data, status=201)

class RideViewSet(viewsets.ModelViewSet):
    # CommentTag: MAKE_POST
    permission_classes = (permissions.AllowAny,)
    serializer_class = RideSerializer
    queryset = Ride.objects.all()

    # TODO: 
    # CommentTag: MAKE_POST (Search for this and you can find residual code where I attempted at this)
    # Make this a 'post'. Is that necessary? 
    # If we simply get axios.get() from requestPage.js on the webapp side,
    # we get a status code 405. Will probably need to play around with
    # rest_framework.permissions

    # Currently, we can hack this function this create both the student and the ride at the same time
    @action(methods=['get'], detail=True,
            url_path='cr-ride', url_name='create_ride')
    def cr_ride_func(self, request, pk=None):
        student_id = request.GET["student_id"]

        ride = Ride.create(
            # student object
            float(request.GET["current_lat"]),
            float(request.GET["current_long"]),
            float(request.GET["dest_lat"]),
            float(request.GET["dest_long"]),
            int(request.GET["num_passengers"]),
            int(request.GET["safety_lvl"]),
            float(request.GET["priority"]),
            float(request.GET['time_requested']),
        )
        template = loader.get_template('cr_student.html')
        context = {
            'student': student,
        }
        student.save()
        serializer = StudentSerializer(student)
        return Response(serializer.data, status=201)
    
def ride_queue_view(request):
    latest_rides_list = Ride.objects.order_by('time_requested')
    template = loader.get_template('ride_queue.html')
    context = {
        'latest_rides_list': latest_rides_list,
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
