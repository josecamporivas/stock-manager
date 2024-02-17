from fastapi import APIRouter
from models.users import Users
from schemas.User import User, UserCreate

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/", response_model=list[User])
async def get_all():
    return await Users.all()


@router.get("/{id}", response_model=User)
async def get_one(id: int):
    return await Users.get(id)


@router.post("/", response_model=User)
async def create(user: UserCreate):
    return await Users.create(user)