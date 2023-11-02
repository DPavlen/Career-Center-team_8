FROM python:3.11-slim

WORKDIR /app

RUN pip install gunicorn==20.1.0

COPY requirements.txt .

RUN pip install -r requirements.txt --no-cache-dir

COPY fonts ./
COPY ./*.ttf /usr/local/lib/python3.11/site-packages/reportlab/fonts/
RUN rm ./*.ttf

COPY . .

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "hr_portal.wsgi"]