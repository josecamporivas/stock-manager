from pydantic import BaseModel

class InvoiceLineCreate(BaseModel):
    amount: int
    price: float
    product_id: int

class InvoiceLine(InvoiceLineCreate):
    invoice_id: int
    line_number: int
