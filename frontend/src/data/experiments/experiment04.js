// Experiment 04 — Multinomial Logistic Regression
// Source of Truth: notebooks/04_logistic_regression.ipynb and README.md

export const experiment04 = {
  "id": "04",
  "number": "04",
  "title": "Multinomial Logistic Regression",
  "notebook": "04_logistic_regression.ipynb",
  "category": "Classical Machine Learning",
  "badge": "Linear Model",
  "objective": "Implement the simplest parametric model: Softmax regression on raw pixels to benchmark linear separability.",
  "question": "Can linear decision boundaries in 784 dimensions separate the 10 handwritten digit classes effectively?",
  "dataset": {
    "name": "MNIST (Canonical)",
    "samples": "60,000 Train / 10,000 Test",
    "resolution": "28 \u00d7 28 Flattened to 784-dim",
    "classes": "10 Digits (0\u20139)"
  },
  "method": "Multinomial Logistic Regression (Softmax, Cross-Entropy Loss, L-BFGS Solver)",
  "architecture": "Single Linear Layer: Output = Softmax(W \u00b7 x + b)",
  "parameters": {
    "total": "7,850",
    "trainable": "7,850 (784 \u00d7 10 weights + 10 biases)",
    "frozen": "0"
  },
  "hyperparameters": {
    "solver": "L-BFGS",
    "max_iter": 100,
    "multi_class": "multinomial",
    "loss": "Cross-Entropy"
  },
  "metrics": {
    "accuracy": "92.56%",
    "errors": 744,
    "totalTest": 10000,
    "trainingTime": "~12.4s",
    "predictionTime": "0.0216s (0.0022 ms/sample)"
  },
  "comparisonTable": [
    {
      "model": "K-Nearest Neighbors (K=3)",
      "params": "0 (47 MB vectors)",
      "accuracy": "97.05%",
      "errors": "295",
      "latency": "1.59 ms"
    },
    {
      "model": "Logistic Regression",
      "params": "7,850 (0.03 MB)",
      "accuracy": "92.56%",
      "errors": "744",
      "latency": "0.0022 ms"
    }
  ],
  "keyObservations": [
    "Inference is over 700x faster than KNN (0.0022 ms vs 1.59 ms per image).",
    "Accuracy drops significantly to 92.56% (744 errors), proving that handwritten digits are not linearly separable.",
    "Weight templates for each digit reveal coarse visual centroids, but cannot model complex loops or diverse handwriting styles."
  ],
  "whatChanged": "Replaced non-parametric instance storage with a compact 7,850-parameter parametric weight matrix.",
  "whatWeLearned": "Linear classifiers provide lightning-fast probabilistic inference, but have a fundamental representational bottleneck on image manifolds."
};
