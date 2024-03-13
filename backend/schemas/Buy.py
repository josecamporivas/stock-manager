from pydantic import BaseModel

class BuyCreate(BaseModel):
    user_id: int
    supplier_id: int

class Buy(BuyCreate):
    buy_id: int
    date: str
    disabled: bool