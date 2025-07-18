# Use official Python image
FROM python:3.9-slim

# Prevent Python from writing .pyc files and buffer issues
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
# Suppress TensorFlow INFO and WARNING logs
ENV TF_CPP_MIN_LOG_LEVEL=2

# Set work directory
WORKDIR /app

# Install system dependencies needed by mediapipe, Pillow, TensorFlow, opencv-python, pyautogui, etc.
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libgl1-mesa-glx \
    libglib2.0-0 \
    ffmpeg \
    libsm6 \
    libxext6 \
    libxrender1 \
    libx11-6 \
    scrot \
    xvfb \
    xauth \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install dependencies
COPY requirements.txt .

# Upgrade pip
RUN pip install --upgrade pip

# Install dependencies (TensorFlow, mediapipe, etc. first if needed)
RUN pip install --no-cache-dir tensorflow mediapipe \
    && pip install --no-cache-dir -r requirements.txt

# Copy the app code
COPY . .

# (Optional) Create a non-root user and switch to it
RUN useradd -m appuser && chown -R appuser /app
USER appuser

# Expose the port
EXPOSE 8000

# Run the app with xvfb-run for GUI support, using PORT env variable for Render compatibility
CMD ["sh", "-c", "xvfb-run -a uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]
