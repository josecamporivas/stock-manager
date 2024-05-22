from typing import Annotated

from fastapi import APIRouter, HTTPException, Depends

from models.notifications import Notifications
from schemas.User import User
from utils.auth import get_current_user

router = APIRouter(prefix="/notifications", tags=["notifications"])

bad_role_exception = HTTPException(status_code=403, detail="Forbidden")

@router.get("/")
async def get_all(current_user: Annotated[User, Depends(get_current_user)], page: int = 1, size: int = 5):
    if current_user.role != "ADMIN" and current_user.role != "BUY_MANAGER":
        raise bad_role_exception
    return await Notifications.get_all(page, size)

@router.get("/{id}")
async def get_by_id(id: int):
    notification = await Notifications.get(id)
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    return notification

@router.put("/{id}", status_code=200)
async def mark_as_read(current_user: Annotated[User, Depends(get_current_user)], id: int):
    if current_user.role != "ADMIN" and current_user.role != "BUY_MANAGER":
        raise bad_role_exception
    print(current_user)
    await Notifications.mark_as_read(id, current_user.user_id)
