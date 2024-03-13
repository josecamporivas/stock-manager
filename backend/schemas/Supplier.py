from pydantic import BaseModel

class SupplierCreate(BaseModel):
    name: str
    phone: str

class Supplier(SupplierCreate):
    supplier_id: int
    disabled: bool
