// Experiment 15 — Final Model Selection & Robustness
// Source of Truth: notebooks/15_model_selection_and_robustness.ipynb and README.md

export const experiment15 = {
  "id": "15",
  "number": "15",
  "title": "Final Model Selection & Robustness",
  "notebook": "15_model_selection_and_robustness.ipynb",
  "category": "Transfer Learning & Freeze",
  "badge": "Robustness Benchmark",
  "objective": "Conduct comprehensive stress tests across corruptions (Gaussian noise, defocus blur, cutout, contrast) comparing cnn_mnist.pt vs cnn_mnist_augmented.pt.",
  "question": "Does data augmentation convey general out-of-distribution robustness, and which model is superior for production?",
  "dataset": {
    "name": "MNIST Test Set (10,000) under Perturbations + Real-World (35)",
    "samples": "10,000 Perturbed Test Samples per Condition",
    "resolution": "28 \u00d7 28",
    "classes": "10 Digits"
  },
  "method": "Inference stress testing under controlled corruptions with fixed random seeds (seed=42) on CPU",
  "architecture": "HandwrittenDigitCNN (Model A vs Model B)",
  "parameters": {
    "total": "421,642 (Both models)",
    "trainable": "0 (Inference-only)",
    "frozen": "421,642"
  },
  "hyperparameters": {
    "noise_sigmas": "0.05, 0.10, 0.20, 0.30",
    "blur_sigmas": "0.5, 1.0, 1.5, 2.0",
    "cutout_pcts": "15%, 30%, 50%",
    "contrast_scales": "0.50x, 0.75x, 1.25x, 1.50x"
  },
  "metrics": {
    "clean_accuracy": "Model A: 99.07% vs Model B: 98.83%",
    "noise_0_30_acc": "Model A: 97.66% vs Model B: 73.75%",
    "blur_2_0_acc": "Model A: 95.52% vs Model B: 90.08%",
    "cutout_30_acc": "Model A: 55.60% vs Model B: 41.79%",
    "real_world_acc": "Both Models: 100.0% (35/35)",
    "cpu_latency_p50": "Model A: 0.376 ms vs Model B: 0.374 ms"
  },
  "comparisonTable": [
    {
      "condition": "Clean MNIST (10k)",
      "model_a": "99.07% (93 err)",
      "model_b": "98.83% (117 err)",
      "superior": "Model A"
    },
    {
      "condition": "Gaussian Noise (sigma=0.30)",
      "model_a": "97.66% (234 err)",
      "model_b": "73.75% (2,625 err)",
      "superior": "Model A (+23.9%)"
    },
    {
      "condition": "Defocus Blur (sigma=2.0)",
      "model_a": "95.52% (448 err)",
      "model_b": "90.08% (992 err)",
      "superior": "Model A (+5.4%)"
    },
    {
      "condition": "Cutout / Occlusion (30%)",
      "model_a": "55.60% (4,440 err)",
      "model_b": "41.79% (5,821 err)",
      "superior": "Model A (+13.8%)"
    },
    {
      "condition": "Contrast Scaling (0.50x)",
      "model_a": "98.68% (132 err)",
      "model_b": "96.58% (342 err)",
      "superior": "Model A (+2.1%)"
    },
    {
      "condition": "Real-World Handwriting (35)",
      "model_a": "100.0% (0 err)",
      "model_b": "100.0% (0 err)",
      "superior": "Tie (100%)"
    },
    {
      "condition": "Real-World Mean Confidence",
      "model_a": "98.48%",
      "model_b": "95.64%",
      "superior": "Model A (+2.8%)"
    }
  ],
  "keyObservations": [
    "Data augmentation did NOT confer universal robustness: Model B collapsed under heavy noise (73.75% vs 97.66%).",
    "Model A demonstrated significantly higher structural retention under occlusion (+13.81% advantage at 30% cutout).",
    "Decision: RETAIN ORIGINAL PRODUCTION CHECKPOINT (cnn_mnist.pt)."
  ],
  "whatChanged": "Conducted multi-criteria robustness testing comparing both physical model checkpoints.",
  "whatWeLearned": "Data augmentation can soften decision boundaries across spatial shifts, leaving the model vulnerable to high-frequency sensor noise and missing strokes."
};
