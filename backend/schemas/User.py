from pydantic import BaseModel

class UserCreate(BaseModel):
    dni: str
    username: str
    password: str
    name: str
    surname: str
    email: str
    role: str

class User(UserCreate):
    user_id: int
    disabled: bool

