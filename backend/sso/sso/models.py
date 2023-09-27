from pydantic import UUID4, BaseModel


class UserSchema(BaseModel):
    id: UUID4
    username: str
    role: str


class UserWithTokenSchema(UserSchema):
    accessToken: str
    refreshToken: str


class UserCredentials(BaseModel):
    username: str
    password: str


class User(BaseModel):
    id: UUID4
    username: str
    hashed_password: str
    role: str
