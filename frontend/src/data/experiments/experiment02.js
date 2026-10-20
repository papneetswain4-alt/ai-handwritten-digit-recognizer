// Experiment 02 — K-Nearest Neighbors (KNN) Baseline
// Source of Truth: notebooks/02_knn_baseline.ipynb and README.md

export const experiment02 = {
  "id": "02",
  "number": "02",
  "title": "K-Nearest Neighbors (KNN) Baseline",
  "notebook": "02_knn_baseline.ipynb",
  "category": "Classical Machine Learning",
  "badge": "Baseline Model",
  "objective": "Establish a simple non-parametric baseline benchmark on raw flattened 784-dimensional pixel vectors using instance-based learning.",
  "question": "How accurately can a non-parametric instance-based algorithm classify handwritten digits without explicit parameter optimization?",
  "dataset": {
    "name": "MNIST (Canonical)",
    "samples": "60,000 Train / 10,000 Test",
    "resolution": "28 \u00d7 28 Flattened to 784-dim vector",
    "classes": "10 Digits (0\u20139)"
  },
  "method": "K-Nearest Neighbors (K=3, Euclidean L2 Distance Metric, Majority Voting)",
  "architecture": "Lazy Instance-Based Classifier (Stores All Training Vectors)",
  "parameters": {
    "total": "0 (Non-parametric)",
    "trainable": "0",
    "frozen": "Stores 60,000 \u00d7 784 floats in memory"
  },
  "hyperparameters": {
    "k_neighbors": 3,
    "distance_metric": "Euclidean (L2 norm)",
    "weights": "Uniform voting",
    "algorithm": "Exact brute-force search"
  },
  "metrics": {
    "accuracy": "97.05%",
    "errors": 295,
    "totalTest": 10000,
    "trainingTime": "0.0s (Lazy Learner)",
    "predictionTime": "15.88s (1.59 ms/sample)"
  },
  "comparisonTable": [
    {
      "metric": "Test Accuracy",
      "value": "97.05%"
    },
    {
      "metric": "Correct Predictions",
      "value": "9,705 / 10,000"
    },
    {
      "metric": "Misclassifications",
      "value": "295 / 10,000"
    },
    {
      "metric": "Average Latency / Sample",
      "value": "1.59 ms"
    }
  ],
  "keyObservations": [
    "Achieved a surprisingly strong baseline of 97.05% with zero training optimization.",
    "High memory footprint: Requires storing all 60,000 training examples (47 MB of raw vectors).",
    "Inference complexity is O(N \u00b7 D), making test-time classification computationally heavy as the dataset scales."
  ],
  "whatChanged": "First learning algorithm deployed, establishing the initial accuracy ceiling.",
  "whatWeLearned": "Euclidean distance on raw pixel vectors is sufficient to separate well-formed digits, but non-parametric models scale poorly at test time."
};
