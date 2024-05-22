from utils.db import connect


class Notifications:
    @staticmethod
    async def get_all(page: int, size: int):
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM notifications WHERE user_id IS NULL ORDER BY date DESC LIMIT %s OFFSET %s', (size, (page - 1) * size))
                return cursor.fetchall()

    @staticmethod
    async def get(id_notification: int):
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM notifications WHERE notification_id = %s', (id_notification,))
                return cursor.fetchone()

    @staticmethod
    async def mark_as_read(id_notification: int, user_id: int):
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('UPDATE notifications SET user_id=%s WHERE notification_id = %s', (user_id, id_notification))
                connection.commit()
