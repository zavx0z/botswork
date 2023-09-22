from fastapi import APIRouter, Depends, Request, HTTPException
from fastapi_another_jwt_auth import AuthJWT
from fastapi_another_jwt_auth.exceptions import FreshTokenRequired, MissingTokenError, InvalidHeaderError, JWTDecodeError
from sqlalchemy import select

from db.user import User
from db.shared.db import get_db
from sso.schema.user import UserSchema

router = APIRouter()


@router.get("/verify")
async def get_user(request: Request, authjwt: AuthJWT = Depends(), db=Depends(get_db)):
    """Получение информации о текущем пользователе"""
    try:
        authjwt.jwt_required()
        pk = authjwt.get_jwt_subject()
        stmt = select(User).where(User.id == pk)
        result = await db.execute(stmt)
        user = result.scalars().first()
        if user:
            return UserSchema(
                id=user.id,
                username=user.username,
                role=user.role.name
            )
        else:
            raise HTTPException(status_code=401, detail="User not exist")
    except FreshTokenRequired:
        raise HTTPException(status_code=401, detail="Access token has expired. Please request a new one using the provided refresh token.")
    except MissingTokenError:
        raise HTTPException(status_code=401, detail="Missing token")
    except InvalidHeaderError:
        raise HTTPException(status_code=401, detail="Token is invalid")
    except JWTDecodeError as e:
        raise HTTPException(status_code=422, detail='Срок действия токена истек')  # 'Signature has expired'
