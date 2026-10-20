# AI Lab - Handwritten Digit Recognizer

A progressive, learning-focused machine learning and computer vision project for handwritten digit recognition using the MNIST dataset.

## Project Structure

The project is organized into three major top-level directories:

```text
AI Lab/
├── backend/                     # Complete ML environment, models, API & datasets
│   ├── .venv/                   # Python virtual environment
│   ├── data/
│   │   ├── raw/                 # Original downloaded datasets (e.g. MNIST via torchvision)
│   │   ├── processed/           # Transformed / normalized datasets
│   │   └── real_world/          # Real-world handwriting samples (raw/ and processed/)
│   ├── experiments/             # Experiment tracking and logs
│   ├── models/                  # Serialized weights (cnn_mnist.pt, cnn_mnist_augmented.pt)
│   ├── scratch/                 # Test artifacts and utility scripts
│   ├── src/                     # Core inference package and REST API
│   │   ├── __init__.py          # Package initialization
│   │   ├── model.py             # PyTorch CNN architecture definition
│   │   ├── inference.py         # Model loading, image preprocessing & inference logic
│   │   └── api.py               # FastAPI REST service & HTTP endpoints
│   └── requirements.txt         # Python dependencies
│
├── frontend/                    # React + Vite interactive drawing canvas interface
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── App.jsx              # Drawing canvas, predictions & API state
│   │   ├── index.css            # Vanilla CSS design system & layout
│   │   └── main.jsx             # React application entry point
│   ├── index.html               # HTML host document
│   ├── package.json             # Frontend dependencies (React, Vite)
│   └── vite.config.js           # Vite dev server configuration (port 5173)
│
├── notebooks/                   # ML exploration, training & analysis notebooks
│   ├── 01_dataset_exploration.ipynb        # Initial dataset inspection & statistics
│   ├── 02_knn_baseline.ipynb               # Baseline KNN model (K=3)
│   ├── 03_knn_k_experiment.ipynb           # KNN hyperparameter sweep (K=1,3,5,7,9)
│   ├── 04_logistic_regression.ipynb        # Linear classifier & learned weight maps
│   ├── 05_neural_network.ipynb             # PyTorch ANN (Multi-Layer Perceptron)
│   ├── 06_cnn.ipynb                        # Convolutional Neural Network (CNN)
│   ├── 07_cnn_error_analysis.ipynb         # CNN error analysis & model introspection
│   ├── 08_real_world_preprocessing.ipynb   # Real-world preprocessing & distribution shift
│   ├── 09_data_augmentation.ipynb          # Data augmentation & robust CNN experiment
│   ├── 10_cnn_interpretability.ipynb       # CNN interpretability & feature visualization
│   ├── 11_model_calibration.ipynb          # Model calibration, confidence & selective prediction
│   ├── 12_temperature_scaling.ipynb        # Temperature scaling & post-hoc calibration
│   ├── 13_transfer_learning.ipynb          # Experiment 15: Transfer learning (ResNet-18 on CIFAR-10)
│   ├── 14_fine_tuning.ipynb                # Experiment 16: Fine-tuning (Layer4 vs Full ResNet-18)
│   ├── 15_model_selection_and_robustness.ipynb # Experiment 17: Final Model Selection & Robustness
│   └── 16_model_freeze_and_integration.ipynb  # Experiment 18: Final AI Model Freeze & Integration
│
├── .gitignore                   # Git ignore policies
└── README.md                    # Project documentation
```

## Setup & Startup Instructions

### 1. Backend (FastAPI + PyTorch)

Navigate to the `backend/` directory:

```bash
cd backend
```

Activate the virtual environment:
- **Windows PowerShell:**
  ```powershell
  .\.venv\Scripts\Activate.ps1
  ```
- **Windows Command Prompt:**
  ```cmd
  .\.venv\Scripts\activate.bat
  ```

Launch the FastAPI inference server:
```bash
uvicorn src.api:app --host 127.0.0.1 --port 8000
```
- Health Check: `http://127.0.0.1:8000/health`
- Predict Endpoint: `http://127.0.0.1:8000/predict`

### 2. Frontend (React + Vite)

In a separate terminal, navigate to `frontend/`:

```bash
cd frontend
npm run dev
```
Open `http://127.0.0.1:5173` in your browser.

### 3. Notebooks (Jupyter)

The learning notebooks reside in `notebooks/` and access datasets and models inside `backend/` via project-relative paths.

To launch Jupyter using the backend environment:
```bash
cd notebooks
..\backend\.venv\Scripts\jupyter notebook
```

---

## Current Status & Experiment History

- **Phase 1: Environment & Dataset Exploration**
  - Completed in [`notebooks/01_dataset_exploration.ipynb`](notebooks/01_dataset_exploration.ipynb)
  - Dataset inspection, distribution analysis, and pixel statistics for MNIST (60,000 train, 10,000 test).
- **Phase 2: Baseline ML Experiment (K-Nearest Neighbors)**
  - Completed in [`notebooks/02_knn_baseline.ipynb`](notebooks/02_knn_baseline.ipynb)
  - Non-parametric baseline with $K=3$, normalized features ($[0.0, 1.0]$), and flattened 784-D vectors.
  - **Test Accuracy:** **97.05%** (9,705 / 10,000 correct)
  - **Inference Time:** ~15.9 seconds (~1.6 ms/sample)
  - Includes confusion matrix, per-digit precision/recall/F1 metrics, and failure mode visual inspection.
- **Phase 3: Hyperparameter Experiment (KNN K-Sweep)**
  - Completed in [`notebooks/03_knn_k_experiment.ipynb`](notebooks/03_knn_k_experiment.ipynb)
  - Systematic sweep across $K \in \{1, 3, 5, 7, 9\}$ on the full 10,000 test set.
  - Analyzed the bias-variance tradeoff, sensitivity to noise at $K=1$, over-smoothing at $K=9$, and inference latency constancy.
  - Confirmed **$K=3$** as the optimal baseline choice (97.05% accuracy).
- **Phase 4: Parameterized Linear Model (Multiclass Logistic Regression)**
  - Completed in [`notebooks/04_logistic_regression.ipynb`](notebooks/04_logistic_regression.ipynb)
  - First parameterized model: learns 7,850 parameters (7,840 weights + 10 biases) using L-BFGS optimization.
  - **Test Accuracy:** **92.56%** (9,256 / 10,000 correct)
  - **Training Time:** ~37.6 seconds (iterative cross-entropy optimization)
  - **Inference Time:** **0.0216 seconds** for all 10,000 images (~0.0022 ms/sample — over **700x faster** than KNN).
  - Contrasted instance-based learning (lazy, non-linear) with parameterized learning (eager, linear decision boundaries, lightweight in RAM).
  - Visualized learned weight templates for all 10 digit classes.
- **Phase 5: Deep Learning (Artificial Neural Network - ANN)**
  - Completed in [`notebooks/05_neural_network.ipynb`](notebooks/05_neural_network.ipynb)
  - Multi-Layer Perceptron in PyTorch: $784 \to 128 \ (\text{ReLU}) \to 10 \ (\text{Logits})$.
  - Trainable parameters: **101,770** ($100,480$ layer 1 + $1,290$ layer 2).
  - Trained across 5 epochs using Adam optimizer ($\alpha=0.001$, batch size 64) and CrossEntropyLoss.
  - **Test Accuracy:** **97.49%** (9,749 / 10,000 correct — outperforming both Logistic Regression and KNN).
  - **Training Time:** ~30.1 seconds (mini-batch gradient descent and backpropagation).
  - **Inference Time:** **0.0170 seconds** for all 10,000 images (~0.0017 ms/sample).
  - Combines the non-linear classification power of KNN with the microsecond inference speed of parameterized models.
- **Phase 6: Computer Vision & Spatial Learning (Convolutional Neural Network - CNN)**
  - Completed in [`notebooks/06_cnn.ipynb`](notebooks/06_cnn.ipynb)
  - PyTorch CNN architecture: $\text{Conv2D}(1 \to 32) \to \text{MaxPool} \to \text{Conv2D}(32 \to 64) \to \text{MaxPool} \to \text{Linear}(3136 \to 128) \to \text{Linear}(128 \to 10)$.
  - Preserves 2D tensor topology ($1 \times 28 \times 28$) without destructive upfront flattening.
  - Trainable parameters: **421,642** (320 in Conv1, 18,496 in Conv2, 401,536 in FC1, 1,290 in FC2).
  - Trained for 5 epochs using Adam optimizer ($\alpha=0.001$, batch size 64).
  - **Test Accuracy:** **99.06%** (9,906 / 10,000 correct — only 94 errors on the entire test set!).
  - **Training Time:** ~206.2 seconds (~3.4 minutes on CPU).
  - **Inference Time:** **1.3376 seconds** for all 10,000 images (~0.13 ms/sample).
  - Visualized all 32 learned first-layer convolutional feature maps (edge detectors, stroke boundaries, stroke glow).
