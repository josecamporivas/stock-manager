from fastapi import APIRouter, HTTPException

from models.products import Products
from models.suppliers import Suppliers
from schemas.Product import ProductCreate

router = APIRouter(prefix="/products", tags=["products"])

@router.get("/")
async def get_all(page: int = 1, size: int = 10):
    return await Products.all(page, size)

@router.get("/id-name-cost")
async def get_id_name():
    return await Products.get_id_name_cost()

@router.get("/unit-measures")
async def get_unit_measures():
    return await Products.get_unit_measures()

@router.get("/{id}")
async def get_one(id: int):
    product = await Products.get(id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.get("/{id}/suppliers")
async def get_suppliers(id: int):
    return await Suppliers.get_suppliers_of_product(id)

@router.post("/", status_code=201)
async def create(product: ProductCreate):
    return await Products.create(product)

@router.put("/{id}")
async def update(id: int, product: ProductCreate):
    return await Products.update(id, product)

@router.delete("/{id}", status_code=204)
async def delete(id: int):
    return await Products.delete(id)

