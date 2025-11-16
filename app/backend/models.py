from pydantic import BaseModel
from typing import List

class PlanRequest(BaseModel):
    budget: str
    time: str
    style: List[str]
    location: List[str]
    dietary: List[str]
    inspiration: List[str] | str