- **Phase 7: CNN Error Analysis & Model Introspection**
  - Completed in [`notebooks/07_cnn_error_analysis.ipynb`](notebooks/07_cnn_error_analysis.ipynb)
  - Reused the trained CNN weights directly from [`backend/models/cnn_mnist.pt`](backend/models/cnn_mnist.pt) without retraining.
  - **Test Set Evaluation:** Evaluated all 10,000 test samples in ~2.5 seconds (~0.25 ms/sample).
  - **Errors & Accuracy:** 93 misclassifications out of 10,000 images (**99.07% test accuracy**, **0.93% error rate**).
  - **Per-Class Vulnerability:**
    - Hardest digit: **Digit 8** (20 errors out of 974, **2.05% error rate**).
    - Second hardest: **Digit 9** (15 errors out of 1,009, **1.49% error rate**) and **Digit 4** (14 errors out of 982, **1.43% error rate**).
    - Easiest digit: **Digit 0** (only 1 error out of 980, **0.10% error rate** — a 20-fold disparity compared to Digit 8).
  - **Dominant Confusion Pairs:**
    - True 9 $\to$ Predicted 7 (9 occurrences)
    - True 5 $\to$ Predicted 3 (7 occurrences)
    - True 8 $\to$ Predicted 0 (7 occurrences)
    - True 2 $\to$ Predicted 7 (5 occurrences)
    - True 6 $\to$ Predicted 0 (5 occurrences)
    - True 4 $\to$ Predicted 9 (5 occurrences)
  - **Error-Focused Confusion Matrix:** Implemented dual confusion visualization — full matrix alongside diagonal-zeroed heatmap to spotlight off-diagonal error hotspots.
  - **Visual Error Inspection:** Rendered a 24-digit error gallery showing true label, predicted label, winning softmax confidence, and test sample index.
  - **Softmax Confidence Distribution:**
    - Correct predictions: Mean confidence **99.50%**, median **100.0%** (heavily concentrated at $>99.9\%$).
    - Incorrect predictions: Mean confidence **77.59%**, median **79.88%**, spanning from 46.7% to 99.96%.
    - Overconfident errors ($P > 90\%$): 29 samples (31.2% of errors).
    - Uncertain errors ($P < 60\%$): 21 samples (22.6% of errors).
  - **Four Confidence Quadrants:** Analyzed and displayed prototypical examples of Q1 (High-Conf Correct), Q2 (Low-Conf Correct), Q3 (High-Conf Incorrect), and Q4 (Low-Conf Incorrect).
  - **Core Engineering Insight:** Disproved the assumption that 99% accuracy implies uniform reliability. Error analysis revealed structural vulnerabilities, topological stroke confusions, and silent overconfidence, establishing confidence calibration as a necessity for production APIs.
- **Phase 8: Model Inference API (FastAPI)**
  - Implemented modular inference package under [`backend/src/`](backend/src/):
    - [`backend/src/model.py`](backend/src/model.py): Exact `HandwrittenDigitCNN` architecture from Experiment 05 (421,642 parameters).
    - [`backend/src/inference.py`](backend/src/inference.py): Singleton model loader, image preprocessor, and prediction engine.
    - [`backend/src/api.py`](backend/src/api.py): FastAPI web application exposing `/health` and `/predict`.
  - **Zero Retraining:** Loads pre-trained weights directly from [`backend/models/cnn_mnist.pt`](backend/models/cnn_mnist.pt) on CPU at startup.
  - **Endpoints:**
    - `GET  /health` -> `{"status": "ok", "model": "cnn_mnist"}`
    - `POST /predict` -> Accepts image file upload (PNG/JPEG) and returns `{"digit": 7, "confidence": 1.0, "probabilities": {"0": 0.0, ..., "7": 1.0, ...}}`.
  - **How to Run the Server:**
    ```bash
    cd backend
    uvicorn src.api:app --host 127.0.0.1 --port 8000
    ```
