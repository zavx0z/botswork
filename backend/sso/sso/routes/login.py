from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi_another_jwt_auth import AuthJWT
from passlib.context import CryptContext
from pydantic import BaseModel
from sqlalchemy import select

from db.shared.db import get_db
from db.user import User
from sso.schema.user import UserWithTokenSchema

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")  # Определяем объект контекста для шифрования паролей


async def authenticate_user(username: str, password: str, db):
    """Аутентификации пользователя"""
    stmt = select(User).where(User.username == username)  # create select statement
    result = await db.execute(stmt)
    user = result.scalars().first()
    if not user:
        return None
    if not pwd_context.verify(password, user.hashed_password):  # check password
        return None

    return user


class UserCredentialsPayload(BaseModel):
    username: str
    password: str


@router.post("/login")
async def login(item: UserCredentialsPayload, request: Request, db=Depends(get_db), authjwt: AuthJWT = Depends()) -> UserWithTokenSchema:
    """Аутентификация и выдача токена"""
    user = await authenticate_user(item.username, item.password, db)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    access_token = authjwt.create_access_token(subject=str(user.id))
    refresh_token = authjwt.create_refresh_token(subject=str(user.id))
    return UserWithTokenSchema(
        id=user.id,
        username=user.username,
        accessToken=access_token,
        refreshToken=refresh_token,
        role=user.role.name
    )
