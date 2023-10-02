#!/bin/bash

# Stop the execution of the script on the first error
set -e

# Определение корневой директории проекта в зависимости от места запуска скрипта
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." >/dev/null 2>&1 && pwd)"

echo "Project root directory: ${PROJECT_ROOT}"

# Активация виртуального окружения
echo "Activating virtual environment..."
cd "${PROJECT_ROOT}" && source .venv/bin/activate

# Сборка Poetry в sso
echo "Building Poetry in sso..."
cd "${PROJECT_ROOT}"/server/sso && poetry install


cd "${PROJECT_ROOT}"
# Пере-сборка docker-compose контейнера sso
echo "Rebuilding docker-compose container sso..."
docker-compose up -d --force-recreate --no-deps --build sso
# Пере-сборка docker-compose контейнера sso
echo "Rebuilding docker-compose container nginx..."
docker-compose up -d --force-recreate --no-deps nginx

echo "Script execution completed."