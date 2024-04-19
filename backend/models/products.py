from schemas.Product import ProductCreate
from utils.db import connect

class Products:
    @staticmethod
    async def all(page: int, size: int):
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT product_id FROM products WHERE disabled=0 LIMIT %s OFFSET %s', (size, (page - 1) * size))
                result = cursor.fetchall()

                products = []
                for item in result:
                    products.append(await Products.get(item['product_id']))

                return products

    @staticmethod
    async def get_id_name_cost_price():
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT product_id, name, cost, price FROM products WHERE disabled=0')
                return cursor.fetchall()

    @staticmethod
    async def get_unit_measures():
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM unit_measures')
                return cursor.fetchall()

    @staticmethod
    async def get_all_product_categories():
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM product_categories')
                return cursor.fetchall()

    @staticmethod
    async def get(id_product: int):
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM products WHERE product_id = %s AND disabled=0', (id_product,))
                result = cursor.fetchone()
                unit_id = result['unit_measure_id']

                cursor.execute('SELECT * FROM unit_measures WHERE unit_measure_id = %s', (unit_id,))
                result['unit'] = cursor.fetchone()
                del result['unit_measure_id']

                cursor.execute('SELECT * FROM product_categories WHERE category_id = %s', (result['category_id'],))
                result['category'] = cursor.fetchone()
                del result['category_id']
                return result

    @staticmethod
    async def create(data: ProductCreate):
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('INSERT INTO products (name, description, price, cost, stock, category_id, unit_measure_id, unit_limit) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)',
                               (data.name, data.description, data.price, data.cost, data.stock, data.category_id, data.unit_measure_id, data.unit_limit))
                connection.commit()
                product_id = cursor.lastrowid
                return await Products.get(product_id)

    @staticmethod
    async def update(id_product: int, data: ProductCreate):
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('UPDATE products SET name=%s, description=%s, price=%s, cost=%s, stock=%s, unit_measure_id=%s, unit_limit=%s WHERE product_id=%s',
                               (data.name, data.description, data.price, data.cost, data.stock, data.unit_measure_id, data.unit_limit, id_product))
                connection.commit()
                return await Products.get(id_product)

    @staticmethod
    async def delete(id_product: int):
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('UPDATE products SET disabled=1 WHERE product_id=%s', (id_product,))
                connection.commit()

