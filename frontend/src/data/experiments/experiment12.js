// Experiment 12 — Temperature Scaling & Post-Hoc Calibration
// Source of Truth: notebooks/12_temperature_scaling.ipynb and README.md

export const experiment12 = {
  "id": "12",
  "number": "12",
  "title": "Temperature Scaling & Post-Hoc Calibration",
  "notebook": "12_temperature_scaling.ipynb",
  "category": "Interpretability & Calibration",
  "badge": "Post-Hoc Optimization",
  "objective": "Test whether post-hoc temperature scaling (P(y) = softmax(z / T)) can improve calibration without altering model weights, predictions, or architecture.",
  "question": "Can learning a single scalar parameter T on a calibration split improve probability reliability on unseen test data?",
  "dataset": {
    "name": "MNIST Calibration Split & Test Set",
    "samples": "1,000 Calibration Samples (Seed = 42) / 10,000 Test Images",
    "resolution": "28 \u00d7 28",
    "classes": "10 Digits"
  },
  "method": "Post-hoc negative log-likelihood (NLL) optimization with L-BFGS over frozen logits",
  "architecture": "HandwrittenDigitCNN + Temperature Scaling Module",
  "parameters": {
    "total": "421,642 Backbone (Frozen) + 1 Learned Scalar (T)",
    "trainable": "1 (Temperature T)",
    "frozen": "421,642"
  },
  "hyperparameters": {
    "initial_t": "1.0000",
    "learned_t": "0.8691",
    "optimizer": "L-BFGS (max_iter = 50)",
    "calibration_size": "1,000 samples"
  },
  "metrics": {
    "accuracy": "99.07% (Argmax Strictly Invariant)",
    "changed_predictions": "0 / 10,000 (0.00%)",
    "original_ece": "0.2541%",
    "scaled_ece": "0.3649% (+43.6% worse)",
    "original_mce": "9.8517%",
    "scaled_mce": "16.1778% (+64.2% worse)"
  },
  "comparisonTable": [
    {
      "metric": "Test Accuracy",
      "t_1_0": "99.07%",
      "t_scaled": "99.07%",
      "impact": "Identical (Argmax Preserved)"
    },
    {
      "metric": "Expected Calibration Error (ECE)",
      "t_1_0": "0.2541%",
      "t_scaled": "0.3649%",
      "impact": "+43.6% Worse (Degraded)"
    },
    {
      "metric": "Maximum Calibration Error (MCE)",
      "t_1_0": "9.8517%",
      "t_scaled": "16.1778%",
      "impact": "+64.2% Worse (Degraded)"
    },
    {
      "metric": "Errors with Conf >= 0.90",
      "t_1_0": "29",
      "t_scaled": "33",
      "impact": "+4 More Overconfident Errors"
    }
  ],
  "keyObservations": [
    "Argmax invariance: Classification predictions remain mathematically 100% identical (0 predictions changed).",
    "Degraded calibration: Temperature scaling learned T = 0.8691 < 1.0 (sharpening probabilities) because calibration accuracy was 99.50%.",
    "On unseen test data, probability sharpening worsened ECE by +43.6% and increased high-confidence errors.",
    "Decision: KEEP ORIGINAL SOFTMAX (T = 1.0) in production."
  ],
  "whatChanged": "Optimized scalar temperature parameter on holdout split and evaluated across all 10,000 test images.",
  "whatWeLearned": "Temperature scaling is effective for models that under-predict uncertainty on complex datasets, but on near-perfect models like MNIST it causes counter-productive probability sharpening."
};
