from pydantic import BaseModel

class InvoiceCreate(BaseModel):
    user_id: int
    client_id: int | None

class Invoice(InvoiceCreate):
    invoice_id: int
    date: str
    disabled: bool
