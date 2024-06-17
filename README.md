# Stock manager
Full-stack app built in:
- **Frontend**: React
- **Backend**: Python 3.12 + FastAPI
- **Database**: MySQL

# SET UP

## Database
Start a local MySQL server and run the SQL scripts in this order:

- `database.sql`
- `example_data_buys.sql`
- `example_data_invoices.sql`

## Backend
Access to the backend project

```bash
cd backend/
```

Then you have to install all dependencies

```bash
pip install -r requirements.txt
```

And run the server

```bash
uvicorn main:app --reload
```

## Frontend
Once you make the previous steps, access the React app folder

```bash
cd frontend/
```

Install the dependencies

```bash
npm install
```

Finally, run the frontend application

```bash
npm run dev
```

