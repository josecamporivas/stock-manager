from pydantic import BaseModel

class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    cost: float
    stock: float
    unit_measure_id: int
    unit_limit: int

class Product(ProductCreate):
    product_id: int
    disabled: bool
