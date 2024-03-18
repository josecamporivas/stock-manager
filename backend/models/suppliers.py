from schemas.Supplier import SupplierCreate
from utils.db import connect


class Suppliers:
    @staticmethod
    async def all(page: int, size: int):
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM suppliers WHERE disabled=0 LIMIT %s OFFSET %s', (size, (page - 1) * size))
                return cursor.fetchall()

    @staticmethod
    async def get(id_supplier: int):
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM suppliers WHERE supplier_id = %s AND disabled=0', (id_supplier,))
                result = cursor.fetchone()
                return result

    @staticmethod
    async def create(data: SupplierCreate):
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('INSERT INTO suppliers (name, phone) VALUES (%s, %s)',
                               (data.name, data.phone))
                connection.commit()
                supplier_id = cursor.lastrowid
                return await Suppliers.get(supplier_id)

    @staticmethod
    async def update(id_supplier: int, data: SupplierCreate):
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('UPDATE suppliers SET name=%s, phone=%s WHERE supplier_id=%s',
                               (data.name, data.phone, id_supplier))
                connection.commit()
                return await Suppliers.get(id_supplier)

    @staticmethod
    async def delete(id_supplier: int):
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('UPDATE suppliers SET disabled=1 WHERE supplier_id=%s', (id_supplier,))
                connection.commit()

    @staticmethod
    async def get_suppliers_of_product(id_product: int):
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT supplier_id FROM supplier_provides_product WHERE product_id = %s', (id_product,))
                result = cursor.fetchall()
                suppliers = []
                for item in result:
                    suppliers.append(await Suppliers.get(item['supplier_id']))
                return suppliers
