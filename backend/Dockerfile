FROM python:3.12-slim

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends netcat-openbsd \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN python -m pip install --upgrade pip \
    && pip install --no-cache-dir --requirement requirements.txt

COPY . .

CMD ["sh", "-c", "sleep 5 && while ! nc -z db 5432; do echo 'Aguardando banco...'; sleep 2; done; uvicorn app.main:app --host 0.0.0.0 --port 8000"]