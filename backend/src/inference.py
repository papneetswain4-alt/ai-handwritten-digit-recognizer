"""Model Inference Engine for MNIST Handwritten Digit Recognition.

Responsibilities:
1. Load serialized checkpoint weights from models/cnn_mnist.pt once on CPU.
2. Maintain model in evaluation mode (model.eval()) with zero retraining.
3. Preprocess incoming images into the exact 4D tensor format expected by the CNN:
   - Grayscale conversion (1 channel)
   - Resized to 28x28 pixels
   - Normalized from [0, 255] to [0.0, 1.0]
   - Formatted as [Batch, Channel, Height, Width] -> [1, 1, 28, 28]
4. Run inference safely under torch.no_grad().
5. Convert raw logits into calibrated probabilities via softmax and extract top digit.
"""

import io
from pathlib import Path
from typing import Dict, List, Union
import numpy as np
from PIL import Image
from scipy.ndimage import center_of_mass
import torch

from src.model import HandwrittenDigitCNN

# ---------------------------------------------------------------------------
# Device & Model Initialization (Singleton Pattern - Loaded Once on Startup)
# ---------------------------------------------------------------------------
# We explicitly target the CPU because this inference service runs on a standard
# CPU environment and guarantees portable, lightweight execution without CUDA overhead.
DEVICE = torch.device("cpu")

# Resolve model path relative to project root
BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "models" / "cnn_mnist.pt"


def load_inference_model(weights_path: Path = MODEL_PATH) -> HandwrittenDigitCNN:
    """Instantiate the CNN and load trained weights in evaluation mode.

    EDUCATIONAL NOTES:
    - Zero Retraining: We strictly load previously trained weights; no gradient
      descent or optimizer steps occur here.
    - model.eval(): Crucial for inference. It informs PyTorch that we are evaluating,
      disabling training-specific modules (like Dropout or BatchNorm updates) to ensure
      deterministic, reproducible outputs.
    """
    if not weights_path.exists():
        raise FileNotFoundError(
            f"Trained model checkpoint not found at: {weights_path}. "
            "Please ensure models/cnn_mnist.pt exists."
        )

    model = HandwrittenDigitCNN()
    state_dict = torch.load(weights_path, map_location=DEVICE, weights_only=True)
    model.load_state_dict(state_dict)

    # Set model to evaluation mode
    model.eval()
    model.to(DEVICE)
    return model


# Global model instance initialized upon module import
# This ensures weights are loaded once in memory rather than on every HTTP request.
MODEL = load_inference_model()


