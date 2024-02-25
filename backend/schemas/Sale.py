from pydantic import BaseModel

class SaleCreate(BaseModel):
    amount: int
    price: float
    product_id: int
    user_dni: str
    client_id: int

class Sale(SaleCreate):
    id: int
    date: str
    disabled: bool = None

