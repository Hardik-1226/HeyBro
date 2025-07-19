from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
# import threading
# import cv2
# from cvzone.HandTrackingModule import HandDetector
# import pyautogui
# import time

# FastAPI Setup
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Remove gesture thread and camera code, keep only API endpoints

def recognize_gesture(landmarks):
    if not landmarks or not isinstance(landmarks, list):
        return "no_hand"
    hand = landmarks[0]
    if hand[8][1] < hand[12][1]:
        return "index_above_middle"
    return "unknown"

@app.post("/process-landmarks")
async def process_landmarks(request: Request):
    data = await request.json()
    landmarks = data.get("landmarks")
    action = recognize_gesture(landmarks)
    return {"status": "received", "action": action}

@app.get("/")
def read_root():
    return {"message": "GestureGuy backend is running!"}
