from typing import Annotated

from fastapi import APIRouter, HTTPException, Depends

from models.suppliers import Suppliers
from schemas.Supplier import SupplierCreate
from schemas.User import User
from utils.auth import get_current_user

router = APIRouter(prefix="/suppliers", tags=["suppliers"])

bad_role_exception = HTTPException(status_code=403, detail="Forbidden")

@router.get("/")
async def get_all(current_user: Annotated[User, Depends(get_current_user)], page: int = 1, size: int = 10):
    if current_user.role != "ADMIN" and current_user.role != "BUY_MANAGER":
        raise bad_role_exception
    return await Suppliers.all(page, size)

@router.get("/{id}")
async def get_one(id: int):
    supplier = await Suppliers.get(id)
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return supplier

@router.post("/", status_code=201)
async def create(current_user: Annotated[User, Depends(get_current_user)], supplier: SupplierCreate):
    if current_user.role != "ADMIN" and current_user.role != "BUY_MANAGER":
        raise bad_role_exception
    return await Suppliers.create(supplier)

@router.put("/{id}")
async def update(current_user: Annotated[User, Depends(get_current_user)], id: int, supplier: SupplierCreate):
    if current_user.role != "ADMIN" and current_user.role != "BUY_MANAGER":
        raise bad_role_exception
    return await Suppliers.update(id, supplier)

@router.delete("/{id}", status_code=204)
async def delete(current_user: Annotated[User, Depends(get_current_user)], id: int):
    if current_user.role != "ADMIN" and current_user.role != "BUY_MANAGER":
        raise bad_role_exception
    return await Suppliers.delete(id)

