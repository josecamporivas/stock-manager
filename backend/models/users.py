from typing import Annotated

from fastapi import Depends

from schemas.User import User, UserCreate
from utils.auth import verify_password, get_password_hash, get_current_user
from utils.db import connect

class Users:
    @staticmethod
    async def all():
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM users WHERE disabled=0')
                result = cursor.fetchall()
                return result

    @staticmethod
    async def get(id_user: int):
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM users WHERE user_id = %s AND disabled=0', (id_user,))
                result = cursor.fetchone()
                return result

    @staticmethod
    async def get_actual_user(current_user: Annotated[User, Depends(get_current_user)]):
        return current_user

    @staticmethod
    async def create(data: UserCreate):
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('INSERT INTO users (dni, username, password, name, surname, email, role) VALUES (%s, %s, %s, %s, %s, %s, %s)',
                               (data.dni, data.username, get_password_hash(data.password), data.name, data.surname, data.email, data.role))
                connection.commit()
                user_id = cursor.lastrowid
                return await Users.get(user_id)

    @staticmethod
    async def authenticate(username: str, password: str) -> User | None:
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM users WHERE username = %s', (username,))
                user = cursor.fetchone()

                if not user:
                    return None
                if not verify_password(password, user['password']):
                    return None
                return User(**user)
