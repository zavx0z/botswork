from datetime import timedelta

import jwt
from fastapi_another_jwt_auth import AuthJWT
from jwt import InvalidTokenError
from sqlalchemy.dialects.postgresql import UUID

from server_auth.config import ACCESS_TOKEN_EXPIRE_MINUTES, JWT_SECRET_KEY


def create_access_token(pk: UUID, authjwt: AuthJWT):
    """Генерация токена авторизации"""
    expires_delta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = authjwt.create_access_token(subject=str(pk), expires_time=expires_delta)
    # return {"access_token": access_token, "expires_in": ACCESS_TOKEN_EXPIRE_MINUTES * 60}
    return access_token


def is_token_valid(token: str) -> bool:
    try:
        jwt.decode(token, JWT_SECRET_KEY, algorithms=["HS256"])
        # Токен валидный, если он успешно декодирован
        return True
    except InvalidTokenError:
        # Токен невалидный, если декодирование вызывает исключение InvalidTokenError
        return False


def get_jwt_subject(token: str):
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=["HS256"])
        return payload.get('sub')
    except InvalidTokenError:
        return None
