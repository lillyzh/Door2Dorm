from django.shortcuts import render
from django.template import loader
from .models import Ride

def index(request):
    latest_rides_list = Ride.objects.order_by('-time_requested')
    template = loader.get_template('ride_queue/index.html')
    context = {
        'latest_rides_list': latest_rides_list,
    }
    return render(request, 'ride_queue/index.html', context)

def riderView(request):
    return render(request, 'ride_queue/rider.html')
