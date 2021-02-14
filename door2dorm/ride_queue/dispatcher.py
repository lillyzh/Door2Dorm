#Dispatcher Server

import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from .models import Ride

class Dispatcher(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['channel_name']
        self.room_group_name = 'ride_queue_%s' % self.room_name
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
        new_ride = Ride()
        new_ride.sunet = text_data_json['sunet']
        new_ride.time_requested = text_data_json['time_requested']
        new_ride.num_passengers = text_data_json['num_passengers']
        new_ride.save()
        async_to_sync(self.channel_layer.group_send)(
            "ride_queue_dispatcher",
            {
                'type': 'chat.message',
                'message': 'reload page'
            }
        )

    def chat_message(self, event):
        message = event['message']
        self.send(text_data=json.dumps({
            'message': message
        }))
