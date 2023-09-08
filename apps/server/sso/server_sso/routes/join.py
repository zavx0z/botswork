from fastapi import APIRouter, Depends
from fastapi import HTTPException
from fastapi_another_jwt_auth import AuthJWT
from passlib.context import CryptContext
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from py_db.shared.db import get_db
from py_db.user import Role, User
from server_sso.schema.user import UserWithTokenSchema, JoinUserRequest
from server_sso.token_utils import create_access_token

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


async def get_user(db: AsyncSession, username: str):
    stmt = select(User).where(User.username == username)  # Проверяем, есть ли пользователь с таким же именем
    result = await db.execute(stmt)
    user = result.fetchone()
    return user


async def create_user(db: AsyncSession, username: str, password: str, role=Role.client):
    hashed_password = pwd_context.hash(password)  # Создаем нового пользователя
    user = User(username=username, hashed_password=hashed_password, role=role)
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user


@router.post("/api.v1/join")
async def register(item: JoinUserRequest, db=Depends(get_db), authjwt: AuthJWT = Depends()) -> UserWithTokenSchema:
    """Регистрация нового пользователя"""
    user = await get_user(db, item.username)
    if user:
        raise HTTPException(status_code=401, detail="already registered")
    user = await create_user(db, item.username, item.password)
    access_token = create_access_token(str(user.id), authjwt)  # Генерируем токен авторизации
    refresh_token = authjwt.create_refresh_token(subject=str(user.id))  # Генерируем токен обновления
    return UserWithTokenSchema(
        id=user.id,
        username=user.username,
        accessToken=access_token,
        refreshToken=refresh_token,
        role=user.role.name
    )
