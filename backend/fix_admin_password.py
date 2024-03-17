from utils.db import connect
from utils.auth import get_password_hash

try:
    with connect() as connection:
        with connection.cursor() as cursor:
            cursor.execute('UPDATE users SET password=%s WHERE username=%s', (get_password_hash('admin'), 'admin'))
            connection.commit()
except Exception as e:
    print(e)

