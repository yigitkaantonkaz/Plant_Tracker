from sqlalchemy.orm import Session
from . import models
from . import schemas
from datetime import datetime

def create_pod(db: Session, pod: schemas.PodCreate):
    db_pod = models.Pod(name=pod.name, description=pod.description, date_planted=pod.date_planted)
    db.add(db_pod)
    db.commit()
    db.refresh(db_pod)
    return db_pod

def get_pods(db: Session):
    return db.query(models.Pod).all()

def get_pod(db: Session, pod_id: int):
    pod = db.query(models.Pod).filter(models.Pod.id == pod_id).first()
    
    if pod:
        pod.photos.sort(key=lambda p: p.timestamp, reverse=True)
        
    return pod

def add_photo_to_pod(db: Session, pod_id: int, image_path: str):
    photo = models.Photo(pod_id=pod_id, image_path=image_path, timestamp=datetime.utcnow())
    db.add(photo)
    db.commit()
    db.refresh(photo)
    return photo