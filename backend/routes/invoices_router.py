from typing import Annotated

from fastapi import APIRouter, HTTPException, Depends

from models.invoices import Invoices
from schemas.Invoice import InvoiceCreate
from schemas.InvoiceLine import InvoiceLineCreate
from schemas.User import User
from utils.auth import get_current_user

router = APIRouter(prefix="/invoices", tags=["invoices"])

bad_role_exception = HTTPException(status_code=403, detail="Forbidden")

@router.get("/")
async def get_all(current_user: Annotated[User, Depends(get_current_user)], page: int = 1, size: int = 5):
    if current_user.role != "ADMIN" and current_user.role != "SELL_MANAGER":
        raise bad_role_exception
    return await Invoices.all(page, size)

@router.get("/stats/{year}")
async def get_stats(current_user: Annotated[User, Depends(get_current_user)], year: int):
    if current_user.role != "ADMIN" and current_user.role != "SELL_MANAGER":
        raise bad_role_exception
    return await Invoices.get_stats(year)

@router.get("/{id}")
async def get_by_id(id: int):
    invoice = await Invoices.get(id)
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")
    return invoice

@router.post("/", status_code=201)
async def create(current_user: Annotated[User, Depends(get_current_user)], invoice: InvoiceCreate, lines: list[InvoiceLineCreate]):
    if current_user.role != "ADMIN" and current_user.role != "SELL_MANAGER":
        raise bad_role_exception
    return await Invoices.create(invoice, lines)

@router.put("/{id}")
async def update(current_user: Annotated[User, Depends(get_current_user)], id: int, invoice: InvoiceCreate, lines: list[InvoiceLineCreate]):
    if current_user.role != "ADMIN" and current_user.role != "SELL_MANAGER":
        raise bad_role_exception
    return await Invoices.update(id, invoice, lines)

@router.delete("/{id}", status_code=204)
async def delete(current_user: Annotated[User, Depends(get_current_user)], id: int):
    if current_user.role != "ADMIN" and current_user.role != "SELL_MANAGER":
        raise bad_role_exception
    return await Invoices.delete(id)

