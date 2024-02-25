from pydantic import BaseModel

class ClientCreate(BaseModel):
    name: str
    surname: str
    phone: str
    company: str | None

class Client(ClientCreate):
    id: int
    disabled: bool = False