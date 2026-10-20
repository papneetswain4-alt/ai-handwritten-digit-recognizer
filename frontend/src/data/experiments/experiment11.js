// Experiment 11 — Model Calibration & Selective Prediction
// Source of Truth: notebooks/11_model_calibration.ipynb and README.md

export const experiment11 = {
  "id": "11",
  "number": "11",
  "title": "Model Calibration & Selective Prediction",
  "notebook": "11_model_calibration.ipynb",
  "category": "Interpretability & Calibration",
  "badge": "Confidence Calibration",
  "objective": "Determine whether the CNN's softmax confidence scores represent true posterior probabilities and investigate risk-coverage trade-offs with selective prediction.",
  "question": "Can we trust softmax confidence, and how frequently does the network make overconfident misclassifications?",
  "dataset": {
    "name": "MNIST Test Set (10,000 samples)",
    "samples": "10,000 Canonical Test Images",
    "resolution": "28 \u00d7 28",
    "classes": "10 Digits"
  },
  "method": "Reliability diagrams, Expected Calibration Error (ECE), Maximum Calibration Error (MCE), selective rejection thresholds",
  "architecture": "HandwrittenDigitCNN (cnn_mnist.pt \u2014 Frozen)",
  "parameters": {
    "total": "421,642 (Frozen)",
    "trainable": "0",
    "frozen": "421,642"
  },
  "hyperparameters": {
    "bins": "10 Uniform Confidence Bins",
    "rejection_thresholds": "tau \u2208 [0.0, 0.99]"
  },
  "metrics": {
    "accuracy": "99.07%",
    "mean_confidence": "99.30%",
    "ece": "0.2541%",
    "mce": "9.8517% (in bin 0.4\u20130.5)",
    "overconfident_errors_ge_90": "29 / 93 (31.2%)",
    "overconfident_errors_ge_99": "7 / 93 (7.5%)"
  },
  "comparisonTable": [
    {
      "threshold": "tau = 0.00 (Baseline)",
      "coverage": "100.0%",
      "accuracy": "99.07%",
      "accepted_errors": "93",
      "error_reduction": "0.0%"
    },
    {
      "threshold": "tau = 0.80",
      "coverage": "98.79%",
      "accuracy": "99.53%",
      "accepted_errors": "46",
      "error_reduction": "-50.5%"
    },
    {
      "threshold": "tau = 0.90",
      "coverage": "97.93%",
      "accuracy": "99.70%",
      "accepted_errors": "29",
      "error_reduction": "-68.8%"
    },
    {
      "threshold": "tau = 0.99",
      "coverage": "94.61%",
      "accuracy": "99.93%",
      "accepted_errors": "7",
      "error_reduction": "-92.5%"
    }
  ],
  "keyObservations": [
    "Global ECE is extremely low (0.2541%) because 97.93% of all test predictions fall into the top bin [0.9, 1.0].",
    "Dangerous failure mode: 29 out of 93 errors had confidence >= 90%, with peak false certainty on sample #2896 (8 -> 0) at 99.96% confidence.",
    "Selective prediction threshold of tau = 0.80 eliminates over 50% of errors while retaining 98.79% user coverage."
  ],
  "whatChanged": "Analyzed softmax confidence reliability and established selective prediction trade-off curves.",
  "whatWeLearned": "Softmax confidence is not calibrated probability: cross-entropy optimization pushes winning logits outward without bound, producing false certainty on edge cases."
};
