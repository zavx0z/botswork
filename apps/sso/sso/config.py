import os
from pathlib import Path

JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES', 0))

if not JWT_SECRET_KEY and not ACCESS_TOKEN_EXPIRE_MINUTES:
    from dotenv import load_dotenv

    load_dotenv(Path(__file__).parents[3] / '.env')

    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES'))
