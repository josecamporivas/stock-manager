from pydantic import BaseModel

class ClientCreate(BaseModel):
    name: str
    phone: str

class Client(ClientCreate):
    client_id: int
    disabled: bool
