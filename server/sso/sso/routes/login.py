from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi_another_jwt_auth import AuthJWT
from sso.models import UserWithTokenSchema, UserCredentials, User

router = APIRouter()


@router.post("/login")
async def login(item: UserCredentials, request: Request, authjwt: AuthJWT = Depends()) -> UserWithTokenSchema:
    """Аутентификация и выдача токена"""
    state = request.app.state
    async with state.pool.acquire() as session:
        result = await session.fetchrow("SELECT id, username, hashed_password, role FROM public.profile WHERE username=$1", item.username)
    if not result:
        raise HTTPException(status_code=401, detail="Пользователь не существует")
    user = User(**result)
    if not state.pwd_context.verify(item.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Не верный пароль")

    access_token = authjwt.create_access_token(subject=str(user.id))
    refresh_token = authjwt.create_refresh_token(subject=str(user.id))
    return UserWithTokenSchema(
        id=user.id,
        username=user.username,
        accessToken=access_token,
        refreshToken=refresh_token,
        role=user.role
    )
