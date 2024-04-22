from typing import Annotated

from fastapi import APIRouter, HTTPException, Depends

from models.clients import Clients
from schemas.Client import ClientCreate
from schemas.User import User
from utils.auth import get_current_user

router = APIRouter(prefix="/clients", tags=["clients"])

bad_role_exception = HTTPException(status_code=403, detail="Forbidden")

@router.get("/")
async def get_all(current_user: Annotated[User, Depends(get_current_user)], page: int = 1, size: int = 10):
    if current_user.role != "ADMIN" and current_user.role != "SELL_MANAGER":
        raise bad_role_exception
    return await Clients.all(page, size)

@router.get("/{id}")
async def get_one(id: int):
    client = await Clients.get(id)
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    return client

@router.post("/", status_code=201)
async def create(current_user: Annotated[User, Depends(get_current_user)], client: ClientCreate):
    if current_user.role != "ADMIN" and current_user.role != "SELL_MANAGER":
        raise bad_role_exception
    return await Clients.create(client)

@router.put("/{id}")
async def update(current_user: Annotated[User, Depends(get_current_user)], id: int, client: ClientCreate):
    if current_user.role != "ADMIN" and current_user.role != "SELL_MANAGER":
        raise bad_role_exception
    return await Clients.update(id, client)

@router.delete("/{id}", status_code=204)
async def delete(current_user: Annotated[User, Depends(get_current_user)], id: int):
    if current_user.role != "ADMIN" and current_user.role != "SELL_MANAGER":
        raise bad_role_exception
    return await Clients.delete(id)
