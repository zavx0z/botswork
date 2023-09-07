import os
from pathlib import Path

JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
if not JWT_SECRET_KEY:
    from dotenv import load_dotenv

    load_dotenv(Path(__file__).parents[4] / '.env')

JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 4
