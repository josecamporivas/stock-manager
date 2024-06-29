from schemas.Buy import BuyCreate
from schemas.BuyContainsProduct import BuyContainsProductCreate
from utils.db import connect

from datetime import datetime


class Buys:
    @staticmethod
    async def all(page: int, size: int):
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT buy_id, user_id, supplier_id FROM buys WHERE disabled=0 ORDER BY date DESC LIMIT %s OFFSET %s', (size, (page - 1) * size))
                results = cursor.fetchall()

                buys = []
                for result in results:
                    buys.append(await Buys.get(result['buy_id']))
                return buys

    @staticmethod
    async def get(id_buy: int):
        with connect() as connection:
            with connection.cursor() as cursor:
                result = {}
                cursor.execute('SELECT * FROM buys WHERE buy_id = %s', (id_buy,))
                result['buy'] = cursor.fetchone()
                cursor.execute('SELECT username FROM users WHERE user_id = %s', (result['buy']['user_id'],))
                result['buy']['user_name'] = cursor.fetchone()['username']
                cursor.execute('SELECT name FROM suppliers WHERE supplier_id = %s', (result['buy']['supplier_id'],))
                result['buy']['supplier_name'] = cursor.fetchone()['name']
                cursor.execute('SELECT * FROM buy_contains_product WHERE buy_id = %s', (id_buy,))
                products = cursor.fetchall()
                result['products'] = []
                for product in products:
                    product_info = {'cost': product['cost'], 'amount': product['amount']}
                    cursor.execute('SELECT *  FROM products WHERE product_id = %s', (product['product_id'],))
                    product_info['product'] = cursor.fetchone()
                    cursor.execute('SELECT abbreviation FROM unit_measures WHERE unit_measure_id = %s', (product_info['product']['unit_measure_id'],))
                    product_info['product']['unit_measure_abbreviation'] = cursor.fetchone()['abbreviation']
                    result['products'].append(product_info)
                return result

    @staticmethod
    async def get_stats(year: int):
        with connect() as connection:
            with connection.cursor() as cursor:
                result = []
                for month in range(1, 13):
                    cursor.execute('SELECT count(DISTINCT buys.buy_id) as "num_buys", COALESCE(SUM(amount * cost), 0) as "total_cost_buys" FROM buy_contains_product JOIN buys ON buy_contains_product.buy_id = buys.buy_id WHERE YEAR(date) = %s AND MONTH(date) = %s', (year, month))
                    month_info = cursor.fetchone()
                    month_info['month'] = month
                    month_info['year'] = year
                    result.append(month_info)

                return result

    @staticmethod
    async def create(buy: BuyCreate, products: list[BuyContainsProductCreate]):
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('INSERT INTO buys (date, user_id, supplier_id) VALUES (%s, %s, %s)',
                               (datetime.now(), buy.user_id, buy.supplier_id))
                connection.commit()
                buy_id = cursor.lastrowid
                for product in products:
                    cursor.execute(
                        'INSERT INTO buy_contains_product (buy_id, product_id, cost, amount) VALUES (%s, %s, %s, %s)',
                        (buy_id, product.product_id, product.cost, product.amount))

                    cursor.execute('UPDATE products SET stock = stock + %s WHERE product_id = %s',
                                   (product.amount, product.product_id))

                    cursor.execute(
                        'INSERT IGNORE INTO supplier_provides_product (supplier_id, product_id) VALUES (%s, %s)',
                        (buy.supplier_id, product.product_id))
                    connection.commit()

                return await Buys.get(buy_id)

    @staticmethod
    async def update(id_buy: int, buy: BuyCreate, products: list[BuyContainsProductCreate]):
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('UPDATE buys SET user_id = %s, supplier_id = %s WHERE buy_id = %s',
                               (buy.user_id, buy.supplier_id, id_buy))
                connection.commit()
                for product in products:
                    cursor.execute('SELECT amount FROM buy_contains_product WHERE buy_id = %s AND product_id = %s',
                                   (id_buy, product.product_id))

                    amount = float(cursor.fetchone()['amount'])
                    cursor.execute(
                        'UPDATE buy_contains_product SET cost = %s, amount = %s WHERE buy_id = %s AND product_id = %s',
                        (product.cost, product.amount, id_buy, product.product_id))

                    cursor.execute('UPDATE products SET stock = stock + %s WHERE product_id = %s',
                                   (product.amount - amount, product.product_id))
                    cursor.execute(
                        'INSERT IGNORE INTO supplier_provides_product (supplier_id, product_id) VALUES (%s, %s)',
                        (buy.supplier_id, product.product_id))
                    connection.commit()
        return await Buys.get(id_buy)

    @staticmethod
    async def delete(id_buy: int):
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('UPDATE buys SET disabled = 1 WHERE buy_id = %s ', (id_buy,))
                connection.commit()

                cursor.execute('SELECT * FROM buy_contains_product WHERE buy_id = %s', (id_buy,))
                products = cursor.fetchall()
                for product in products:
                    cursor.execute('UPDATE products SET stock = stock - %s WHERE product_id = %s',
                                   (product['amount'], product['product_id']))
                connection.commit()
