from fastapi import FastAPI
from fastapi_another_jwt_auth import AuthJWT
from passlib.context import CryptContext
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware

import os
from sso.database import Database
from sso.routes import refresh, login, join, verify
from prometheus_fastapi_instrumentator import Instrumentator

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
Database(
    app,
    host=os.getenv('POSTGRES_HOST'),
    port=os.getenv('POSTGRES_PORT'),
    db_name=os.getenv('POSTGRES_DB'),
    username=os.getenv('POSTGRES_USER'),
    password=os.getenv('POSTGRES_PASSWORD')
)

app.state.pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class Settings(BaseModel):
    """Settings management"""
    authjwt_secret_key: str = os.getenv('JWT_SECRET_KEY')
    authjwt_access_token_expires: int = int(os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES', 0)) * 60
    # authjwt_token_location: Sequence[str] = ['headers', 'cookies']


@AuthJWT.load_config
def get_config():
    """Callback to get your configuration"""
    return Settings()


app.include_router(login.router)
app.include_router(join.router)
app.include_router(verify.router)
app.include_router(refresh.router)
Instrumentator().instrument(app).expose(app)
