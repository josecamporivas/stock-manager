from fastapi import HTTPException

from schemas.User import User, UserCreate
from utils.auth import verify_password, get_password_hash
from utils.db import connect
from pymysql.err import IntegrityError

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
    async def create(data: UserCreate):
        if (data.dni == ""
                or data.username == "" or data.email == ""):
            raise HTTPException(status_code=400, detail="Faltan campos por cubrir")
        with connect() as connection:
            with connection.cursor() as cursor:
                try:

                    cursor.execute(
                        'INSERT INTO users (dni, username, password, name, surname, email, role) VALUES (%s, %s, %s, %s, %s, %s, %s)',
                        (data.dni, data.username, get_password_hash(data.password), data.name, data.surname, data.email,
                         data.role))
                    connection.commit()
                    user_id = cursor.lastrowid
                    return await Users.get(user_id)
                except IntegrityError as e:
                    connection.rollback()
                    raise HTTPException(status_code=400, detail="Un valor introducido ya existe")

    @staticmethod
    async def update(id_user: int, data: UserCreate):
        if (data.dni == ""
                or data.username == "" or data.email == ""):
            raise HTTPException(status_code=400, detail="Faltan campos por cubrir")
        with connect() as connection:
            with connection.cursor() as cursor:
                try:
                    if data.password:
                        cursor.execute(
                            'UPDATE users SET dni=%s, username=%s, password=%s, name=%s, surname=%s, email=%s, role=%s WHERE user_id=%s',
                            (data.dni, data.username, get_password_hash(data.password), data.name, data.surname, data.email,
                             data.role, id_user))
                    else:
                        cursor.execute(
                            'UPDATE users SET dni=%s, username=%s, name=%s, surname=%s, email=%s, role=%s WHERE user_id=%s',
                            (data.dni, data.username, data.name, data.surname, data.email, data.role, id_user))
                    connection.commit()
                    return await Users.get(id_user)
                except IntegrityError as e:
                    connection.rollback()
                    raise HTTPException(status_code=400, detail="Un valor introducido ya existe")

    @staticmethod
    async def delete(id_user: int):
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('UPDATE users SET disabled=1 WHERE user_id=%s', (id_user,))
                connection.commit()

    @staticmethod
    async def authenticate(username: str, password: str) -> User | None:
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM users WHERE username = %s and disabled = 0', (username,))
                user = cursor.fetchone()
                if not user:
                    return None
                if not verify_password(password, user['password']):
                    return None
                return User(**user)