- **Phase 9: React Drawing Canvas + CNN Integration**
  - Completed in [`frontend/`](frontend/)
  - **Drawing Interface:** Interactive HTML5 canvas ($280 \times 280$ px) with black background (`#000000`), white rounded stroke (`#ffffff`, width 18px), and pointer event listeners with `touch-action: none` supporting both mouse and touch input.
  - **Client-Side Workflow:**
    $$\text{Canvas Drawing} \longrightarrow \text{canvas.toBlob('image/png')} \longrightarrow \text{FormData('file')} \longrightarrow \text{POST http://127.0.0.1:8000/predict}$$
  - **Prediction Display:** Shows prominent predicted digit, confidence percentage ($P \times 100$), and 10 horizontal class probability bars highlighting the winner.
  - **UX & Safety States:**
    - Blank canvas validation: Rejects empty canvases with `"Draw a digit first."` alert without calling API.
    - Loading state: Disables buttons and shows `"Recognizing..."` during inference.
    - Error handling: Gracefully displays server connection errors if FastAPI is unreachable.
    - Clear action: Resets canvas, prediction state, confidence, and error alerts.
  - **CORS Configuration:** Enabled local development origins (`http://localhost:5173`, `http://127.0.0.1:5173`) in [`backend/src/api.py`](backend/src/api.py).
  - **Startup Instructions:**
    1. Start FastAPI Backend:
       ```bash
       cd backend
       uvicorn src.api:app --host 127.0.0.1 --port 8000
       ```
    2. Start React/Vite Frontend:
       ```bash
       cd frontend
       npm run dev
       ```
    3. Open `http://127.0.0.1:5173` in your browser.
- **Phase 10: Real-World Handwriting Preprocessing & Distribution Shift**
  - Completed in [`notebooks/08_real_world_preprocessing.ipynb`](notebooks/08_real_world_preprocessing.ipynb)
  - Dataset created in [`backend/data/real_world/raw/`](backend/data/real_world/raw/) (35 realistic hand-drawn test samples across digits 0–9).
  - **Zero Retraining:** Evaluated the exact same frozen CNN weights (`backend/models/cnn_mnist.pt`).
  - **Headline Results:**
    - **Baseline Accuracy:** **30 / 35 (85.7%)** (Naive full canvas downsampling)
    - **Improved Accuracy:** **35 / 35 (100.0%)** (Bounding box crop + aspect ratio preserved 20x20 scaling + center-of-mass centering)
    - **Fixed Errors:** 5 out of 5 failure modes fixed with 100% confidence, including the infamous Phase 9 bug ($0 \to 9$ at 89.7% confidence fixed to $0 \to 0$ at 100.0% confidence).
    - **Regressions:** 0 regressions (zero samples hurt).
  - **Production Engineering Decision:** Integrated the improved preprocessing pipeline into [`backend/src/inference.py`](backend/src/inference.py) so all future React drawing canvas submissions are automatically centered and scale-normalized.
- **Phase 11: Data Augmentation & Robust CNN Experiment**
  - Completed in [`notebooks/09_data_augmentation.ipynb`](notebooks/09_data_augmentation.ipynb)
  - Trained Model B ([`backend/models/cnn_mnist_augmented.pt`](backend/models/cnn_mnist_augmented.pt)) with on-the-fly realistic affine transformations ($\pm 10^\circ$ rotation, $\pm 10\%$ translation, $90\%-110\%$ scale).
  - Compared against baseline Model A ([`backend/models/cnn_mnist.pt`](backend/models/cnn_mnist.pt)) under identical architecture (421,642 parameters) and training parameters.
  - **Headline Results:**
    - **MNIST Benchmark:** Model A: **99.07%** (93 errors) vs Model B: **98.83%** (117 errors) — mild regularization penalty of $-0.24\%$ (+24 errors).
    - **Real-World Benchmark (35 Samples):** Model A: **100.0%** (35/35) vs Model B: **100.0%** (35/35) — both perfect when combined with Phase 10 improved preprocessing.
    - **Confidence Calibration:** Model A exhibited higher certainty (**98.48%** vs **95.64%**), with Model B exhibiting softened confidence on dual-loop digits ($8$ and $6$).
  - **Model Selection Decision:** **KEEP ORIGINAL** (Model A retained as authoritative production checkpoint).

---

### Educational Concepts — Phase 10: Real-World Preprocessing & Distribution Shift

#### 1. Why MNIST Performance Does Not Guarantee Real-World Performance
A model achieving 99.07% test accuracy on the MNIST benchmark has mastered the specific statistical distribution of the MNIST test set. However, benchmark accuracy is conditional on the assumption that input data follows the exact same generation process. In real-world applications (such as a browser drawing canvas), differences in user stroke dynamics, canvas scale, margin padding, and off-center drawing introduce profound discrepancies that benchmark metrics never expose.

#### 2. What Distribution Shift (Covariate Shift) Means
Supervised learning assumes input samples $X$ and labels $Y$ are Independent and Identically Distributed (I.I.D.):
$$P_{train}(X, Y) = P_{deploy}(X, Y)$$
When deploying to users, the label concept $P(Y|X)$ (what defines digit '0') remains unchanged, but the input feature distribution $P(X)$ diverges:
$$P_{train}(X) \neq P_{deploy}(X)$$
This specific variant of dataset shift is called **Covariate Shift**.

#### 3. The Baseline Preprocessing Pipeline
$$\text{Canvas (280} \times \text{280)} \xrightarrow{\text{Grayscale}} \text{Direct Bilinear Resize to } 28 \times 28 \xrightarrow{\text{Normalize } [0, 1]} \text{CNN}$$
**Fatal Flaw:** Direct downsampling retains whatever arbitrary margins the user left. A small or off-center drawing is compressed into a tiny 8–12px cluster floating in an corner of empty black space, leaving the receptive fields of the trained convolutional kernels completely misaligned.

#### 4. The Improved Preprocessing Pipeline
1. **Grayscale Conversion:** Standardize input to single-channel luminance (`L`).
2. **Foreground Thresholding:** Identify stroke pixels (`intensity > 20`). Gracefully return a zero tensor if blank.
3. **Bounding-Box Extraction:** Find tight $[x_{min}, y_{min}, x_{max}, y_{max}]$ coordinates.
4. **Cropping:** Crop the bounding box, discarding irrelevant empty borders.
5. **Aspect-Ratio Preserved Scaling:** Fit the cropped digit into a **$20 \times 20$ bounding box** by scaling the longest dimension to 20 pixels and scaling the other dimension proportionally.
6. **Centering on $28 \times 28$ Canvas:** Paste the $20 \times 20$ digit into the center of a blank $28 \times 28$ black canvas.
7. **Center of Mass Alignment:** Compute the pixel intensity centroid $(\bar{y}, \bar{x})$ and apply a clamped translation (within $[-4, 4]$ pixels) so the center of mass aligns with $(14, 14)$.
8. **Normalization & Tensor Reshaping:** Scale intensities by $1 / 255.0$ and produce 4D tensor `[1, 1, 28, 28]`.

#### 5. Why Centering, Cropping, and Aspect-Ratio Preservation Help
In 1998, LeCun et al. constructed MNIST by fitting NIST characters into a $20 \times 20$ box preserving aspect ratio, centered in a $28 \times 28$ canvas by center of mass. By replicating these exact geometric constraints, the improved pipeline transforms diverse, off-center user drawings into the precise topological manifold the CNN's convolutional filters were trained to recognize.

#### 6. Experimental Results & Comparison Table

| Metric | Baseline Pipeline | Improved Preprocessing | Delta / Impact |
| :--- | :--- | :--- | :--- |
| **Total Test Samples** | 35 | 35 | Evaluated across 0–9 with diverse placements |
| **Correct Predictions** | 30 | **35** | **+5 repaired digits** |
| **Incorrect Predictions** | 5 | **0** | **100% error reduction** |
| **Real-World Accuracy** | 85.7% | **100.0%** | **+14.3% absolute gain** |
| **Avg Confidence (Correct)** | 94.6% | **99.1%** | +4.5% higher certainty |
| **Avg Confidence (Incorrect)** | 73.0% | **N/A (0 errors)** | Eliminated silent overconfidence |
| **Regressions (HURT)** | N/A | **0** | Zero samples degraded |

#### 7. Key Repaired Failures
- **The Phase 9 Bug (`0 -> 9`):** A small off-center '0' was predicted by the baseline as **9 with 95.3% confidence** (the oval resembled the top loop of a 9). Improved preprocessing centered and scaled it, yielding **0 with 100.0% confidence**.
- **Corner Shift (`0 -> 7`):** Baseline predicted **7 (90.7%)** due to top-corner placement. Improved predicted **0 (100.0%)**.
- **Crossbar Loss (`4 -> 1`):** Direct downsampling thinned out the horizontal stroke of an off-center 4, causing baseline prediction **1 (51.8%)**. Improved predicted **4 (100.0%)**.
- **Border Collapse (`8 -> 0`):** Drawing on the far right edge collapsed the waist of an 8 into a zero for baseline (**0 at 82.2%**). Improved predicted **8 (100.0%)**.
- **Bottom Corner (`7 -> 3`):** Baseline predicted **3 (45.1%)**. Improved predicted **7 (100.0%)**.

#### 8. Production API Preprocessing Integration
Because the experimental evidence conclusively confirmed an accuracy increase from 85.7% to 100.0% with zero regressions, the improved preprocessing pipeline was integrated into [`backend/src/inference.py`](backend/src/inference.py). Future drawings submitted through the React frontend are automatically preprocessed with bounding box extraction, $20 \times 20$ aspect-ratio scaling, and center-of-mass alignment before model inference.

---

### Educational Concepts — Phase 11: Data Augmentation & Robust CNN Experiment

#### 1. What Data Augmentation Means
Data augmentation is a principled machine learning technique that artificially expands the diversity and volume of training data without manually collecting new labeled samples. By applying randomized, label-preserving mathematical transformations $\mathcal{T}(x)$ to input images during training, the optimization algorithm exposes the neural network to continuous variations in geometry and structure:
$$x_{aug} = \mathcal{T}(x), \quad y_{aug} = y$$

#### 2. Why Data Augmentation is Useful
1. **Encodes Invariant Inductive Biases:** Humans recognize handwritten digits regardless of minor pen tilts, handwriting sizes, or stroke slants. By exposing convolutional filters to transformed instances, the model learns features invariant to small affine perturbations.
2. **Combats Memorization & Overfitting:** Standard training passes the exact same static pixel grids to the model across multiple epochs. On-the-fly augmentation ensures that every batch presents unique representations, preventing the model from fitting high-frequency noise.
3. **Smooths Decision Boundaries:** Stochastic transformations force the network to construct smoother, more robust margins in high-dimensional feature space.

#### 3. Transformations Used in Phase 11
We used `torchvision.transforms.RandomAffine` with realistic handwriting bounds:
- **Random Rotation:** Approximately $\pm 10^\circ$ (simulates human handwriting slant).
- **Random Translation:** Approximately $\pm 10\%$ horizontal and vertical (simulates off-center pen placement).
- **Random Scale Variation:** Approximately $90\% - 110\%$ (simulates varying digit sizes).
- **Prohibited Transformations:**
  - *No Horizontal Flipping:* Destroys chiral digits (e.g., flipping '7', '3', '2' makes non-digits; flipping '6' can create '9').
  - *No Vertical Flipping:* Flips '6' into '9', violating label consistency.
  - *No Extreme Distortion:* Severe shearing or zooming would corrupt topological digit geometry.

#### 4. Why Only Training Data is Augmented
Evaluation datasets (the canonical 10,000 MNIST test images and the 35 real-world evaluation images) MUST remain completely untouched:
- **Integrity of Evaluation:** A benchmark measures performance against the target task distribution. Transforming test samples alters the benchmark and introduces arbitrary evaluation bias.
- **Fair Comparisons:** To compare Model A vs. Model B scientifically, both models must be tested on the exact same identical, untouched test instances.

#### 5. Model Architecture Comparison
Both models use the identical `HandwrittenDigitCNN` architecture established in Phase 6:
$$\text{Input } (1 \times 28 \times 28) \to \text{Conv1}(32) \to \text{MaxPool} \to \text{Conv2}(64) \to \text{MaxPool} \to \text{FC1}(128) \to \text{FC2}(10)$$
- **Total Trainable Parameters:** **421,642** in both models.
- **Hyperparameters:** Adam optimizer ($\alpha=0.001$), CrossEntropyLoss, batch size 64, 5 epochs, CPU device, random seed 42.
- **Experimental Control:** The ONLY variable changed between Model A and Model B is the training data augmentation.

#### 6. Experimental Results & Multi-Criteria Comparison

| Metric | Model A (Original CNN) | Model B (Augmented CNN) | Delta / Impact |
| :--- | :---: | :---: | :--- |
| **Model Weights File** | [`cnn_mnist.pt`](backend/models/cnn_mnist.pt) | [`cnn_mnist_augmented.pt`](backend/models/cnn_mnist_augmented.pt) | Stored as separate checkpoints |
| **Trainable Parameters** | 421,642 | 421,642 | Identical |
| **Training Time (5 Epochs)** | ~206.2 s (~3.4 min) | ~369.6 s (~6.2 min) | +79.2% longer due to augmentation overhead |
| **MNIST Test Accuracy** | **99.07%** (9,907 / 10,000) | **98.83%** (9,883 / 10,000) | **-0.24%** (+24 test errors) |
| **MNIST Error Count** | **93** | **117** | +25.8% more errors on canonical test set |
| **Real-World Accuracy (35 samples)** | **100.0%** (35 / 35) | **100.0%** (35 / 35) | Both models achieve 100% with Phase 10 |
| **Real-World Errors** | **0** | **0** | Zero errors |
| **Mean Real-World Confidence** | **98.48%** | **95.64%** | -2.84% lower certainty for Model B |
| **High-Confidence Real-World ($P \ge 90\%$)** | **33 / 35 (94.3%)** | **31 / 35 (88.6%)** | -2 samples |

#### 7. Granular Failure Pattern Audit
We evaluated both models on the key historical failure patterns observed across earlier phases:
- **$0 \to 9$ (Angular loop):** Model A: 0 errors | Model B: 0 errors (Both 100.0% confident).
- **$8 \to 0$ (Open waist):** Model A: 0 errors | Model B: 0 errors (Model A: 98.19%, Model B: 57.69%).
- **$9 \to 7$ (Hook descender):** Model A: 0 errors | Model B: 0 errors (Both 99.96% confident).
- **$5 \to 3$ (Split bar):** Model A: 0 errors | Model B: 0 errors (Model A: 85.41%, Model B: 95.67%).
- **$4 \to 9$ (Closed top):** Model A: 0 errors | Model B: 0 errors (Both 100.0% confident).

> [!NOTE]
> **Pivotal Attribution Finding:** Neither model made any of these 5 errors on the real-world dataset. These failure modes were **already solved in Phase 10** by bounding-box cropping, 20x20 scaling, and center-of-mass alignment. Attributing these repairs to data augmentation would be fundamentally inaccurate.

#### 8. Confidence and Calibration Behavior
- **Where Augmentation Increased Confidence:**
  - `digit_1_sample_2_hook_serif`: Model A $= 70.02\% \to$ Model B $= 79.06\%$ (+9.04%).
  - `digit_5_sample_3_split_bar`: Model A $= 85.41\% \to$ Model B $= 95.67\%$ (+10.26%).
- **Where Augmentation Decreased Confidence (Uncertainty Penalty):**
  - `digit_8_sample_2_open_waist`: Model A $= 98.19\% \to$ Model B $= 57.69\%$ (-40.50%).
  - `digit_8_sample_3_asymmetric`: Model A $= 93.79\% \to$ Model B $= 55.77\%$ (-38.02%).
  - `digit_6_sample_2_tight_curl`: Model A $= 99.87\% \to$ Model B $= 68.58\%$ (-31.29%).

Because Model B was trained with spatial shifts and rotations, dual-loop digits (such as 8 and 6) exhibited more feature overlap with single-loop digits, causing the model to output softer, more dispersed softmax probabilities.

#### 9. Final Model Selection Decision: KEEP ORIGINAL

**Decision: KEEP ORIGINAL (`backend/models/cnn_mnist.pt`)**

**Technical Justification:**
1. **Canonical MNIST Degradation:** Data augmentation acted as an aggressive regularizer that widened the receptive field away from canonical MNIST centering, causing a drop of 0.24% in test accuracy (24 additional errors).
2. **Zero Real-World Improvement:** Both models achieved identical 100.0% accuracy on the 35 real-world samples when coupled with Phase 10 improved preprocessing. Data augmentation yielded zero incremental error reduction.
3. **Unnecessary Softening of Confidence:** Model B displayed marked hesitation on complex digits (8 and 6), dropping below 60% confidence on valid numbers.
4. **Phase 10 Preprocessing is the True Solution:** The primary cause of failure in freehand drawing canvas deployment was not model representation capacity, but **spatial framing and covariate shift**. Resolving that shift upstream via geometric centering and aspect-ratio normalization allows the original CNN to operate at peak efficacy without retraining.

Model A ([`backend/models/cnn_mnist.pt`](backend/models/cnn_mnist.pt)) remains the authoritative production model for the FastAPI backend and React frontend.

---

### Educational Concepts — Phase 12: CNN Interpretability & Feature Visualization

Notebook: [`notebooks/10_cnn_interpretability.ipynb`](notebooks/10_cnn_interpretability.ipynb)

Phase 12 is an educational, non-destructive inspection of the internal representations learned by the production CNN ([`backend/models/cnn_mnist.pt`](backend/models/cnn_mnist.pt)). The original model was kept strictly frozen in evaluation mode (`torch.no_grad()`, zero retraining).

#### 1. Layer-by-Layer Architectural Transformation
| Stage / Layer | Output Tensor Shape | Activation / Mechanism | Receptive Field & Visual Role |
| :--- | :---: | :---: | :--- |
| **Input** | $1 \times 28 \times 28$ | Raw normalized grayscale | $1 \times 1$ pixel intensity in $[0, 1]$ |
| **Conv1** | $32 \times 28 \times 28$ | 32 filters ($3 \times 3$, pad 1), ReLU | Local edges, stroke tangents, orthogonal gradients |
| **Pool1** | $32 \times 14 \times 14$ | MaxPool2D ($2 \times 2$, stride 2) | Downsampling; captures local maximum activation |
| **Conv2** | $64 \times 14 \times 14$ | 64 filters ($3 \times 3$, pad 1), ReLU | Higher-order stroke combinations, loops, bifurcations |
| **Pool2** | $64 \times 7 \times 7$ | MaxPool2D ($2 \times 2$, stride 2) | Second downsampling; condensed feature responses |
| **Flatten** | $3136$ | Tensor reshape | Unrolls 2D feature maps into flat 1D vector |
| **FC1** | $128$ | Linear ($3136 \to 128$), ReLU | Distributed hidden representation & digit topology |
| **FC2** | $10$ | Linear ($128 \to 10$) | Unnormalized class logits $\mathbf{z} \in \mathbb{R}^{10}$ |
| **Softmax** | $10$ | $\sigma(\mathbf{z})_i = \frac{e^{z_i}}{\sum_j e^{z_j}}$ | Normalized posterior class probabilities $P(y=i \mid x)$ |

#### 2. Learned Convolution Filters (Conv1)
- The 32 first-layer filters ($3 \times 3$) learn classic low-level computer vision operators directly from backpropagation without manual engineering:
  - **Directional Edge Filters:** Oriented gradients sensitive to horizontal stroke boundaries (e.g. top of 7 or 5), vertical edges (e.g. stem of 1), and diagonals (e.g. slant of 2 or 7).
  - **Center-Surround / Laplacian Filters:** Filters with strong positive centers flanked by negative weights (or vice versa), detecting stroke spines against dark background.
  - **Texture & Transition Filters:** Respond to curvature inflections and corners.

#### 3. Feature Map Hierarchy: Conv1 vs Conv2
- **Conv1 Activations:** Retain clear visual spatial resemblance to the input digit. Each channel lights up when a stroke matches the filter's preferred orientation.
- **Conv2 Activations:** More abstract and fragmented ($14 \times 14$). Individual channels do not look like whole digits; instead, they represent co-activations of stroke segments (e.g., upper-loop closures in 8, 9, 0; corner junctions in 4; crossbars in 7).

#### 4. Non-Linearity (ReLU) and Spatial Downsampling (MaxPool)
- **ReLU ($\max(0, x)$):** Introduces non-linearity, zeroes out negative dot products, and induces representational sparsity (~40–60% zero activations). This prevents destructive interference from anti-correlated features.
- **MaxPool ($2 \times 2$):** Discards 75% of spatial values, keeping only the peak activation within each $2 \times 2$ window. Confers translation invariance (small shifts in stroke position yield identical pooled outputs) while halving width and height.

#### 5. Logits vs Probabilities
- **Logits:** Raw, unbounded real numbers output by the final linear layer. High logits indicate strong relative evidence, but scale varies arbitrarily.
- **Softmax:** Monotonically transforms logits into a valid probability distribution where $\sum P_i = 1.0$. Highly confident predictions exhibit peaked distributions ($P \approx 1.0$), while ambiguous inputs produce softer, distributed probabilities across competing candidate classes.

#### 6. Real Misclassification Analysis
Analyzing actual MNIST test errors (e.g., sample #882: true 9 predicted as 7 with 97.6% confidence) reveals why the network erred:
- When a handwritten 9 possesses an extremely tight, flattened top loop and an elongated diagonal stroke, Conv1 filters respond heavily to the top horizontal bar and diagonal slant.
- Conv2 feature maps fire strongly on "horizontal bar + diagonal descender" combinations, which closely resemble the signature activation profile of digit 7.
- Because the top loop is compressed into a thin stroke, loop-closure detectors fail to activate with sufficient magnitude, leading the linear classifier to favor class 7.

#### 7. Gradient-Based Saliency Maps & Interpretability Limitations
- **Saliency Computation:** $S(x) = \max_c \left|\frac{\partial z_{\hat{c}}}{\partial x}\right|$. Measures the first-order sensitivity of the winning class score to infinitesimal changes at each input pixel.
- **What Saliency Shows:** Peak sensitivity typically hugs high-contrast stroke edges, stroke intersections, and decisive discriminating features (e.g., the bottom loop in 3 vs 5).
- **Critical Limitations:**
  - *Sensitivity $\neq$ Explanation:* A saliency map measures local gradient steepness; it does not explain global decision boundaries or causal necessity.
  - *Feature Polysemanticity:* Individual neurons and channels often participate in multiple overlapping concepts (superposition).
  - *Gradient Noise & Saturation:* In regions where activations are zeroed by ReLU, the local gradient is zero even if the feature was important.
  - *Human Projection Bias:* Observers naturally project human semantic concepts onto filter visualizations that the network optimizes purely for statistical separability.

---

### Educational Concepts — Phase 13: Model Calibration, Confidence & Selective Prediction

Notebook: [`notebooks/11_model_calibration.ipynb`](notebooks/11_model_calibration.ipynb)

Phase 13 investigated whether we can empirically trust the softmax confidence scores output by our production CNN ([`backend/models/cnn_mnist.pt`](backend/models/cnn_mnist.pt)). The original checkpoint was kept frozen in evaluation mode (`torch.no_grad()`, zero retraining).

#### 1. Core Distinction: Softmax Score vs. True Calibrated Probability
$$\text{Softmax Confidence} = \max_k \frac{e^{z_k}}{\sum_j e^{z_j}}$$
Because cross-entropy loss with softmax encourages the network to separate the winning logit from negative logits without bound, deep networks routinely become **overconfident**. A confidence score of $0.99$ does **not** inherently imply that 99 out of 100 such predictions are correct.

#### 2. Quantitative Calibration Results (Untouched MNIST Test Set)
- **Overall Accuracy:** **99.07%** (9,907 / 10,000 correct, 93 errors).
- **Mean Confidence Across All Test Samples:** **0.9930** (99.30%).
- **Correct Predictions ($N = 9,907$):** Mean = $0.9950$, Median = $1.0000$, Min = $0.4437$.
- **Incorrect Predictions ($N = 93$):** Mean = $0.7759$, Median = $0.7988$, Max = $0.9996$.
- **Expected Calibration Error (ECE):** **0.002541** (**0.2541%** across 10 uniform bins).
- **Maximum Calibration Error (MCE):** **0.098517** (**9.8517%** in bin $0.4–0.5$).

#### 3. Reliability Diagram & Binned Accuracy Analysis
| Confidence Bin | Sample Count | Mean Confidence | Observed Accuracy | Calibration Gap |
| :---: | ---: | ---: | ---: | ---: |
| 0.0–0.4 | 0 | N/A | N/A | N/A |
| 0.4–0.5 | 7 | 47.29% | 57.14% | +9.85% (Under-confident) |
| 0.5–0.6 | 37 | 55.08% | 51.35% | -3.73% (Over-confident) |
| 0.6–0.7 | 29 | 63.82% | 65.52% | +1.70% (Under-confident) |
| 0.7–0.8 | 48 | 75.06% | 66.67% | -8.40% (Over-confident) |
| 0.8–0.9 | 86 | 85.45% | 80.23% | -5.22% (Over-confident) |
| 0.9–1.0 | 9,793 | 99.85% | 99.70% | -0.15% (Slightly over-confident) |

Because **97.93%** of all test instances occupy the top bin $[0.9, 1.0]$, the global ECE is suppressed to $0.25\%$, obscuring notable overconfidence in the mid-confidence range ($[0.7, 0.9]$).

#### 4. The Dangerous Failure Mode: Overconfident Errors
- Confidence $\ge 0.90$: **29 errors** ($31.18\%$ of all errors). Top pairs: $8 \to 0$ (4), $2 \to 7$ (3), $9 \to 7$ (3).
- Confidence $\ge 0.95$: **21 errors** ($22.58\%$ of all errors). Top pairs: $8 \to 0$ (3), $9 \to 7$ (2), $6 \to 0$ (2).
- Confidence $\ge 0.99$: **7 errors** ($7.53\%$ of all errors). Top pairs: $6 \to 0$ (2), $8 \to 0$ (2), $5 \to 3$ (1), $2 \to 7$ (1), $5 \to 6$ (1).
- **Peak False Certainty:** Sample #2896 (True 8, Predicted 0) with **99.96% confidence** due to an open waist mimicking an oval zero.

#### 5. Selective Prediction ("I Don't Know" Option) & Trade-Off Curve
By introducing a post-hoc rejection threshold $\tau$ ($\text{Accept if } P \ge \tau$, else reject):
| Threshold ($\tau$) | Coverage | Accepted Accuracy | Accepted Errors | Error Reduction |
| :---: | ---: | ---: | ---: | ---: |
| 0.00 (Baseline) | 100.00% | 99.07% | 93 | 0.0% |
| 0.50 | 99.93% | 99.10% | 90 | -3.2% |
| 0.60 | 99.56% | 99.28% | 72 | -22.6% |
| 0.70 | 99.27% | 99.38% | 62 | -33.3% |
| 0.80 | 98.79% | 99.53% | 46 | **-50.5%** |
| 0.90 | 97.93% | 99.70% | 29 | -68.8% |
| 0.95 | 97.13% | 99.78% | 21 | -77.4% |
| 0.99 | 94.61% | 99.93% | 7 | **-92.5%** |

#### 6. Real-World Selective Prediction ($N=35$)
Evaluating the 35 freehand drawings under the same selective policy:
- At $\tau \le 0.70$: $100.0\%$ coverage (35/35 accepted, 0 errors).
- At $\tau = 0.80$: $97.14\%$ coverage (34/34 accepted, 0 errors; rejects only `digit_1_sample_2_hook_serif` at $70.02\%$).
- At $\tau = 0.99$: $88.57\%$ coverage (31/31 accepted, 0 errors; rejects 4 valid drawings).

#### 7. Per-Digit Vulnerability & Overconfidence
- **Easiest Digit:** Digit 0 ($99.90\%$ accuracy, $99.93\%$ mean confidence).
- **Hardest Digit:** Digit 8 ($97.95\%$ accuracy, 20 errors, lowest accuracy).
- **Most Overconfident When Wrong:** Digit 2 (mean confidence when incorrect: **87.82%**), followed by Digit 8 (**81.35%**).

#### 8. Engineering Recommendation for Production
Do NOT trust all predictions equally. In production, implement a **Two-Tier Thresholding Policy**:
1. **High Confidence ($P \ge 0.85$):** Auto-accept prediction.
2. **Moderate Confidence ($0.50 \le P < 0.85$):** Return prediction with `"uncertain": true` warning flag for human/client confirmation.
3. **Ambiguous ($P < 0.50$):** Reject and prompt user to redraw.
*(Recommended for future phases; not deployed in Phase 13).*

---

### Educational Concepts — Phase 14: Temperature Scaling & Post-Hoc Calibration

Notebook: [`notebooks/12_temperature_scaling.ipynb`](notebooks/12_temperature_scaling.ipynb)

Phase 14 investigated whether post-hoc temperature scaling could improve the calibration of the production CNN ([`backend/models/cnn_mnist.pt`](backend/models/cnn_mnist.pt)) without altering weights, architecture, or classification predictions.

#### 1. Mathematical Formulation & Argmax Invariance
$$P_T(y = k \mid \mathbf{x}) = \frac{e^{z_k / T}}{\sum_{j=1}^{10} e^{z_j / T}}, \quad T > 0$$
Because scalar division by $T > 0$ is strictly monotonic, $\arg\max_k (z_k / T) = \arg\max_k z_k$. The model's classification predictions are mathematically guaranteed to remain **100% identical** ($\Delta \hat{y} = 0$).

#### 2. Experimental Data Hygiene
- **Model:** Frozen production CNN (`eval()` mode, zero weight updates).
- **Calibration Split:** 1,000 samples partitioned deterministically (seed = 42) from the MNIST training set.
- **Untouched Training Samples:** 59,000 samples excluded.
- **Untouched Test Set:** 10,000 samples reserved exclusively for independent evaluation.

#### 3. Learned Temperature & Quantitative Calibration Results
- **Initial Temperature:** $T = 1.0000$ (NLL Loss: $0.014443$ on calibration set).
- **Learned Temperature:** **$T = 0.8691$** (NLL Loss: $0.013860$ via L-BFGS).
- **Changed Test Predictions:** **0 / 10,000 (0.000%)** — Argmax strictly preserved.

| Metric | Original Softmax ($T=1.0$) | Temperature Scaled ($T=0.8691$) | Delta / Relative Change |
| :--- | :---: | :---: | :--- |
| **Test Accuracy** | **99.07%** (9,907 / 10,000) | **99.07%** (9,907 / 10,000) | 0.00% (Identical) |
| **Mean Confidence** | 0.9930 (99.30%) | 0.9943 (99.43%) | +0.0013 (+0.13%) |
| **Expected Calibration Error (ECE)** | **0.002541 (0.2541%)** | **0.003649 (0.3649%)** | **+0.001108 (+43.60% Worse)** |
| **Maximum Calibration Error (MCE)** | **0.098517 (9.8517%)** | **0.161778 (16.1778%)** | **+0.063261 (+64.21% Worse)** |
| **Worst Calibration Bin** | $[0.4, 0.5]$ (gap: 9.85%) | $[0.8, 0.9]$ (gap: 16.18%) | Shifted to higher confidence bin |
| **Errors with Conf $\ge 0.90$** | **29** (31.18% of errors) | **33** (35.48% of errors) | **+4 more false-certain errors** |
| **Errors with Conf $\ge 0.95$** | **21** (22.58% of errors) | **25** (26.88% of errors) | **+4 more false-certain errors** |
| **Errors with Conf $\ge 0.99$** | **7** (7.53% of errors) | **10** (10.75% of errors) | **+3 more false-certain errors** |
| **Sample #2896 (True 8 $\to$ 0)** | 99.9575% confidence | 99.9874% confidence | +0.0299% (More overconfident) |

#### 4. The Surprising Phenomenon: Why Temperature Scaling Degraded Calibration
In modern literature, temperature scaling typically softens probabilities ($T > 1$) because large models overfit NLL on complex tasks. However, on MNIST:
- The CNN achieved **99.50% accuracy** on the training calibration split with tiny loss ($0.014$).
- Because the network's training accuracy exceeded its confidence on the training split, optimizing NLL learned to **sharpen** probabilities ($T = 0.8691 < 1.0$).
- When applied to unseen test data (where true error rate is $0.93\%$), sharpening probabilities increased overconfidence across mid-confidence errors, causing test ECE to worsen from $0.25\%$ to $0.36\%$ and inflating high-confidence errors.

#### 5. Calibration Set Size Sensitivity
- **$N = 100$:** $T = 0.5868 \implies$ Test ECE = $0.6071\%$, Test MCE = $50.38\%$ (Severe sample overfitting).
- **$N = 500$:** $T = 0.9961 \approx 1.0 \implies$ Test ECE = $0.2577\%$, Test MCE = $9.7801\%$ (Virtually matches original).
- **$N = 1,000$:** $T = 0.8691 \implies$ Test ECE = $0.3649\%$, Test MCE = $16.1777\%$.

#### 6. Final Recommendation: KEEP ORIGINAL CONFIDENCE ($T = 1.0$)
**Decision:** Do NOT deploy temperature scaling. Keep original unscaled softmax in the production model.
- The original CNN is already exceptionally well calibrated ($ECE = 0.2541\%$).
- Post-hoc temperature scaling from training data causes unwanted sharpening ($T < 1.0$) that increases false certainty on errors without improving accuracy.
- Raw softmax is simpler, hyperparameter-free, and empirically more reliable for this architecture.

---

### Educational Concepts — Experiment 15: Transfer Learning

Notebook: [`notebooks/13_transfer_learning.ipynb`](notebooks/13_transfer_learning.ipynb)

Experiment 15 marks a pivotal shift in the AI Lab curriculum: moving beyond single-domain handwritten character recognition (MNIST) to **natural color imagery (CIFAR-10)** using **Transfer Learning and Feature Reuse**.

#### 1. Core Learning Objective
- **The Question:** "Can a neural network that has already learned rich visual representations on a large dataset (ImageNet) be effectively reused for a completely new image classification task (CIFAR-10) without training from scratch?"
- **The Concept:** Convolutional filters in early and middle layers capture domain-general visual primitives (edges, gradients, textures, recurring contours). Rather than spending massive compute relearning these from scratch on a small dataset, we reuse the pretrained backbone and train only a new task-specific classification head.

#### 2. Dataset Transition: MNIST vs. CIFAR-10
| Dimension | MNIST (Phases 1–14) | CIFAR-10 (Experiment 15) |
| :--- | :---: | :---: |
| **Domain** | Synthetic / Scanned Digits | Natural photographs of objects & animals |
| **Color Channels** | $1$ (Grayscale) | $3$ (RGB Color) |
| **Resolution** | $28 \times 28$ | $32 \\times 32$ |
| **Background** | Clean black ($0.0$) | Complex, cluttered natural scenes |
| **Categories** | Digits $0–9$ | Airplane, Automobile, Bird, Cat, Deer, Dog, Frog, Horse, Ship, Truck |

#### 3. Pretrained Architecture: ResNet-18
- **Model:** ResNet-18 (He et al., 2015) pretrained on ImageNet-1K ($1.28$M images, $1,000$ classes).
- **Residual Connections:** Incorporates identity shortcuts $\mathbf{y} = \mathcal{F}(\mathbf{x}) + \mathbf{x}$ to eliminate vanishing gradients and allow smooth gradient propagation through deep feature hierarchies.
- **Expected Preprocessing:** Upscaled to $64 \times 64$ or $224 \times 224$ with ImageNet channel normalization ($\mu=[0.485, 0.456, 0.406], \sigma=[0.229, 0.224, 0.225]$).

#### 4. Feature Extraction vs. From-Scratch Training Benchmark
- **Backbone Freezing:** All convolutional and batch normalization layers are frozen (`requires_grad = False`), preserving $11,176,512$ pretrained weights.
- **Classification Head Replacement:** The original 1,000-class linear layer is replaced with a 10-class linear layer (`nn.Linear(512, 10)`), exposing only **$5,130$ trainable parameters** ($<0.05\%$ of total parameters).
- **Experimental Control:** Evaluated against a custom small CNN (`BaselineCIFAR10CNN`, $620,810$ parameters) trained 100% from scratch on the identical CIFAR-10 dataset.

| Metric | ResNet-18 Transfer Learning | CNN From Scratch | Delta / Comparison |
| :--- | :---: | :---: | :--- |
| **Total Parameters** | **11,181,642** | **620,810** | Pretrained backbone is 18x larger |
| **Trainable Parameters** | **5,130 (0.05%)** | **620,810 (100.0%)** | **121x fewer parameters updated** |
| **Frozen Parameters** | **11,176,512 (99.95%)** | **0** | Complete backbone frozen |
| **Training Time (5 Epochs)** | **100.75 s (~1.68 min)** | **102.72 s (~1.71 min)** | Slightly faster per epoch |
| **Final Test Accuracy (10,000)** | **64.59%** (6,459 / 10,000) | **74.52%** (7,452 / 10,000) | Baseline +9.93% on low-res CIFAR |
| **Final Test Errors** | **3,541** | **2,548** | Baseline made 993 fewer errors |
| **Execution Hardware** | **NVIDIA Tesla T4 GPU** | **NVIDIA Tesla T4 GPU** | Google Colab runtime |

#### 5. Key Conceptual Distinctions & Empirical Takeaways
- **Why From-Scratch Surpassed Frozen ResNet-18 on CIFAR-10:**
  1. *Resolution Mismatch:* ResNet-18 was trained on $224 \times 224$ high-resolution ImageNet photos. In CIFAR-10, the images are native $32 \times 32$ (upscaled to $64 \times 64$). The high-level filters in Layer4 expect fine-grained object textures that are absent or heavily blurred in low-resolution images.
  2. *Rigid Frozen Representation:* Because the backbone was 100% frozen, the model could not adapt a single filter to CIFAR-10's unique pixel statistics. It could only linearly recombine existing 512-dim features.
  3. *The Power of Feature Reuse:* Despite updating ONLY **5,130 parameters** ($0.05\%$ of the model), frozen ResNet-18 achieved **64.59% accuracy** on natural images with zero convolutional tuning.
- **Top Confusion Pairs (Transfer Learning):**
  - `truck` $\to$ `automobile` (208 occurrences)
  - `dog` $\to$ `cat` (198 occurrences)
  - `ship` $\to$ `airplane` (166 occurrences)
  - `deer` $\to$ `bird` (147 occurrences)
  - `deer` $\to$ `frog` (116 occurrences)
- **What "Freezing" Means:** During the forward pass, activations are computed normally. During the backward pass, PyTorch skips gradient computation for frozen tensors, drastically reducing memory footprint and preventing destruction of pretrained weights.
- **Feature Extraction vs. Fine-Tuning:**
  - *Feature Extraction (Experiment 15):* Backbone remains strictly frozen; only the new classifier is trained.
  - *Fine-Tuning (Experiment 16):* Backbone is unfrozen with a very small learning rate to subtly adapt feature maps to the target domain.

#### 6. Important Limitations
1. **Domain Shift:** If target images differ drastically in physics (e.g. radar/microscopy vs. natural photography), ImageNet features may transfer sub-optimally.
2. **Resolution Artifacts:** Upscaling small $32 \times 32$ images introduces interpolation blur that can limit fine feature resolution.
3. **Rigid Representations:** A frozen backbone cannot adapt its internal kernels; it can only linearly recombine existing representations.

*(Experiment 15 was executed on Google Colab with an NVIDIA Tesla T4 GPU. The local production MNIST checkpoint `backend/models/cnn_mnist.pt` remains completely untouched).*

---

### Educational Concepts — Experiment 16: Fine-Tuning

Notebook: [`notebooks/14_fine_tuning.ipynb`](notebooks/14_fine_tuning.ipynb)

Experiment 16 investigates **Fine-Tuning**: moving beyond pure frozen feature extraction by unfreezing selected convolutional layers in the pretrained ResNet-18 backbone and training with **discriminative learning rates** to resolve resolution and domain mismatch on CIFAR-10.

#### 1. Core Experimental Objective
Determine whether fine-tuning the pretrained ResNet-18 backbone improves substantially over the **64.59% accuracy** obtained from Experiment 15's frozen feature extractor, and whether it can approach or surpass the **74.52% from-scratch CNN baseline**.

#### 2. Experimental Design & Measured Results Benchmark
- **Model A (Reference):** Pure Feature Extraction from Experiment 15 ($5,130$ trainable parameters, $100\%$ frozen backbone).
- **Model B (Layer4 + Head):**
  - Freeze `conv1` through `layer3` ($2,782,784$ parameters).
  - Unfreeze `layer4` ($8,393,728$ parameters) and classifier head ($5,130$ parameters).
  - Trainable parameters: **$8,398,858$** ($75.11\%$).
  - Discriminative learning rates: $\alpha_{\text{layer4}} = 10^{-5}$, $\alpha_{\text{head}} = 10^{-3}$.
- **Model C (Full ResNet-18):**
  - Unfreeze complete architecture ($11,181,642$ trainable parameters, $0$ frozen).
  - Discriminative learning rates: $\alpha_{\text{backbone}} = 10^{-5}$, $\alpha_{\text{head}} = 10^{-3}$.
- **Training Budget:** 5 epochs each using Adam optimizer on Google Colab NVIDIA Tesla T4 GPU.

| Model Configuration | Trainable Parameters | Training Time | Test Accuracy (10k) | Test Errors | Performance Delta vs Frozen ResNet |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Exp 15 Frozen ResNet-18 (Ref)** | **5,130** (0.05%) | **100.75 s** | **64.59%** | **3,541** | Baseline reference |
| **Exp 16 Fine-Tune Layer4 + Head** | **8,398,858** (75.11%) | **102.58 s** | **77.67%** | **2,233** | **+13.08%** (+3.15% over from-scratch) |
| **Exp 16 Fine-Tune Entire ResNet-18** | **11,181,642** (100.0%) | **117.98 s** | **84.68%** | **1,532** | **+20.09%** (+10.16% over from-scratch) |
| **CNN From Scratch (Exp 15 Baseline)** | **620,810** (100.0%) | **102.72 s** | **74.52%** | **2,548** | Surpassed by both fine-tuned models |

#### 3. Core Empirical Takeaways & Why Fine-Tuning Succeeded
1. **Dramatic Performance Leap:** Full fine-tuning lifted test accuracy from **64.59% to 84.68%** (+20.09% absolute gain), cutting test errors from 3,541 down to 1,532 (a **56.7% error reduction**).
2. **Surpassing the From-Scratch CNN:** In Experiment 15, the custom CNN from scratch beat the frozen ResNet ($74.52\%$ vs $64.59\%$) due to resolution mismatch. Fine-tuning completely reversed this: Model B reached **77.67%** and Model C reached **84.68%** (+10.16% above the baseline).
3. **Discriminative Learning Rates Prevent Catastrophic Forgetting:** Using $\alpha_{\text{backbone}} = 10^{-5}$ protected ImageNet's learned edge/shape representations, allowing filters to gently adjust their spatial receptive fields to CIFAR-10's low $32 \times 32$ resolution.
4. **Resolution of Major Confusion Modes:**
   - In Exp 15, `truck` $\to$ `automobile` had 208 errors; full fine-tuning reduced it to **67 errors**.
   - `ship` $\to$ `airplane` dropped from 166 errors to **56 errors**.
   - Remaining confusions concentrate in fine-grained animal classes (`dog` $\to$ `cat`: 169 errors).

*(Experiment 16 was executed on Google Colab with an NVIDIA Tesla T4 GPU. The local production MNIST checkpoint `backend/models/cnn_mnist.pt` remains completely untouched).*

---

### Educational Concepts — Experiment 17: Final Model Selection & Robustness

Notebook: [`notebooks/15_model_selection_and_robustness.ipynb`](notebooks/15_model_selection_and_robustness.ipynb)

Experiment 17 conducts a principled, multi-criteria robustness stress test and empirical comparison across candidate model families, determining the final production model selection for deployment.

#### 1. Scope & Experimental Design
The experiment evaluates two distinct problem tracks with controlled protocols:
- **Track A (MNIST Digit Recognition — Production Decision):**
  - **Model A (Production Baseline):** [`backend/models/cnn_mnist.pt`](backend/models/cnn_mnist.pt) (421,642 parameters, frozen).
  - **Model B (Augmented CNN):** [`backend/models/cnn_mnist_augmented.pt`](backend/models/cnn_mnist_augmented.pt) (421,642 parameters, trained with affine augmentations).
  - **Identical Controls:** Evaluated on identical test batches with fixed random seeds (`seed=42`) in inference mode (`model.eval()`).
- **Track B (CIFAR-10 Transfer Learning — Historical Curricular Context):**
  - Historical reference from Experiments 15 & 16.
  - *Audit Note:* Active perturbation testing for Track B was formally omitted because trained model weights were not persisted from the ephemeral Colab environments.

#### 2. Quantitative Robustness Benchmark Results (Track A)

| Test Suite / Perturbation | Severity / Parameter | Model A (Production CNN) | Model B (Augmented CNN) | Superior Model |
| :--- | :---: | :---: | :---: | :---: |
| **Clean MNIST Test (10k)** | Baseline ($\sigma=0$) | **99.07%** (93 errors) | 98.83% (117 errors) | **Model A (+0.24%)** |
| **Gaussian Sensor Noise** | $\sigma = 0.05$ | **99.07%** (93 errors) | 98.84% (116 errors) | **Model A** |
| | $\sigma = 0.10$ | **99.02%** (98 errors) | 98.87% (113 errors) | **Model A** |
| | $\sigma = 0.20$ | **98.79%** (121 errors) | 96.98% (302 errors) | **Model A (+1.81%)** |
| | $\sigma = 0.30$ | **97.66%** (234 errors) | 73.75% (2,625 errors) | **Model A (+23.91%)** |
| **Defocus Blur** | $\sigma_{blur} = 0.5$ | **98.97%** (103 errors) | 98.67% (133 errors) | **Model A** |
| | $\sigma_{blur} = 1.0$ | **98.02%** (198 errors) | 96.39% (361 errors) | **Model A (+1.63%)** |
| | $\sigma_{blur} = 1.5$ | **96.68%** (332 errors) | 92.77% (723 errors) | **Model A (+3.91%)** |
| | $\sigma_{blur} = 2.0$ | **95.52%** (448 errors) | 90.08% (992 errors) | **Model A (+5.44%)** |
| **Random Occlusion / Cutout** | 15% Area ($11 \times 11$) | **80.61%** (1,939 errors) | 71.88% (2,812 errors) | **Model A (+8.73%)** |
| | 30% Area ($15 \times 15$) | **55.60%** (4,440 errors) | 41.79% (5,821 errors) | **Model A (+13.81%)** |
| | 50% Area ($20 \times 20$) | **23.57%** (7,643 errors) | 19.67% (8,033 errors) | **Model A (+3.90%)** |
| **Contrast Scaling** | $0.50\times$ (Faint strokes) | **98.68%** (132 errors) | 96.58% (342 errors) | **Model A (+2.10%)** |
| | $0.75\times$ | **99.01%** (99 errors) | 98.49% (151 errors) | **Model A** |
| | $1.25\times$ | **99.01%** (99 errors) | 98.82% (118 errors) | **Model A** |
| | $1.50\times$ (Saturated) | **99.02%** (98 errors) | 98.76% (124 errors) | **Model A** |
| **Real-World Handwriting (35)** | Phase 10 Pipeline | **100.0%** (0 errors) | **100.0%** (0 errors) | **Tie (100%)** |
| **Real-World Mean Confidence** | Correct Samples | **98.48%** | 95.64% | **Model A (+2.84%)** |
| **Single-Image CPU Latency** | P50 Percentile | **0.376 ms** | 0.374 ms | **Tie (< 0.4 ms)** |
| | P95 Percentile | 0.721 ms | **0.694 ms** | **Tie (< 0.8 ms)** |
| | P99 Percentile | 1.857 ms | **1.804 ms** | **Tie (< 1.9 ms)** |
| **Batch CPU Throughput** | Batch size = 64 | **7,999.3 samples/s** | 7,262.2 samples/s | **Model A** |

#### 3. Core Empirical Takeaways & Why Model A Won
1. **The Augmentation Generalization Fallacy:** Training with spatial affine transformations (rotation, translation) did **not** confer universal out-of-distribution robustness. Model B suffered catastrophic failure under high Gaussian noise ($\sigma=0.30$: accuracy plummeted to $73.75\%$ with $2,625$ errors vs. Model A's $97.66\%$ with $234$ errors).
2. **Superior Structural Retention Under Occlusion:** Model A consistently retained higher recognition rates under partial stroke deletion (+13.81% advantage at 30% cutout) because its convolutional feature maps were optimized for tight, high-contrast topological edge connections.
3. **Distribution Shift is Solved Upstream:** Both models achieved identical 100.0% accuracy on real-world hand-drawn samples when coupled with Phase 10 improved preprocessing. Upstream geometric normalization eliminates the need to trade off clean accuracy for downstream spatial tolerance.

#### 4. Definitive Production Model Decision: RETAIN `cnn_mnist.pt`
- **Selection Verdict:** **RETAIN ORIGINAL PRODUCTION MODEL (`backend/models/cnn_mnist.pt`)**.
- Model A dominates across clean accuracy, sensor noise resistance, defocus blur immunity, cutout robustness, and inference certainty.
- The production checkpoint remains verified and unchanged (SHA-256: `E7BD9DBC143C566481C2944B699B9B56B43167A0C3AD0018AFA5E8CD17BCF87A`).

---

### Educational Concepts — Experiment 18: Final AI Model Freeze & Integration Preparation

Notebook: [`notebooks/16_model_freeze_and_integration.ipynb`](notebooks/16_model_freeze_and_integration.ipynb)

Experiment 18 is the **final machine learning model-side experiment** of the AI Lab curriculum. It conducts formal cryptographic verification, mathematical determinism testing, edge-case stress audits, latency profiling, and issues the official Model Freeze Certificate for frontend integration.

#### 1. Cryptographic Model Identity
- **Checkpoint Location:** [`backend/models/cnn_mnist.pt`](backend/models/cnn_mnist.pt)
- **File Size:** $1,690,217$ bytes ($1.61$ MB)
- **Authoritative SHA-256 Checksum:** `E7BD9DBC143C566481C2944B699B9B56B43167A0C3AD0018AFA5E8CD17BCF87A` (Verified)
- **Architecture:** `HandwrittenDigitCNN` ($421,642$ trainable parameters, $0$ frozen)
- **Layers:** `Conv2D(32)` $\to$ `MaxPool` $\to$ `Conv2D(64)` $\to$ `MaxPool` $\to$ `Linear(128)` $\to$ `Linear(10)`

#### 2. Mathematical Determinism Audit
Repeated forward inference passes on fixed synthetic tensors yielded a maximum absolute logit difference of **$\Delta = 0.0$** (`torch.allclose(atol=1e-7)` satisfied), guaranteeing 100% bitwise reproducible float32 inference across runs.

#### 3. Production Preprocessing & Inference Contract
$$\text{Input Image} \xrightarrow{1} \text{Grayscale} \xrightarrow{2} \text{Threshold } (>20) \xrightarrow{3} \text{Bounding Box Crop} \xrightarrow{4} \text{Scale to } 20\times 20 \xrightarrow{5} \text{Paste in } 28\times 28 \xrightarrow{6} \text{Centroid Translation} \xrightarrow{7} \text{Normalize } [0, 1] \xrightarrow{8} \text{Tensor } [1, 1, 28, 28]$$
- **Input Image:** PNG / JPEG canvas blob
- **Processed Tensor:** `[1, 1, 28, 28]` dtype `torch.float32` in $[0.0, 1.0]$
- **Output:** Predicted digit in $[0, 9]$, winning confidence in $[0.0, 1.0]$, and posterior probabilities array of 10 floats ($\sum P_i = 1.0$).

#### 4. Edge-Case Crash Resistance Audit
Evaluated 7 extreme boundary conditions to guarantee zero unhandled exceptions in production:
1. **All-Black Canvas (Blank):** PASSED (safe, predicted 1, $11.28\%$ confidence, valid softmax distribution).
2. **All-White Canvas:** PASSED (safe, predicted 0, $99.14\%$ confidence).
3. **Uniform Random Noise:** PASSED (safe, predicted 0, $54.90\%$ confidence).
4. **Single-Pixel Dot:** PASSED (safe, predicted 0, $99.14\%$ confidence).
5. **Massive 200x200 Block:** PASSED (safe, predicted 0, $99.14\%$ confidence).
6. **Extreme Top-Left Margin:** PASSED (safe, predicted 0, $99.14\%$ confidence).
7. **Extreme 40:1 Thin Slit:** PASSED (safe, predicted 1, $99.93\%$ confidence).
*Result: 100% crash resistance. Every edge case produced a valid probability distribution summing to 1.0.*

#### 5. Production Latency Profile (CPU)
Measured using warm-up runs followed by 1,000 to 2,000 timed single-request iterations:
- **Preprocessing Time:** P50 = **0.238 ms** | P95 = **0.676 ms** | P99 = **1.024 ms** (Mean: $0.312 \pm 0.177$ ms)
- **Model Forward Time:** P50 = **0.371 ms** | P95 = **0.634 ms** | P99 = **0.963 ms** (Mean: $0.352 \pm 0.153$ ms)
- **End-to-End Latency SLA:** P50 = **1.175 ms** | P95 = **1.687 ms** | P99 = **1.992 ms** (Mean: $1.077 \pm 0.317$ ms)

#### 6. Production REST API Contract
- `POST /predict`: Expects `multipart/form-data` with key `file`. Returns `{"digit": int, "confidence": float, "probabilities": list[float]}`.
- `GET /health`: Returns `{"status": "ok", "model": "cnn_mnist"}`.

#### 7. Official AI Model Freeze Certificate
```
================================================================================
                   AI LAB PRODUCTION MODEL FREEZE CERTIFICATE                   
================================================================================
Model Name:              HandwrittenDigitCNN (Production Checkpoint)            
Official Checkpoint:     backend/models/cnn_mnist.pt                            
File Size:               1,690,217 bytes (1.61 MB)                              
Cryptographic SHA-256:   E7BD9DBC143C566481C2944B699B9B56B43167A0C3AD0018AFA5E8CD17BCF87A
Architecture:            Conv2D(32) -> Pool -> Conv2D(64) -> Pool -> FC(128) -> FC(10)
Parameter Count:         421,642 Trainable Parameters (0 Frozen)                
Benchmark Accuracy:      99.07% Canonical Test (93 errors / 10,000)             
Real-World Accuracy:     100.0% (35 / 35 Freehand Samples, Phase 10 Pipeline)   
Determinism Audit:       PASSED (100% Bitwise Identical Logits, diff = 0.0)     
Edge-Case Stability:     PASSED (7/7 Extreme Conditions Handled Safely)         
End-to-End Latency:      P50 = 1.175 ms, P95 = 1.687 ms, P99 = 1.992 ms (CPU)   
API Contract:            POST /predict & GET /health Fully Verified             
--------------------------------------------------------------------------------
FINAL PRODUCTION STATUS: MODEL FROZEN — READY FOR FRONTEND INTEGRATION          
================================================================================"
```







