from fastapi import APIRouter, HTTPException

from models.suppliers import Suppliers
from schemas.Supplier import SupplierCreate

router = APIRouter(prefix="/suppliers", tags=["suppliers"])

@router.get("/")
async def get_all(page: int = 1, size: int = 10):
    return await Suppliers.all(page, size)

@router.get("/{id}")
async def get_one(id: int):
    supplier = await Suppliers.get(id)
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return supplier

@router.post("/", status_code=201)
async def create(supplier: SupplierCreate):
    return await Suppliers.create(supplier)

@router.put("/{id}")
async def update(id: int, supplier: SupplierCreate):
    return await Suppliers.update(id, supplier)

@router.delete("/{id}", status_code=204)
async def delete(id: int):
    return await Suppliers.delete(id)

