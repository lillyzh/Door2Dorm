from django.urls import re_path

from . import dispatcher

websocket_urlpatterns = [
    re_path(r'ws/ride_queue/(?P<channel_name>\w+)/$', dispatcher.Dispatcher.as_asgi()),
]
