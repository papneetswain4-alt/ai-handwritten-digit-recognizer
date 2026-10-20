// Experiment 03 — KNN K-Value & Hyperparameter Exploration
// Source of Truth: notebooks/03_knn_k_experiment.ipynb and README.md

export const experiment03 = {
  "id": "03",
  "number": "03",
  "title": "KNN K-Value & Hyperparameter Exploration",
  "notebook": "03_knn_k_experiment.ipynb",
  "category": "Classical Machine Learning",
  "badge": "Hyperparameter Tuning",
  "objective": "Investigate hyperparameter sensitivity of KNN across odd values of K (K \u2208 {1, 3, 5, 7, 9}) and analyze the bias-variance trade-off.",
  "question": "What is the optimal neighbor count K that balances overfitting to pixel noise against oversmoothing decision boundaries?",
  "dataset": {
    "name": "MNIST (Canonical)",
    "samples": "60,000 Train / 10,000 Test",
    "resolution": "28 \u00d7 28 Flattened to 784-dim",
    "classes": "10 Digits (0\u20139)"
  },
  "method": "Grid sweep across odd K neighborhood values with Euclidean L2 distance",
  "architecture": "K-Nearest Neighbors",
  "parameters": {
    "total": "0 (Non-parametric)",
    "trainable": "0",
    "frozen": "Stores training vectors"
  },
  "hyperparameters": {
    "evaluated_k": "K \u2208 {1, 3, 5, 7, 9}",
    "optimal_k": 3,
    "distance": "Euclidean (L2)"
  },
  "metrics": {
    "accuracy": "97.05% (at K=3)",
    "errors": 295,
    "totalTest": 10000,
    "trainingTime": "N/A"
  },
  "comparisonTable": [
    {
      "k_value": "K = 1",
      "accuracy": "96.91%",
      "errors": "309",
      "prediction_time": "15.53s"
    },
    {
      "k_value": "K = 3 (Best)",
      "accuracy": "97.05%",
      "errors": "295",
      "prediction_time": "7.64s"
    },
    {
      "k_value": "K = 5",
      "accuracy": "96.88%",
      "errors": "312",
      "prediction_time": "7.65s"
    },
    {
      "k_value": "K = 7",
      "accuracy": "96.94%",
      "errors": "306",
      "prediction_time": "7.65s"
    },
    {
      "k_value": "K = 9",
      "accuracy": "96.59%",
      "errors": "341",
      "prediction_time": "7.65s"
    }
  ],
  "keyObservations": [
    "K=3 is the optimal neighborhood size, achieving peak accuracy of 97.05% (295 errors).",
    "K=1 is prone to local stroke anomalies and single-pixel artifacts (309 errors).",
    "Larger K values (K >= 7) oversmooth decision boundaries between visually similar digits (e.g. 4 vs 9, 3 vs 5), causing errors to rise to 341."
  ],
  "whatChanged": "Systematic hyperparameter search across neighbor counts K \u2208 {1, 3, 5, 7, 9}.",
  "whatWeLearned": "Hyperparameter selection directly controls model capacity: too small leads to high variance; too large leads to high bias."
};
