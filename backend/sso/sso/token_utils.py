import jwt
from jwt import InvalidTokenError
from sso.config import JWT_SECRET_KEY


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
