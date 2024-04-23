from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    token_type: str
    role_user: str


class TokenData(BaseModel):
    user_id: int | None = None