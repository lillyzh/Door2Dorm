import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from .models import Ride, Driver, Student

class Dispatcher(WebsocketConsumer):
    def connect(self):
        print("hererereeeeeree")
        self.room_name = self.scope['url_route']['kwargs']['channel_name']
        self.room_group_name = 'door2dorm_%s' % self.room_name
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        request_type = text_data_json['type']
        if request_type == 'driver':
            self.register_driver_to_database(text_data_json)
        elif request_type == 'student':
            self.register_student_to_database(text_data_json)
        else:
            self.register_ride_to_database(text_data_json)
        async_to_sync(self.channel_layer.group_send)(
            "door2dorm_dispatcher",
            {
                'type': 'door2dorm.message',
                'message': 'reload page'
            }
        )

    def door2dorm_message(self, event):
        message = event['message']
        self.send(text_data=json.dumps({
            'message': message
        }))

    def register_driver_to_database(self, data_json):
        #only register new driver
        try:
            Driver.objects.get(driver_id = data_json['driver_id'])
        except:
            driver = Driver()
            driver.first_name = data_json['first_name']
            driver.last_name = data_json['last_name']
            driver.driver_id = data_json['driver_id']
            driver.licence_plate = data_json['licence_plate']
            driver.save()

    def register_student_to_database(self, data_json):
        #only register new student
        try:
            Student.objects.get(sunet = data_json['sunet'])
        except:
            student = Student()
            student.first_name = data_json['first_name']
            student.last_name = data_json['last_name']
            student.sunet = data_json['sunet']
            student.email = data_json['email']
            student.phone = data_json['phone']
            student.save()

    def register_ride_to_database(self, data_json):
        try:
            ride = Ride()
            student = Student.objects.get(sunet = data_json['sunet'])
            driver = Driver.objects.get(driver_id = 12345)
            ride.student = student
            ride.driver = driver
            ride.current_loc = data_json['from']
            ride.dest_loc = data_json['to']
            ride.num_passengers = data_json['numpass']
            ride.safety_lvl = data_json['safetylvl']
            ride.assigned = 1
            ride.save()
        except:
            print("Student or driver doesn't exist in the database.")