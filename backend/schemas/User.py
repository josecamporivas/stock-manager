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
    disabled: bool = None

