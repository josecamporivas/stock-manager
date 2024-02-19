from schemas.User import User, UserCreate
from utils.db import connect

class Users:
    @staticmethod
    async def all():
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM users')
                result = cursor.fetchall()
                return result

    @staticmethod
    async def get(id: int):
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM users WHERE id = %s', (id,))
                result = cursor.fetchone()
                return result

    @staticmethod
    async def create(data: UserCreate):
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('INSERT INTO users (username, email, password) VALUES (%s, %s, %s)',
                               (data.username, data.email, data.password))
                connection.commit()
                user_id = cursor.lastrowid
                return await Users.get(user_id)
