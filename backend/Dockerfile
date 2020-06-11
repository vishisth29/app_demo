FROM splittr_ubuntu
MAINTAINER Vishisth <vishisth@claimfound.com>

RUN apt-get update; apt-get upgrade -yq;

WORKDIR /backend
ENV PYTHONPATH=/backend
ENV FLASK_APP run.py
ENV LC_ALL C.UTF-8
ENV LANG C.UTF-8

COPY . .

RUN pip install -r requirements.txt
RUN rm -r requirements.txt

CMD ["sh", "./start.sh"]
EXPOSE 5000