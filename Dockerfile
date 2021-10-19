FROM python:3
RUN mkdir /app
COPY requirements.txt /app
COPY static/ /app/static
COPY templates /app/templates
COPY app.py /app/app.py


WORKDIR /app
RUN pip install --no-cache-dir -r requirements.txt
ENTRYPOINT ["python", "/app/app.py"]