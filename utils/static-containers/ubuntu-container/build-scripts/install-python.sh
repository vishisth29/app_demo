#!/usr/bin/env bash

apt-get update; apt-get upgrade -yq;
apt-get install build-essential -yq;
apt-get install software-properties-common -yq;

apt-get install wget curl apt-transport-https -yq;

add-apt-repository ppa:deadsnakes/ppa -y;

apt-get update; apt-get install python3.6=3.6.10-1+xenial1 python3.6-dev=3.6.10-1+xenial1 -yq;

curl https://bootstrap.pypa.io/get-pip.py | python3.6;

pip install pip==19.3.1;

echo "installed python3.6 and pip";