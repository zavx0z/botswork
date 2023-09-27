from fastapi import APIRouter, Depends, Request, HTTPException
from fastapi_another_jwt_auth import AuthJWT
from fastapi_another_jwt_auth.exceptions import FreshTokenRequired, MissingTokenError, InvalidHeaderError, JWTDecodeError
from sso.models import UserSchema

router = APIRouter()


@router.get("/verify")
async def get_user(request: Request, authjwt: AuthJWT = Depends()):
    """Получение информации о текущем пользователе"""
    db = request.app.state.pool
    try:
        authjwt.jwt_required()
        pk = authjwt.get_jwt_subject()
        async with db.acquire() as session:
            result = await session.fetchrow("SELECT id, username, role FROM public.user WHERE id=$1", pk)
        if not result:
            raise HTTPException(status_code=401, detail="Пользователь не найден.")
        return UserSchema(**result)
    except FreshTokenRequired:
        raise HTTPException(status_code=401, detail="Access token has expired. Please request a new one using the provided refresh token.")
    except MissingTokenError:
        raise HTTPException(status_code=401, detail="Missing token")
    except InvalidHeaderError:
        raise HTTPException(status_code=401, detail="Token is invalid")
    except JWTDecodeError as e:
        raise HTTPException(status_code=422, detail='Срок действия токена истек')  # 'Signature has expired'
