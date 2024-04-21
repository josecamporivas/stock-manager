from fastapi import APIRouter, HTTPException

from models.buys import Buys
from schemas.Buy import Buy, BuyCreate
from schemas.BuyContainsProduct import BuyContainsProductCreate
from datetime import datetime
router = APIRouter(prefix="/buys", tags=["buys"])

@router.get("/")
async def get_all(page: int = 1, size: int = 10):
    return await Buys.all(page, size)

@router.get("/stats/{year}")
async def get_stats(year: int):
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
async def create(buy: BuyCreate, products: list[BuyContainsProductCreate]):
    return await Buys.create(buy, products)

@router.put("/{id}")
async def update(id: int, buy: BuyCreate, products: list[BuyContainsProductCreate]):
    return await Buys.update(id, buy, products)

@router.delete("/{id}", status_code=204)
async def delete(id: int):
    await Buys.delete(id)

