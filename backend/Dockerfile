FROM python:3.12

WORKDIR /app

RUN apt-get update && apt-get install -y netcat-openbsd

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD ["sh", "-c", "sleep 5 && while ! nc -z db 5432; do echo 'Aguardando banco...'; sleep 2; done; uvicorn app.main:app --host 0.0.0.0 --port 8000"]