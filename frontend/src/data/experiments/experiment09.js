// Experiment 09 — Data Augmentation & Robust CNN Experiment
// Source of Truth: notebooks/09_data_augmentation.ipynb and README.md

export const experiment09 = {
  "id": "09",
  "number": "09",
  "title": "Data Augmentation & Robust CNN Experiment",
  "notebook": "09_data_augmentation.ipynb",
  "category": "Diagnostics & Shift",
  "badge": "Model Selection: Keep Original",
  "objective": "Train Model B with on-the-fly random affine transformations (\u00b110\u00b0 rotation, \u00b110% translation, 90\u2013110% scale) to test whether augmentation beats upstream preprocessing.",
  "question": "Does training with data augmentation provide a measurable advantage over the baseline CNN with improved preprocessing?",
  "dataset": {
    "name": "MNIST Train Set (Augmented) vs Untouched Test Sets",
    "samples": "60,000 Augmented Train / 10,000 Canonical Test / 35 Real-World",
    "resolution": "28 \u00d7 28",
    "classes": "10 Digits"
  },
  "method": "On-the-fly RandomAffine transformations during mini-batch training",
  "architecture": "HandwrittenDigitCNN (cnn_mnist_augmented.pt)",
  "parameters": {
    "total": "421,642",
    "trainable": "421,642",
    "frozen": "0"
  },
  "hyperparameters": {
    "rotation": "\u00b110 degrees",
    "translation": "\u00b110% horizontal and vertical",
    "scale": "0.90 to 1.10",
    "optimizer": "Adam (lr = 0.001)",
    "epochs": 5
  },
  "metrics": {
    "accuracy": "98.83% (Model B) vs 99.07% (Model A)",
    "errors": 117,
    "totalTest": 10000,
    "trainingTime": "369.58 seconds (+79.2% longer)"
  },
  "comparisonTable": [
    {
      "model": "Model A (Original CNN)",
      "mnist_accuracy": "99.07%",
      "mnist_errors": "93",
      "real_world_acc": "100.0% (35/35)",
      "mean_rw_conf": "98.48%"
    },
    {
      "model": "Model B (Augmented CNN)",
      "mnist_accuracy": "98.83%",
      "mnist_errors": "117",
      "real_world_acc": "100.0% (35/35)",
      "mean_rw_conf": "95.64%"
    }
  ],
  "keyObservations": [
    "Data augmentation degraded canonical MNIST accuracy by 0.24% (+24 additional errors).",
    "Both models achieved identical 100.0% accuracy on real-world samples when combined with Phase 10 preprocessing.",
    "Model B softened confidence on dual-loop digits (8 and 6), dropping below 60% on valid drawings.",
    "Decision: KEEP ORIGINAL MODEL A (cnn_mnist.pt)."
  ],
  "whatChanged": "Trained an augmented CNN variant and saved it separately as cnn_mnist_augmented.pt.",
  "whatWeLearned": "Data augmentation acts as an aggressive regularizer. When spatial variance is already eliminated upstream by geometric preprocessing, augmentation introduces unnecessary uncertainty."
};
