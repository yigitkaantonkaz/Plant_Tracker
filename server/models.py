from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class Pod(Base):
    __tablename__ = "pods"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    date_planted = Column(DateTime, nullable=True)

    photos = relationship("Photo", back_populates="pod")


class Photo(Base):
    __tablename__ = "photos"

    id = Column(Integer, primary_key=True, index=True)
    pod_id = Column(Integer, ForeignKey("pods.id"))
    image_path = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)

    pod = relationship("Pod", back_populates="photos")