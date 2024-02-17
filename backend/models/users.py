from schemas.User import User, UserCreate

users_db = [
    {
        "id": 1,
        "username": "John Doe",
        "email": "john@gmail.com",
        "password": "password"
    },
    {
        "id": 2,
        "username": "Jane Doe",
        "email": "jane@gmail.com",
        "password": "password"
    }
]


class Users:

    @staticmethod
    async def all():
        return [User.parse_obj(user) for user in users_db]

    @staticmethod
    async def get(id: int):
        filtered_users = list(filter(lambda user: user["id"] == id, users_db))
        return filtered_users[0] if filtered_users else None

    @staticmethod
    async def create(data: UserCreate):
        new_user = User(**data.dict())
        max_id = max([user["id"] for user in users_db])
        new_user.id = max_id + 1
        users_db.append(new_user.model_dump())
        return new_user
