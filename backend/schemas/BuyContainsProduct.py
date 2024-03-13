from pydantic import BaseModel

class BuyContainsProductCreate(BaseModel):
    buy_id: int
    product_id: int
    cost: float
    amount: int
