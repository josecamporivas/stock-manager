from pydantic import BaseModel

class UnitMeasure(BaseModel):
    id: int
    abbreviation: str
    full_name: str