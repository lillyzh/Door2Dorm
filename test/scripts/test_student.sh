#!/bin/sh
curl -X POST -H "Content-Type: application/json" -d @$1 http://127.0.0.1:8000/students/placeholder/cr-student/
