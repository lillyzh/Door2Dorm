import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from .models import Ride, Driver, Student

class Dispatcher(WebsocketConsumer):
    def connect(self):
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
        if text_data_json['type'] == 'driver':
            self.register_driver_to_database(text_data_json)
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
        #Todo: only register when driver doesn't exist
        driver = Driver()
        driver.first_name = data_json['first_name']
        driver.last_name = data_json['last_name']
        driver.driver_id = data_json['driver_id']
        driver.licence_plate = data_json['licence_plate']
        driver.save()
