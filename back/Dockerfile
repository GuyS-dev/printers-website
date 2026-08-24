# Stage 1: Build
FROM python:3.11-alpine AS builder
WORKDIR /app

RUN apk add --no-cache --virtual .build-deps gcc musl-dev libffi-dev openssl-dev
COPY requirements.txt .
RUN pip install --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt \
    && apk del .build-deps

# Stage 2: Final runtime
FROM python:3.11-alpine
WORKDIR /app

COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

COPY app.py functions.py ./

EXPOSE 5000
CMD ["python3", "app.py"]
