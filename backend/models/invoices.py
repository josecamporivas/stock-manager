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
                cursor.execute('SELECT invoice_id FROM invoices WHERE disabled=0 ORDER BY date DESC LIMIT %s OFFSET %s', (size, (page - 1) * size))
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
                cursor.execute('SELECT username FROM users WHERE user_id = %s', (result['invoice']['user_id'],))
                result['invoice']['user_name'] = cursor.fetchone()['username']
                cursor.execute('SELECT name FROM clients WHERE client_id = %s', (result['invoice']['client_id'],))
                result['invoice']['client_name'] = cursor.fetchone()['name']

                cursor.execute('SELECT * FROM invoice_lines WHERE invoice_id = %s ORDER BY line_number', (id_invoice,))
                lines = cursor.fetchall()
                result['lines'] = []
                for line in lines:
                    line_info = {'price': line['price'], 'amount': line['amount']}
                    cursor.execute('SELECT *  FROM products WHERE product_id = %s', (line['product_id'],))
                    line_info['product'] = cursor.fetchone()
                    cursor.execute('SELECT abbreviation FROM unit_measures WHERE unit_measure_id = %s',
                                   (line_info['product']['unit_measure_id'],))
                    line_info['product']['unit_measure_abbreviation'] = cursor.fetchone()['abbreviation']
                    result['lines'].append(line_info)
                return result

    @staticmethod
    async def get_stats(year: int):
        with connect() as connection:
            with connection.cursor() as cursor:
                result = []
                for month in range(1, 13):
                    cursor.execute(
                        'SELECT count(DISTINCT invoices.invoice_id) as "num_invoices", COALESCE(SUM(amount * price), 0) as "total_cost_sales" FROM invoice_lines JOIN invoices ON invoice_lines.invoice_id = invoices.invoice_id WHERE YEAR(date) = %s AND MONTH(date) = %s',
                        (year, month))
                    month_info = cursor.fetchone()
                    month_info['month'] = month
                    month_info['year'] = year
                    result.append(month_info)

                return result

    @staticmethod
    async def create(data: InvoiceCreate, lines: list[InvoiceLineCreate]):
        with connect() as connection:
            with connection.cursor() as cursor:
                cursor.execute('INSERT INTO invoices (date, user_id, client_id) VALUES (%s, %s, %s)',
                               (datetime.now(), data.user_id, data.client_id))
                # connection.commit()
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
