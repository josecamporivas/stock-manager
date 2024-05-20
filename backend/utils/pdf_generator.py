from fpdf import FPDF

def generate_invoice_pdf(invoice: dict):
    TABLE_HEADERS = ["Product", "Amount", "Price", "Total"]

    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Helvetica", size=24, style="B")
    pdf.cell(200, 10, txt=f"INVOICE #{invoice['invoice']['invoice_id']}", ln=True, align="C")
    pdf.set_font("Helvetica", size=12)

    formatted_date = invoice['invoice']['date'].strftime("%d/%m/%Y %H:%M:%S")
    pdf.cell(200, 10, txt=f"--Date:-- {formatted_date}", ln=True, markdown=True)
    pdf.cell(200, 10, txt=f"--Client:-- {invoice['invoice']['client_name'] or '<unknown>'}", ln=True, markdown=True)
    pdf.cell(200, 10, txt=f"--User:-- {invoice['invoice']['user_name']}", ln=True, markdown=True)
    pdf.set_font("Helvetica", size=18)
    pdf.cell(200, 10, txt=f"INVOICE LINES", ln=True, align="C")

    pdf.set_font("Helvetica", size=12)
    with pdf.table(text_align='CENTER') as table:
        row = table.row()
        for header_text in TABLE_HEADERS:
            row.cell(header_text)

        for line in invoice['lines']:
            row = table.row()
            row.cell(line['product']['name'])
            row.cell(f"{line['amount']:.3f} {line['product']['unit_measure_abbreviation']}")
            row.cell(f"{line['price']:.2f} euros")
            row.cell(f"{line['amount'] * line['price']: .2f} euros")

    total = sum([line['amount'] * line['price'] for line in invoice['lines']])
    pdf.cell(0, 10, txt=f"Total: {total:.2f} euros", ln=True, new_x="LEFT")

    pdf.output(f"./invoices/invoice_{invoice['invoice']['invoice_id']}.pdf")
