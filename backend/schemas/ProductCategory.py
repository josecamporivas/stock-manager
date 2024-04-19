from pydantic import BaseModel


class ProductCategoryCreate(BaseModel):
    category_name: str

class ProductCategory(ProductCategoryCreate):
    category_id: int
