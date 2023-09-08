from fastapi import FastAPI
from fastapi_another_jwt_auth import AuthJWT
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware
from server_auth.config import JWT_SECRET_KEY, ACCESS_TOKEN_EXPIRE_MINUTES
from server_auth.routes import refresh, login, join, user
from prometheus_fastapi_instrumentator import Instrumentator

app = FastAPI()
Instrumentator().instrument(app).expose(app)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Settings(BaseModel):
    """Settings management"""
    authjwt_secret_key: str = JWT_SECRET_KEY
    authjwt_access_token_expire_minutes: int = ACCESS_TOKEN_EXPIRE_MINUTES


@AuthJWT.load_config
def get_config():
    """Callback to get your configuration"""
    return Settings()


app.include_router(login.router)
app.include_router(join.router)
app.include_router(user.router)
app.include_router(refresh.router)
