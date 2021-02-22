from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

from .models import Ride, Student
from .serializers import StudentSerializer
# CommentTag: MAKE_POST
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action

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
        student = Student.create(
            int(request.GET["student_id"]),
            request.GET["sunet"],
            request.GET["first"],
            request.GET["last"],
            request.GET["email"],
            int(request.GET["phone"]),
        )
        student.save()
        template = loader.get_template('cr_student.html')
        context = {
            'students': Student.objects.all(),
        }
        serializer = StudentSerializer(student)
        return Response(serializer.data, status=201)
        # return HttpResponse(template.render(context, request))

def ride_queue_view(request):
    latest_rides_list = Ride.objects.order_by('time_requested')
    template = loader.get_template('ride_queue.html')
    context = {
        'latest_rides_list': latest_rides_list,
    }
    return render(request, 'ride_queue.html', context)

def create_student(request):
    # student = Student.create(1213123, "testing", "mandy", "li", "jk@gmail.com", 1233123213)
    # student.save()
    template = loader.get_template('cr_student.html')
    context = {
        'students': Student.objects.all(),
    }
    return render(request, 'cr_student.html', context)
