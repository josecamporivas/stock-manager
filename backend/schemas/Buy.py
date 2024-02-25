from pydantic import BaseModel

class BuyCreate(BaseModel):
    amount: int
    price: float
    product_id: int
    user_dni: str
    supplier_id: int

class Buy(BuyCreate):
    id: int
    date: str
    disabled: bool = None
