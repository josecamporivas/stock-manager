from fastapi import APIRouter, HTTPException

from models.invoices import Invoices
from schemas.Invoice import InvoiceCreate
from schemas.InvoiceLine import InvoiceLineCreate

router = APIRouter(prefix="/invoices", tags=["invoices"])

@router.get("/")
async def get_all(page: int = 1, size: int = 5):
    return await Invoices.all(page, size)

@router.get("/stats/{year}")
async def get_stats(year: int):
    return await Invoices.get_stats(year)

@router.get("/{id}")
async def get_by_id(id: int):
    invoice = await Invoices.get(id)
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")
    return invoice

@router.post("/", status_code=201)
async def create(invoice: InvoiceCreate, lines: list[InvoiceLineCreate]):
    return await Invoices.create(invoice, lines)

@router.put("/{id}")
async def update(id: int, invoice: InvoiceCreate, lines: list[InvoiceLineCreate]): # Can update client_id, amount (each) and price (each)
    return await Invoices.update(id, invoice, lines)

@router.delete("/{id}", status_code=204)
async def delete(id: int):
    return await Invoices.delete(id)

