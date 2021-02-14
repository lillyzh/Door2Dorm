"""
ASGI config for door2dorm project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/howto/deployment/asgi/
"""

import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
import ride_queue.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'door2dorm.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
      "websocket": AuthMiddlewareStack(
        URLRouter(
            ride_queue.routing.websocket_urlpatterns
        )
    ),
})
