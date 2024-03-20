from fastapi import APIRouter, HTTPException

from models.clients import Clients
from schemas.Client import ClientCreate

router = APIRouter(prefix="/clients", tags=["clients"])

@router.get("/")
async def get_all(page: int = 1, size: int = 10):
    return await Clients.all(page, size)

@router.get("/{id}")
async def get_one(id: int):
    client = await Clients.get(id)
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    return client

@router.post("/", status_code=201)
async def create(client: ClientCreate):
    return await Clients.create(client)

@router.put("/{id}")
async def update(id: int, client: ClientCreate):
    return await Clients.update(id, client)

@router.delete("/{id}", status_code=204)
async def delete(id: int):
    return await Clients.delete(id)