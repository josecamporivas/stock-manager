from pydantic import BaseModel

class SupplierCreate(BaseModel):
    name: str
    surname: str
    phone: str
    company: str | None

class Supplier(SupplierCreate):
    id: int
    disabled: bool = False