from fastapi import APIRouter, Depends, HTTPException
from fastapi_another_jwt_auth import AuthJWT
from fastapi_another_jwt_auth.exceptions import MissingTokenError
from pydantic import BaseModel

router = APIRouter()


class RefreshResponse(BaseModel):
    accessToken: str
    refreshToken: str


@router.get("/refresh")
async def refresh(authjwt: AuthJWT = Depends()) -> RefreshResponse:
    """Обновление токена авторизации"""
    try:
        authjwt.jwt_refresh_token_required()
        user_id = authjwt.get_jwt_subject()
        access_token = authjwt.create_access_token(subject=user_id)
        refresh_token = authjwt.create_refresh_token(subject=user_id)
        return RefreshResponse(accessToken=access_token, refreshToken=refresh_token)
    except MissingTokenError as e:
        raise HTTPException(status_code=401, detail="Отсутствует токен обновления")
