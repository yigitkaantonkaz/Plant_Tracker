from datetime import datetime
from pydantic import BaseModel
from typing import List, Optional

class PhotoBase(BaseModel):
    image_path: str
    timestamp: Optional[datetime] = None

class Photo(PhotoBase):
    id: int
    class Config:
        orm_mode = True

class PodBase(BaseModel):
    name: str
    description: Optional[str] = None
    date_planted: Optional[datetime] = None

class PodCreate(PodBase):
    pass

class Pod(PodBase):
    id: int
    created_at: datetime
    photos: List[Photo] = []

    class Config:
        orm_mode = True