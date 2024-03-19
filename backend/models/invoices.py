from datetime import datetime

from fastapi import HTTPException

from schemas.Invoice import InvoiceCreate
from schemas.InvoiceLine import InvoiceLineCreate
from utils.db import connect


class Invoices:
    @staticmethod
    async def all(page: int, size: int):
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('SELECT invoice_id FROM invoices WHERE disabled=0 LIMIT %s OFFSET %s',
                               (size, (page - 1) * size))
                results = cursor.fetchall()
                if results is None or len(results) == 0:
                    return []
                invoices = []
                for result in results:
                    invoices.append(await Invoices.get(result['invoice_id']))

                return invoices

    @staticmethod
    async def get(id_invoice: int):
        with connect() as connection:
            with connection.cursor() as cursor:
                result = {}
                cursor.execute('SELECT * FROM invoices WHERE invoice_id = %s AND disabled=0', (id_invoice,))
                invoice = cursor.fetchone()

                if not invoice:
                    return None
                result['invoice'] = invoice

                cursor.execute('SELECT * FROM invoice_lines WHERE invoice_id = %s ORDER BY line_number', (id_invoice,))
                lines = cursor.fetchall()
                for line in lines:
                    cursor.execute('SELECT * FROM products WHERE product_id = %s', (line['product_id'],))
                    product = cursor.fetchone()
                    line['product'] = product
                    del line['product_id']
                result['lines'] = lines

                return result

    @staticmethod
    async def create(data: InvoiceCreate, lines: list[InvoiceLineCreate]):
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('INSERT INTO invoices (date, user_id, client_id) VALUES (%s, %s, %s)',
                               (datetime.now(), data.user_id, data.client_id))
                connection.commit()
                invoice_id = cursor.lastrowid

                for i, line in enumerate(lines):
                    cursor.execute(
                        'INSERT INTO invoice_lines (invoice_id, line_number, product_id, amount, price) VALUES (%s, %s, %s, %s, %s)',
                        (invoice_id, i + 1, line.product_id, line.amount, line.price))

                    cursor.execute('SELECT name, stock, unit_limit FROM products WHERE product_id = %s',
                                   (line.product_id,))
                    product_info = cursor.fetchone()

                    stock = product_info['stock']
                    unit_limit = product_info['unit_limit']
                    name = product_info['name']

                    if float(stock) - float(line.amount) < 0.0:
                        raise HTTPException(status_code=409, detail=f'Not enough stock of product {name}[id: {line.product_id}]')

                    if float(stock) - float(line.amount) <= float(unit_limit):
                        cursor.execute('INSERT INTO notifications (date, product_id, message) VALUES ($s, %s, %s)', (
                            datetime.now(),
                            f'Stock of product {name}[id: {line.product_id}] is below the limit [{unit_limit}]'))

                    cursor.execute('UPDATE products SET stock = stock - %s WHERE product_id = %s',
                                   (line.amount, line.product_id))
                    connection.commit()
                return await Invoices.get(invoice_id)

    @staticmethod
    async def update(id_invoice: int, data: InvoiceCreate, lines: list[InvoiceLineCreate]):
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('UPDATE invoices SET client_id=%s WHERE invoice_id=%s',
                               (data.client_id, id_invoice))

                for line in lines:
                    cursor.execute('SELECT amount FROM invoice_lines WHERE invoice_id = %s AND product_id = %s',
                                   (id_invoice, line.product_id))
                    amount_old = cursor.fetchone()['amount']

                    cursor.execute('UPDATE invoice_lines SET amount = %s, price = %s WHERE invoice_id = %s AND product_id = %s',
                                   (line.amount, line.price, id_invoice, line.product_id))

                    cursor.execute('SELECT name, stock FROM products WHERE product_id = %s', (line.product_id,))

                    product_info = cursor.fetchone()
                    stock = product_info['stock']
                    name = product_info['name']
                    if float(stock) + float(amount_old) - float(line.amount) < 0.0:
                        raise HTTPException(status_code=409, detail=f'Not enough stock of product {name}[id: {line.product_id}]')

                    cursor.execute('UPDATE products SET stock = stock + %s WHERE product_id = %s',
                                   (float(amount_old) - float(line.amount), line.product_id))
                connection.commit()

                return await Invoices.get(id_invoice)

    @staticmethod
    async def delete(id_invoice: int):
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('UPDATE invoices SET disabled=1 WHERE invoice_id=%s', (id_invoice,))

                cursor.execute('SELECT * FROM invoice_lines WHERE invoice_id = %s', (id_invoice,))
                lines = cursor.fetchall()
                for line in lines:
                    cursor.execute('UPDATE products SET stock = stock + %s WHERE product_id = %s',
                                   (line['amount'], line['product_id']))
                    connection.commit()
                connection.commit()
