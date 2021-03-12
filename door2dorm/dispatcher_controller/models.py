from django.db import models
from datetime import datetime


class Student(models.Model):
    sunet = models.CharField(max_length=30)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(max_length=30)
    phone = models.PositiveIntegerField(default = 6503339999)
    password = models.CharField(max_length=30)

    def __str__(self):
        return "Student with Student ID {} made.".format(self.sunet) 

    @classmethod
    def create(cls, sunet, first, last, phone, password):
        return cls(sunet = sunet, first_name = first, last_name = last, email = sunet + "@stanford.edu", phone = phone, password = password)


class Ride(models.Model):
    student = models.ForeignKey(Student, on_delete = models.DO_NOTHING)
    current_address= models.CharField(max_length=150)
    destination_address = models.CharField(max_length=150)
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

    def __str__(self):
        return "Ride made."

    @classmethod
    def create(cls, student, start_address, end_address, num_passengers, safety_lvl, cur_lat, cur_long):
        return cls(
            student = student,
            current_address = start_address,
            destination_address = end_address,
            num_passengers = num_passengers,
            safety_lvl = safety_lvl,
            current_lat = cur_lat,
            current_long = cur_long)
        
class Driver(models.Model):
    #this is the id
    driver_license = models.CharField(max_length=30, default="FAKE980")
    first_name = models.CharField(max_length=30, default="first")
    last_name = models.CharField(max_length=30, default="last")
    email = models.EmailField(max_length=30, default="fake@fake.com")
    phone = models.PositiveIntegerField(default = 6503339999)
    password = models.CharField(max_length=30)
    
    #if blank, driver is not active.
    license_plate = models.CharField(max_length=30, null = True, blank = True)
    
    #contain list of location objects
    route = models.TextField(default = '[]', null=True, blank=True)
    
    #current location of the car
    current_lat = models.FloatField(default = 38.2393, null=True, blank=True)
    current_long = models.FloatField(default = -85.7598, null=True, blank=True)
    
    def __str__(self):
        return self.first_name + " " + self.last_name
    
    @classmethod
    def create(cls, dl, first, last, email, phone, password):
        return cls(driver_license = dl, first_name = first, last_name = last, email = email, phone = phone, password = password)
    
class location(models.Model):
    #True, driver goes to picked_up location. False, driver goes to dropped_off location.
    is_picked_up = models.IntegerField(default = -1)
    student = models.ForeignKey(Student, on_delete = models.DO_NOTHING)
