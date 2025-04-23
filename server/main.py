import os
from . import models, crud, schemas, database
from fastapi import FastAPI, UploadFile, File, Depends, HTTPException, status, Body
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import SessionLocal, engine, Base

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this to ["http://localhost:3000"] in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static image files
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_FOLDER), name="uploads")

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/pods/", response_model=schemas.Pod)
def create_pod(pod: schemas.PodCreate, db: Session = Depends(get_db)):
    return crud.create_pod(db, pod)

@app.get("/pods/", response_model=list[schemas.Pod])
def read_pods(db: Session = Depends(get_db)):
    return crud.get_pods(db)

@app.get("/pods/{pod_id}", response_model=schemas.Pod)
def read_pod(pod_id: int, db: Session = Depends(get_db)):
    db_pod = crud.get_pod(db, pod_id)
    if not db_pod:
        raise HTTPException(status_code=404, detail="Pod not found")
    return db_pod

@app.post("/pods/{pod_id}/photos/")
async def upload_photo(pod_id: int, file: UploadFile = File(...), db: Session = Depends(get_db)):
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())
    photo = crud.add_photo_to_pod(db, pod_id, image_path=f"/uploads/{file.filename}")
    return {"photo_id": photo.id, "image_path": photo.image_path}

@app.delete("/photos/{photo_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_photo(photo_id: int, db: Session = Depends(get_db)):
    photo = db.query(models.Photo).filter(models.Photo.id == photo_id).first()
    if not photo:
        raise HTTPException(status_code=404, detail="Photo not found")

    # Delete the image file too (optional)
    image_path = f".{photo.image_path}"  # remove leading slash
    if os.path.exists(image_path):
        os.remove(image_path)

    db.delete(photo)
    db.commit()
    return

@app.put("/pods/{pod_id}", response_model=schemas.Pod)
def update_pod(pod_id: int, updated_pod: schemas.PodCreate, db: Session = Depends(get_db)):
    pod = crud.get_pod(db, pod_id)
    if not pod:
        raise HTTPException(status_code=404, detail="Pod not found")
    
    pod.name = updated_pod.name
    pod.description = updated_pod.description
    db.commit()
    db.refresh(pod)
    return pod