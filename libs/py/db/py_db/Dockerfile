# Use an official Python runtime as a parent image
FROM python:3.11-slim-bullseye

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update \
    && apt-get install -y build-essential \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Poetry - respects $POETRY_VERSION & $POETRY_HOME
RUN curl -sSL https://install.python-poetry.org | python

# Copy only requirements to cache them in docker layer
COPY ./pyproject.toml ./poetry.lock /app/

# Project initialization:
RUN poetry config virtualenvs.create false \
  && poetry install $(if [ "$YOUR_ENV" = "production" ]; then echo "--no-dev"; fi) \
  && poetry run python -m compileall -q .

# Copy all files
COPY . /app

# Collect static files
RUN python manage.py collectstatic --noinput

# Specify the command to run on container start
CMD gunicorn myproject.wsgi:application --bind 0.0.0.0:8000