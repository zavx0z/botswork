from pydantic import UUID4
from pydantic.main import BaseModel


class UserSchema(BaseModel):
    id: UUID4
    username: str
    role: str


class UserWithTokenSchema(UserSchema):
    accessToken: str
    refreshToken: str


class JoinUserRequest(BaseModel):
    username: str
    password: str
