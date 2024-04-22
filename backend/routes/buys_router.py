from typing import Annotated

from fastapi import APIRouter, HTTPException, Depends

from models.buys import Buys
from schemas.Buy import Buy, BuyCreate
from schemas.BuyContainsProduct import BuyContainsProductCreate
from datetime import datetime

from schemas.User import User
from utils.auth import get_current_user

router = APIRouter(prefix="/buys", tags=["buys"])

bad_role_exception = HTTPException(status_code=403, detail="Forbidden")

@router.get("/")
async def get_all(current_user: Annotated[User, Depends(get_current_user)], page: int = 1, size: int = 10):
    if current_user.role != "ADMIN" and current_user.role != "BUY_MANAGER":
        raise bad_role_exception
    return await Buys.all(page, size)

@router.get("/stats/{year}")
async def get_stats(current_user: Annotated[User, Depends(get_current_user)], year: int):
    if current_user.role != "ADMIN" and current_user.role != "BUY_MANAGER":
        raise bad_role_exception

    if not 2000 < year <= datetime.now().year:
        raise HTTPException(status_code=400, detail="Year must be between 2000 and current year")
    return await Buys.get_stats(year)

@router.get("/{id}")
async def get_one(id: int):
    buy = await Buys.get(id)
    if not buy:
        raise HTTPException(status_code=404, detail="Buy not found")
    return buy

@router.post("/", status_code=201)
async def create(current_user: Annotated[User, Depends(get_current_user)], buy: BuyCreate, products: list[BuyContainsProductCreate]):
    if current_user.role != "ADMIN" and current_user.role != "BUY_MANAGER":
        raise bad_role_exception
    return await Buys.create(buy, products)

@router.put("/{id}")
async def update(current_user: Annotated[User, Depends(get_current_user)], id: int, buy: BuyCreate, products: list[BuyContainsProductCreate]):
    if current_user.role != "ADMIN" and current_user.role != "BUY_MANAGER":
        raise bad_role_exception
    return await Buys.update(id, buy, products)

@router.delete("/{id}", status_code=204)
async def delete(current_user: Annotated[User, Depends(get_current_user)], id: int):
    if current_user.role != "ADMIN" and current_user.role != "BUY_MANAGER":
        raise bad_role_exception
    await Buys.delete(id)

