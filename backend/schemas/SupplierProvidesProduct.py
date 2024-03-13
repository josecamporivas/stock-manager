from pydantic import BaseModel

class SupplierProvidesProduct(BaseModel):
    supplier_id: int
    product_id: int
