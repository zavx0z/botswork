import os

SQLALCHEMY_DATABASE_URL = os.getenv('SQLALCHEMY_DATABASE_URL')

if not SQLALCHEMY_DATABASE_URL:
    from dotenv import load_dotenv
    from pathlib import Path

    load_dotenv(Path(__file__).parents[3] / '.env')
    POSTGRES_DB = os.getenv('POSTGRES_DB')
    POSTGRES_PORT = os.getenv('POSTGRES_PORT')
    POSTGRES_USER = os.getenv('POSTGRES_USER')
    POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD')
    SQLALCHEMY_DATABASE_URL = f"postgresql+asyncpg://{POSTGRES_USER}:{POSTGRES_PASSWORD}@localhost:{POSTGRES_PORT}/{POSTGRES_DB}"
