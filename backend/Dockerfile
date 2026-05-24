FROM python:3.12-slim

WORKDIR /app

EXPOSE 8000

RUN apt-get update \
    && apt-get install -y --no-install-recommends netcat-openbsd \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && useradd -m -u 1000 appuser

COPY requirements.lock .

RUN python -m pip install --upgrade pip \
    && pip install --no-cache-dir -r requirements.lock

COPY . .

RUN chown -R appuser:appuser /app

USER appuser

CMD ["sh", "-c", "while ! nc -z db 5432; do echo 'Aguardando banco...'; sleep 2; done; uvicorn app.main:app --host 0.0.0.0 --port 8000"]