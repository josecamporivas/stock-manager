from fastapi import FastAPI
from routers import users_router

app = FastAPI()
app.include_router(users_router.router)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}
