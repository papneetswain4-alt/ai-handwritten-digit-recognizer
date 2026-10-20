"""FastAPI Inference Service for Handwritten Digit Recognition.

Exposes RESTful HTTP endpoints:
- GET  /health   -> Check service and model availability
- POST /predict  -> Upload a digit image and receive predictions and probabilities

Usage:
    uvicorn src.api:app --host 127.0.0.1 --port 8000
"""

from typing import Dict
from fastapi import FastAPI, File, HTTPException, UploadFile, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from src.inference import MODEL, predict_image_bytes

app = FastAPI(
    title="AI Lab - Handwritten Digit Recognizer API",
    description="A minimal, educational model inference service serving a trained PyTorch CNN on MNIST.",
    version="1.0.0",
)

# Minimal CORS configuration for local Vite development frontend
ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


@app.get(
    "/health",
    summary="Health Check",
    tags=["Monitoring"],
    response_class=JSONResponse,
)
def health_check() -> Dict[str, str]:
    """Check that the inference service is healthy and the CNN weights are loaded.

    EDUCATIONAL NOTE:
    The /health endpoint is standard across production microservices. Monitoring systems,
    load balancers, and container orchestrators (like Kubernetes) query /health to verify
    the application has booted successfully before routing user traffic to it.
    """
    return {
        "status": "ok",
        "model": "cnn_mnist",
    }


@app.post(
    "/predict",
    summary="Predict Handwritten Digit",
    tags=["Inference"],
    response_class=JSONResponse,
)
async def predict_digit(file: UploadFile = File(..., description="Uploaded 28x28 digit image (PNG, JPEG, etc.)")):
    """Accept an uploaded image file, preprocess it, and return digit prediction with probabilities.

    Request:
        Multipart file upload (image/png, image/jpeg, etc.)

    Response:
        {
            "digit": 7,
            "confidence": 0.984,
            "probabilities": {
                "0": 0.0001,
                "1": 0.0002,
                ...
                "7": 0.984,
                ...
            }
        }
    """
    # 1. Validate file presence
    if not file:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No image file provided.",
        )

    # 2. Read file content bytes
    try:
        image_bytes = await file.read()
        if len(image_bytes) == 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Uploaded file is empty.",
            )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to read uploaded file: {str(e)}",
        )

    # 3. Perform preprocessing and model inference
    try:
        raw_result = predict_image_bytes(image_bytes)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid image format or corrupted file: {str(e)}",
        )

    # 4. Format probabilities as a clean string-keyed dictionary: {"0": p0, "1": p1, ..., "9": p9}
    # This prevents exposing internal tensor formats and adheres to standard JSON specifications.
    prob_dict = {
        str(digit): prob
        for digit, prob in enumerate(raw_result["probabilities"])
    }

    return {
        "digit": raw_result["digit"],
        "confidence": raw_result["confidence"],
        "probabilities": prob_dict,
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("src.api:app", host="127.0.0.1", port=8000, reload=False)
