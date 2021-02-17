# Generated by Django 3.1.5 on 2021-02-17 09:09

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Driver',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('student_id', models.PositiveIntegerField(default=1233242)),
                ('is_signed_on', models.BooleanField(default=False)),
                ('passenger_list', models.TextField(default='[]')),
                ('current_lat', models.FloatField(default=38.2393)),
                ('current_long', models.FloatField(default=-85.7598)),
                ('route', models.TextField(default='[]')),
            ],
        ),
        migrations.CreateModel(
            name='Ride',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('student_id', models.PositiveIntegerField(default=1233242)),
                ('current_lat', models.FloatField(default=38.2393)),
                ('current_long', models.FloatField(default=-85.7598)),
                ('dest_lat', models.FloatField(default=37.4254)),
                ('dest_long', models.FloatField(default=-122.1629)),
                ('num_passengers', models.IntegerField(default=1)),
                ('safety_lvl', models.PositiveIntegerField(default=5)),
                ('priority', models.FloatField(default=50)),
                ('time_requested', models.DateTimeField(default=datetime.datetime.now, verbose_name='time requested')),
                ('picked_up', models.DateTimeField(default=datetime.datetime(1, 1, 1, 0, 0), null=True)),
                ('dropped_off', models.DateTimeField(default=datetime.datetime(1, 1, 1, 0, 0), null=True)),
                ('assigned', models.IntegerField(default=-1)),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('student_id', models.PositiveIntegerField()),
                ('sunet', models.CharField(max_length=30)),
                ('first_name', models.CharField(max_length=30)),
                ('last_name', models.CharField(max_length=30)),
                ('email', models.EmailField(max_length=30)),
                ('phone', models.PositiveIntegerField()),
            ],
        ),
    ]