from django.db import models
from datetime import datetime

# Create your models here.
class Student(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    sunet = models.CharField(max_length=30)
    email = models.EmailField(max_length=30)
    phone = models.PositiveIntegerField()

    def __str__(self):
        return "{} {} {}".format(self.first_name, self.last_name, self.student_id)

    @classmethod
    def create(cls, sid, sunet, first, last, email, phone):
        return cls(student_id = sid, sunet = sunet, first_name = first, last_name = last, email = email, phone = phone)

class Driver(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    driver_id = models.PositiveIntegerField()
    licence_plate = models.CharField(max_length=30)
    student = models.ForeignKey(Student, on_delete = models.DO_NOTHING, null = True, blank = True)
    passenger_list = models.TextField(default = '[]')
    current_lat = models.FloatField(default = 38.2393)
    current_long = models.FloatField(default = -85.7598)
    route = models.TextField(default = '[]')

    def __str__(self):
        return "{} {}".format(self.first_name, self.last_name)

class Ride(models.Model):
    student = models.ForeignKey(Student, on_delete = models.DO_NOTHING)
    current_lat = models.FloatField(default = 38.2393)
    current_long = models.FloatField(default = -85.7598)
    dest_lat = models.FloatField(default = 37.4254)
    dest_long = models.FloatField(default = -122.1629)
    num_passengers = models.IntegerField(default = 1) # TODO: Add validator to restrict range [1, 4]
    safety_lvl = models.PositiveIntegerField(default = 5) # TODO: Add validator to restrict range [0, 10]
    priority = models.FloatField(default = 50) # TODO: Add validator to restrict range [0, 100]
    time_requested = models.DateTimeField('time requested', default = datetime.now)
    picked_up = models.DateTimeField(null = True, default = datetime.min)
    dropped_off = models.DateTimeField(null = True, default = datetime.min)
    assigned = models.IntegerField(default = -1)
    driver = models.ForeignKey(Driver, on_delete = models.DO_NOTHING, null = True, blank = True)

    def __str__(self):
        return "Ride made."
