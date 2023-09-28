from fastapi import APIRouter, Depends, Request
from fastapi import HTTPException
from fastapi_another_jwt_auth import AuthJWT
from sso.models import UserWithTokenSchema, UserCredentials, UserSchema

router = APIRouter()


@router.post("/join")
async def register(item: UserCredentials, request: Request, authjwt: AuthJWT = Depends()) -> UserWithTokenSchema:
    """Регистрация нового пользователя"""
    state = request.app.state
    async with state.pool.acquire() as session:
        exist_user = await session.fetchrow("SELECT id FROM public.profile WHERE username=$1", item.username)
        if exist_user:
            raise HTTPException(status_code=401, detail="Пользователь существует")
        result = await session.fetchrow(
            "INSERT INTO public.profile (username, hashed_password) VALUES ($1, $2) RETURNING id, username, role",
            item.username,
            state.pwd_context.hash(item.password)
        )
    user = UserSchema(**result)
    access_token = authjwt.create_access_token(subject=str(user.id))
    refresh_token = authjwt.create_refresh_token(subject=str(user.id))  # Генерируем токен обновления
    return UserWithTokenSchema(
        id=user.id,
        username=user.username,
        accessToken=access_token,
        refreshToken=refresh_token,
        role=user.role
    )
