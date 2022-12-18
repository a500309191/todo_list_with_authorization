FROM  python

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1


WORKDIR /api

COPY reqs.txt /api/reqs.txt
RUN pip3 install -r reqs.txt

ADD . .

