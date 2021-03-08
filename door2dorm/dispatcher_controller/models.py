from django.db import models
from datetime import datetime

# Create your models here.
class Student(models.Model):
    # TODO: student_id and sunet are duplicate info
    student_id = models.PositiveIntegerField(default = 12345)
    sunet = models.CharField(max_length=30)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(max_length=30)
    phone = models.PositiveIntegerField(default = 6503339999)

    def __str__(self):
        return "Student with Student ID {} made.".format(self.student_id) 

    @classmethod
    def create(cls, sid, sunet, first, last, email, phone):
        return cls(student_id = sid, sunet = sunet, first_name = first, last_name = last, email = email, phone = phone)


class Ride(models.Model):
    #student = models.ForeignKey(Student, on_delete = models.DO_NOTHING)
    current_location = models.CharField(max_length=30)
    destination = models.CharField(max_length=30)
    current_lat = models.FloatField(default = 38.2393)
    current_long = models.FloatField(default = -85.7598)
    # TODO: Add destination string?
    # TODO: Add current location string?
    # TOTHINK: Is this necessary (does Google maps or Stanford Map/Location provide an API )
    dest_lat = models.FloatField(default = 37.4254)
    dest_long = models.FloatField(default = -122.1629) 
    num_passengers = models.IntegerField(default = 1) # TODO: Add validator to restrict range [1, 4]
    safety_lvl = models.PositiveIntegerField(default = 5) # TODO: Add validator to restrict range [0, 10]
    priority = models.FloatField(default = 50) # TODO: Add validator to restrict range [0, 100]
    time_requested = models.DateTimeField('time requested', default = datetime.now)
    picked_up = models.DateTimeField(null = True, default = datetime.min)
    dropped_off = models.DateTimeField(null = True, default = datetime.min)

    # Should this be another models.ForeignKey()
    assigned = models.IntegerField(default = -1)

    def __str__(self):
        return "Ride made."

    @classmethod
    def create(cls, current_location, destination, num_passengers, safety_lvl):
        return cls(current_location=current_location, destination=destination, num_passengers=num_passengers,
                safety_lvl=safety_lvl)
class Driver(models.Model):
    # TOTHINK: Should we add a driver id field (for this db) ?
    first_name = models.CharField(max_length=30, default="first")
    last_name = models.CharField(max_length=30, default="last")
    student = models.ForeignKey(Student, on_delete = models.DO_NOTHING, null = True, blank = True)
    license_plate = models.CharField(max_length=30, null = True, blank = True)
    email = models.EmailField(max_length=30, default="fake@fake.com")
    phone = models.PositiveIntegerField(default = 6503339999)
    # TODO: Add Driver License Field
    # TODO: Modify the is_signed_on to be the Car Plate Field (text field rather than bool)
    passenger_list = models.TextField(default = '[]')
    current_lat = models.FloatField(default = 38.2393)
    current_long = models.FloatField(default = -85.7598)
    route = models.TextField(default = '[]')

    def __str__(self):
        return self.first_name + " " + self.last_name
