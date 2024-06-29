from fastapi import FastAPI
from routes import users_router, buys_router, products_router, supplier_router, invoices_router, clients_router, \
    notifications_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(users_router.router)
app.include_router(buys_router.router)
app.include_router(products_router.router)
app.include_router(supplier_router.router)
app.include_router(invoices_router.router)
app.include_router(clients_router.router)
app.include_router(notifications_router.router)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}