def preprocess_image(image: Image.Image) -> torch.Tensor:
    """Preprocess a drawing canvas image into the canonical MNIST-aligned 4D tensor.

    EDUCATIONAL NOTES (Phase 10 — Resolving Covariate Distribution Shift):
    1. Grayscale Conversion:
       MNIST images are single-channel grayscale (L). We convert any incoming RGB/RGBA
       canvas drawing to grayscale.
    2. Non-Background Detection & Bounding-Box Cropping:
       Directly squeezing a 280x280 canvas to 28x28 shrinks off-center or small drawings
       into tiny 8-12px patches in empty black space. We find the foreground bounding box
       of active pixels (intensity > 20) and tightly crop the digit.
    3. Aspect-Ratio Preserving Scaling (20x20 Bounding Box):
       Standard MNIST digits were scaled to fit within a 20x20 pixel bounding box while
       preserving their original aspect ratio. We scale the longest dimension to 20 px
       and proportionally scale the other.
    4. Centering on 28x28 Field & Center-of-Mass Alignment:
       We paste the 20x20 digit into the center of a blank 28x28 black canvas, then
       calculate the Center of Mass (intensity centroid) and apply a clamped translation
       (max 4 pixels) so the center of mass aligns with the canvas center (14, 14).
    5. Normalization ([0, 255] -> [0.0, 1.0]):
       Scales pixel intensities to match the exact CNN training distribution.
    6. Tensor Shape ([1, 1, 28, 28]):
       Formats as 4D tensor [Batch=1, Channel=1, Height=28, Width=28].
    """
    # 1. Convert to single-channel grayscale
    if image.mode != "L":
        image = image.convert("L")

    arr = np.array(image, dtype=np.float32)

    # 2. Check for blank canvas (threshold intensity > 20)
    threshold = 20.0
    y_idx, x_idx = np.where(arr > threshold)
    if len(y_idx) == 0:
        # Blank canvas: return clean all-zero tensor
        return torch.zeros((1, 1, 28, 28), dtype=torch.float32, device=DEVICE)

    # 3. Extract tight bounding box
    x_min, x_max = int(x_idx.min()), int(x_idx.max()) + 1
    y_min, y_max = int(y_idx.min()), int(y_idx.max()) + 1

    cropped = image.crop((x_min, y_min, x_max, y_max))
    w, h = cropped.size

    # 4. Aspect-ratio preserving scaling into target 20x20 box
    target_size = 20
    if w > h:
        new_w = target_size
        new_h = max(1, int(round(h * (target_size / w))))
    else:
        new_h = target_size
        new_w = max(1, int(round(w * (target_size / h))))

    resized = cropped.resize((new_w, new_h), Image.Resampling.BILINEAR)

    # 5. Place onto 28x28 black canvas
    canvas_28 = Image.new("L", (28, 28), color=0)
    paste_x = (28 - new_w) // 2
    paste_y = (28 - new_h) // 2
    canvas_28.paste(resized, (paste_x, paste_y))

    arr_28 = np.array(canvas_28, dtype=np.float32)

    # 6. Center-of-mass alignment (clamped to [-4, 4] pixels to prevent clipping)
    if arr_28.sum() > 0:
        cy, cx = center_of_mass(arr_28)
        shift_x = int(np.round(14.0 - cx))
        shift_y = int(np.round(14.0 - cy))
        shift_x = max(-4, min(4, shift_x))
        shift_y = max(-4, min(4, shift_y))

        shifted = np.roll(arr_28, shift_y, axis=0)
        shifted = np.roll(shifted, shift_x, axis=1)
        if shift_y > 0:
            shifted[:shift_y, :] = 0
        elif shift_y < 0:
            shifted[shift_y:, :] = 0
        if shift_x > 0:
            shifted[:, :shift_x] = 0
        elif shift_x < 0:
            shifted[:, shift_x:] = 0
        arr_28 = shifted

    # 7. Normalize from [0, 255] to [0.0, 1.0]
    img_normalized = arr_28 / 255.0

    # 8. Convert to PyTorch 4D tensor: [1, 1, 28, 28]
    tensor = torch.from_numpy(img_normalized).unsqueeze(0).unsqueeze(0)
    return tensor.to(DEVICE)


def predict(input_tensor: torch.Tensor) -> Dict[str, Union[int, float, List[float]]]:
    """Execute model inference and return predicted digit with probabilities.

    EDUCATIONAL NOTES:
    1. torch.no_grad():
       During inference, we do not need backpropagation. Disabling gradient tracking
       via `torch.no_grad()` drastically reduces memory consumption and speeds up computation.
    2. Logits vs. Probabilities (Softmax):
       The raw linear output layer (fc2) produces unbounded scalar scores called 'logits' (-inf to +inf).
       Softmax exponentiates and normalizes these logits so they sum to 1.0, representing a valid
       probability distribution: P(y = c) = exp(z_c) / sum_j(exp(z_j)).
    3. argmax:
       Picks the class index (0-9) associated with the highest softmax probability score.
    """
    with torch.no_grad():
        logits = MODEL(input_tensor)                  # Raw logits: shape [1, 10]
        probabilities = torch.softmax(logits, dim=1)  # Calibrated probabilities: shape [1, 10]
        confidence, predicted_idx = torch.max(probabilities, dim=1)  # argmax

    predicted_digit = int(predicted_idx.item())
    pred_confidence = float(confidence.item())
    all_probabilities = [float(p) for p in probabilities.squeeze(0).tolist()]

    return {
        "digit": predicted_digit,
        "confidence": round(pred_confidence, 4),
        "probabilities": [round(p, 6) for p in all_probabilities],
    }


def predict_image_bytes(image_bytes: bytes) -> Dict[str, Union[int, float, List[float]]]:
    """Helper function to run end-to-end inference directly from raw image bytes.

    Args:
        image_bytes: Encoded image file bytes (PNG, JPEG, etc.)

    Returns:
        Prediction dictionary containing digit, confidence, and 10 class probabilities.
    """
    image = Image.open(io.BytesIO(image_bytes))
    input_tensor = preprocess_image(image)
    return predict(input_tensor)
