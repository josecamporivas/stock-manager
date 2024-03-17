from pydantic import BaseModel

class BuyContainsProductCreate(BaseModel):
    product_id: int
    cost: float
    amount: int

class BuyContainsProduct(BuyContainsProductCreate):
    buy_id: int
