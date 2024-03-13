from pydantic import BaseModel

class UnitMeasure(BaseModel):
    unit_meassure_id: int
    abbreviation: str
    full_name: str