from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from models.users import Users
from schemas.Token import Token
from schemas.User import User, UserCreate
from utils.auth import create_token, get_current_user

router = APIRouter(prefix="/users", tags=["users"])

bad_role_exception = HTTPException(status_code=403, detail="Forbidden")

@router.get("/", response_model=list[User])
async def get_all(current_user: Annotated[User, Depends(get_current_user)]):
    if current_user.role != "ADMIN":
        raise bad_role_exception
    return await Users.all()

@router.get("/me", response_model=User)
async def read_users_me(current_user: Annotated[User, Depends(get_current_user)]):
    return current_user

@router.get("/{id}", response_model=User)
async def get_one(id: int):
    user = await Users.get(id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/", response_model=User, status_code=201)
# async def create(current_user: Annotated[User, Depends(get_current_user)], user: UserCreate):
async def create(current_user: Annotated[User, Depends(get_current_user)], user: UserCreate):
    #    if current_user.role != "ADMIN":
    #        raise HTTPException(status_code=403, detail="Forbidden")
    if current_user.role != "ADMIN":
        raise bad_role_exception
    return await Users.create(user)


@router.put("/{id}", response_model=User)
# async def update(current_user: Annotated[User, Depends(get_current_user)], id: int, user: UserCreate):
async def update(current_user: Annotated[User, Depends(get_current_user)], id: int, user: UserCreate):
    #     if current_user.role != "ADMIN":
    #         raise HTTPException(status_code=403, detail="Forbidden")
    if current_user.role != "ADMIN":
        raise bad_role_exception
    return await Users.update(id, user)


@router.delete("/{id}", status_code=204)
# async def delete(current_user: Annotated[User, Depends(get_current_user)], id: int):
async def delete(current_user: Annotated[User, Depends(get_current_user)], id: int):
    # if current_user.role != "ADMIN":
    # raise HTTPException(status_code=403, detail="Forbidden")
    if current_user.role != "ADMIN":
        raise bad_role_exception
    await Users.delete(id)


@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    user = await Users.authenticate(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_token(user.user_id, user.role)
    return access_token
