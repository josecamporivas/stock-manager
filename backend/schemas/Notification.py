from pydantic import BaseModel

class NotificationCreate(BaseModel):
    message: str
    product_id: int

class Notification(NotificationCreate):
    id: int
    date: str