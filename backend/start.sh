#!/usr/bin/env bash
echo "Performing database migrations"
flask db upgrade
flask run -h 0.0.0.0 --debugger
# python3.6 run.py