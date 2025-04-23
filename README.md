# Evolving Plant Pod Tracker

A full-stack web application to track plant growth visually over time using pod-specific image uploads.

---

## 📌 Core Functionality
This app enables users to:
- Create plant pods with basic information and an optional initial photo
- Upload multiple growth photos to existing pods
- View all pods with their respective photo timelines
- Organize and document plant progress over time

---

##  Tech Stack
- **Frontend:** React (JavaScript), HTML, CSS
- **Backend:** FastAPI (Python)
- **Database:** SQLite

---

##  Database Design

### `pods` Table
| Field        | Type      | Description               |
|--------------|-----------|---------------------------|
| id           | INTEGER   | Primary Key               |
| name         | VARCHAR   | Name of the plant pod     |
| description  | TEXT      | Optional notes            |
| date_planted | DATETIME  | Planting date             |
| created_at   | DATETIME  | Record creation timestamp |

### `photos` Table
| Field      | Type     | Description                         |
|------------|----------|-------------------------------------|
| id         | INTEGER  | Primary Key                         |
| pod_id     | INTEGER  | Foreign Key (linked to `pods.id`)   |
| image_path | TEXT     | File path of the uploaded image     |
| timestamp  | DATETIME | Upload time (optional)              |

---

##  API Endpoints

###  Create New Pod
```
POST /api/pods
```
Payload: `multipart/form-data`
- name
- description (optional)
- date_planted
- initial_image (optional)

###  Add Image to Existing Pod
```
POST /api/pods/{pod_id}/images
```
Payload: `multipart/form-data`
- image

###  Get All Pods + Images
```
GET /api/pods
```
Returns all pods with metadata and associated image URLs.

###  Serve Uploaded Images
```
GET /uploads/{filename}
```
Serves static image files.

---

## Setup Instructions

### Backend (FastAPI)
1. Navigate to the `server` folder
2. Install dependencies:
```
pip install -r requirements.txt
```
3. Run the server:
```
uvicorn main:app --reload
```
4. Make sure `/uploads` folder exists for image storage

### Frontend (React)
1. Navigate to the `client` folder
2. Install dependencies:
```
npm install
```
3. Run the frontend:
```
npm start
```

---

##  Design Choices
- **One-to-many relationship**: A pod can have multiple photos — modeled via foreign key in `photos` table
- **Image storage**: Images are stored on disk in `/uploads/` folder with unique filenames to prevent collisions
- **API design**: RESTful principles with clean, resource-focused endpoints
- **Frontend simplicity**: Focused on usability with clear image previews and upload flows

---

## Assumptions
- No authentication or user accounts
- Image format assumed to be JPEG or PNG
- All pods are public and stored locally

---

## Folder Structure
```
project-root/
├── client/            # React frontend
│   └── src/
├── server/            # FastAPI backend
│   ├── main.py
│   ├── models.py
│   ├── database.py
│   └── uploads/
└── README.md
```

---
