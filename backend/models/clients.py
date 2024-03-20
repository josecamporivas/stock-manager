from schemas.Client import ClientCreate
from utils.db import connect


class Clients:
    @staticmethod
    async def all(page: int, size: int):
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM clients WHERE disabled=0 LIMIT %s OFFSET %s', (size, (page - 1) * size))
                return cursor.fetchall()

    @staticmethod
    async def get(id_client: int):
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM clients WHERE client_id = %s AND disabled=0', (id_client,))
                result = cursor.fetchone()
                return result

    @staticmethod
    async def create(data: ClientCreate):
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('INSERT INTO clients (name, phone) VALUES (%s, %s)',
                               (data.name, data.phone))
                connection.commit()
                client_id = cursor.lastrowid
                return await Clients.get(client_id)

    @staticmethod
    async def update(id_client: int, data: ClientCreate):
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('UPDATE clients SET name=%s, phone=%s WHERE client_id=%s',
                               (data.name, data.phone, id_client))
                connection.commit()
                return await Clients.get(id_client)

    @staticmethod
    async def delete(id_client: int):
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('UPDATE clients SET disabled=1 WHERE client_id=%s', (id_client,))
                connection.commit()