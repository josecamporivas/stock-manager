from pydantic import BaseModel

class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    cost: float
    stock: int
    unit_measure_id: int
    unit_limit: int

class Product(ProductCreate):
    id: int
    disabled: bool = None
