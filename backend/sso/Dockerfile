# Базовый образ с Python для сборки и установки зависимостей
FROM python:3.11.5-alpine as builder

WORKDIR /tmp

RUN apk update && apk add --no-cache git

COPY ./dist ./

RUN pip install --no-cache-dir sso-*.whl

# Финальный образ
FROM python:3.11.5-alpine

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Копирование Python зависимостей от билдера
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=builder /usr/local/bin/uvicorn /usr/local/bin/uvicorn

# Переменные окружения
ENV SQLALCHEMY_DATABASE_URL=${SQLALCHEMY_DATABASE_URL}
ENV JWT_SECRET_KEY=${JWT_SECRET_KEY}

EXPOSE ${SSO_PORT}

CMD ["uvicorn", "sso.main:app", "--host", "${SSO_HOST}", "--port", "${SSO_PORT}"]