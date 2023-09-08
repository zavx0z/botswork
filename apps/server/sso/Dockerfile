# Базовый образ с Python для сборки и установки зависимостей
FROM python:3.11.5-alpine as builder

WORKDIR /tmp

RUN apk update && apk add --no-cache git

COPY ./dist ./

RUN pip install --no-cache-dir server_sso-*.whl

# Финальный образ
FROM python:3.11.5-alpine

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Копирование Python зависимостей от билдера
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=builder /usr/local/bin/uvicorn /usr/local/bin/uvicorn

# Переменные окружения
ENV POSTGRES_DB=${POSTGRES_DB}
ENV POSTGRES_HOST=${POSTGRES_HOST}
ENV POSTGRES_PORT=${POSTGRES_PORT}
ENV POSTGRES_USER=${POSTGRES_USER}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
ENV JWT_SECRET_KEY=${JWT_SECRET_KEY}

EXPOSE ${SSO_PORT}

CMD ["uvicorn", "server_sso.main:app", "--host", "${SSO_HOST}", "--port", "${SSO_PORT}"]