#!/bin/bash
source ../msl/bin/activate
./manage.py runserver &
cd static/js/react
./run_webpack_production.sh &
