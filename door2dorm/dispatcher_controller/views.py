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
        return Response(serializer.data, status=201)

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
        current_loc = get_value("current_loc", 'str', request)
        dest = get_value("destination", 'str', request)
        num_riders = get_value("num_riders", 'int', request)
        safety_level = get_value("safety_level", 'int', request)
        ride = Ride.create(current_loc, dest, num_riders, safety_level)
        ride.save()
        serializer = RideSerializer(ride)
        return Response(serializer.data, status=201)

def dispatcher(request):
    template = loader.get_template('dispatcher.html')
    context = {
        'students': Student.objects.all(),
        'rides': Ride.objects.order_by('priority'),
        'drivers': Driver.objects.filter(license_plate__isnull=False),
    }
    return render(request, 'dispatcher.html', context)
