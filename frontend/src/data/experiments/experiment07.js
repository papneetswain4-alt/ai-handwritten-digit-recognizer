// Experiment 07 — CNN Error Analysis & Failure Audit
// Source of Truth: notebooks/07_cnn_error_analysis.ipynb and README.md

export const experiment07 = {
  "id": "07",
  "number": "07",
  "title": "CNN Error Analysis & Failure Audit",
  "notebook": "07_cnn_error_analysis.ipynb",
  "category": "Diagnostics & Shift",
  "badge": "Error Audit",
  "objective": "Perform a diagnostic audit of all misclassifications made by the trained CNN to uncover systematic failure modes.",
  "question": "What visual patterns cause the CNN to fail, and is the error distribution symmetric across digit classes?",
  "dataset": {
    "name": "MNIST Test Set (Untouched)",
    "samples": "10,000 Test Images",
    "resolution": "28 \u00d7 28 Grayscale",
    "classes": "10 Digits (0\u20139)"
  },
  "method": "Confusion matrix analysis, per-class error rate profiling, visual inspection of failure cases on frozen model checkpoint",
  "architecture": "HandwrittenDigitCNN (cnn_mnist.pt)",
  "parameters": {
    "total": "421,642 (Frozen Checkpoint)",
    "trainable": "0",
    "frozen": "421,642"
  },
  "hyperparameters": {
    "evaluation_mode": "torch.no_grad(), eval() mode",
    "re_evaluated_accuracy": "99.07% (93 errors / 10,000)"
  },
  "metrics": {
    "accuracy": "99.07%",
    "errors": 93,
    "totalTest": 10000,
    "trainingTime": "N/A (Inference audit)"
  },
  "comparisonTable": [
    {
      "digit": "Digit 0 (Easiest)",
      "test_samples": "980",
      "errors": "1",
      "error_rate": "0.10%",
      "accuracy": "99.90%"
    },
    {
      "digit": "Digit 1",
      "test_samples": "1,135",
      "errors": "3",
      "error_rate": "0.26%",
      "accuracy": "99.74%"
    },
    {
      "digit": "Digit 2",
      "test_samples": "1,032",
      "errors": "6",
      "error_rate": "0.58%",
      "accuracy": "99.42%"
    },
    {
      "digit": "Digit 3",
      "test_samples": "1,010",
      "errors": "5",
      "error_rate": "0.50%",
      "accuracy": "99.50%"
    },
    {
      "digit": "Digit 4",
      "test_samples": "982",
      "errors": "14",
      "error_rate": "1.43%",
      "accuracy": "98.57%"
    },
    {
      "digit": "Digit 5",
      "test_samples": "892",
      "errors": "11",
      "error_rate": "1.23%",
      "accuracy": "98.77%"
    },
    {
      "digit": "Digit 6",
      "test_samples": "958",
      "errors": "12",
      "error_rate": "1.25%",
      "accuracy": "98.75%"
    },
    {
      "digit": "Digit 7",
      "test_samples": "1,028",
      "errors": "6",
      "error_rate": "0.58%",
      "accuracy": "99.42%"
    },
    {
      "digit": "Digit 8 (Hardest)",
      "test_samples": "974",
      "errors": "20",
      "error_rate": "2.05%",
      "accuracy": "97.95%"
    },
    {
      "digit": "Digit 9",
      "test_samples": "1,009",
      "errors": "15",
      "error_rate": "1.49%",
      "accuracy": "98.51%"
    }
  ],
  "keyObservations": [
    "Re-evaluating the saved production checkpoint cnn_mnist.pt confirmed 99.07% test accuracy (93 errors out of 10,000).",
    "Severe per-class disparity: Digit 8 has an error rate 20.1x higher than Digit 0 (2.05% vs 0.10%).",
    "Top confusion pairs: 4 -> 9 (11 errors), 7 -> 2 (5 errors), 8 -> 3 (5 errors), 8 -> 0 (4 errors), 9 -> 4 (4 errors)."
  ],
  "whatChanged": "Shifted from architecture experimentation to forensic auditing of model failures.",
  "whatWeLearned": "Aggregate accuracy masks severe class-level disparities. Many errors stem from human handwriting ambiguity rather than architectural defects."
};
