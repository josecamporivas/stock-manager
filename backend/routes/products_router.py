from fastapi import APIRouter, HTTPException

from models.products import Products
from models.suppliers import Suppliers
from schemas.Product import ProductCreate
from utils.auth import get_current_user
from typing import Annotated
from fastapi import Depends
from schemas.User import User

router = APIRouter(prefix="/products", tags=["products"])

bad_role_exception = HTTPException(status_code=403, detail="Forbidden")

@router.get("/")
async def get_all(current_user: Annotated[User, Depends(get_current_user)], page: int = 1, size: int = 10):
    if current_user.role != "ADMIN" and current_user.role != "BUY_MANAGER":
        raise bad_role_exception
    return await Products.all(page, size)

@router.get("/id-name-cost-price")
async def get_id_name():
    return await Products.get_id_name_cost_price()

@router.get("/unit-measures")
async def get_unit_measures():
    return await Products.get_unit_measures()

@router.get("/categories")
async def get_all_product_categories():
    return await Products.get_all_product_categories()

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
async def create(current_user: Annotated[User, Depends(get_current_user)], product: ProductCreate):
    if current_user.role != "ADMIN" and current_user.role != "BUY_MANAGER":
        raise bad_role_exception
    return await Products.create(product)

@router.put("/{id}")
async def update(current_user: Annotated[User, Depends(get_current_user)], id: int, product: ProductCreate):
    if current_user.role != "ADMIN" and current_user.role != "BUY_MANAGER":
        raise bad_role_exception
    return await Products.update(id, product)


@router.delete("/{id}", status_code=204)
async def delete(current_user: Annotated[User, Depends(get_current_user)], id: int):
    if current_user.role != "ADMIN" and current_user.role != "BUY_MANAGER":
        raise bad_role_exception
    return await Products.delete(id)

