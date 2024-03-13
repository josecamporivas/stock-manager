from datetime import datetime, timedelta, timezone
from typing import Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt

from schemas.Token import Token, TokenData
from schemas.User import User
from utils.bcrypt import verify_pass, hash_pass
from utils.db import connect

# to get a string like this run:
# openssl rand -hex 32
SECRET_KEY = "5c81edf1737e29bf36c9455062e894920ddc7760a229120417bf7ef94843c7c6"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 120  # minutes

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/token")

async def get_by_username(username: str):
    with connect() as connection:
        with connection.cursor() as cursor:
            cursor.execute('SELECT * FROM users WHERE username = %s and disabled=0', (username,))
            result = cursor.fetchone()
            if not result:
                return None
            return User(**result)

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def create_token(username: str):
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": username}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")

def verify_password(plain_password, hashed_password):
    return verify_pass(plain_password, hashed_password)

def get_password_hash(password):
    return hash_pass(password)

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception

    user = await get_by_username(token_data.username)
    if user is None:
        raise credentials_exception
    return user
