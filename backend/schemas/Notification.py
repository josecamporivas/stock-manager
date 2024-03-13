from pydantic import BaseModel

class NotificationCreate(BaseModel):
    message: str
    product_id: int

class Notification(NotificationCreate):
    notification_id: int
    date: str
    user_id: int | None
