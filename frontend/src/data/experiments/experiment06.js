// Experiment 06 — Convolutional Neural Network (CNN)
// Source of Truth: notebooks/06_cnn.ipynb and README.md

export const experiment06 = {
  "id": "06",
  "number": "06",
  "title": "Convolutional Neural Network (CNN)",
  "notebook": "06_cnn.ipynb",
  "category": "Deep Learning",
  "badge": "Core Production Architecture",
  "objective": "Build a translation-invariant 2D convolutional network that preserves spatial topology and captures localized stroke patterns.",
  "question": "Can 2D spatial convolution and max-pooling outperform fully connected networks on image classification?",
  "dataset": {
    "name": "MNIST (Canonical)",
    "samples": "60,000 Train / 10,000 Test",
    "resolution": "28 \u00d7 28 Grayscale Image",
    "classes": "10 Digits (0\u20139)"
  },
  "method": "Conv2D (32 filters, 3x3, pad 1) + MaxPool + Conv2D (64 filters, 3x3, pad 1) + MaxPool + FC(128) + FC(10)",
  "architecture": "HandwrittenDigitCNN (Conv1 -> Pool1 -> Conv2 -> Pool2 -> Flatten -> FC1 -> FC2)",
  "parameters": {
    "total": "421,642",
    "trainable": "421,642",
    "frozen": "0"
  },
  "hyperparameters": {
    "optimizer": "Adam (lr = 0.001)",
    "loss": "CrossEntropyLoss",
    "batchSize": 64,
    "epochs": 5,
    "device": "CPU / PyTorch"
  },
  "metrics": {
    "accuracy": "99.06%",
    "errors": 94,
    "totalTest": 10000,
    "trainingTime": "206.20 seconds (~3.4 min)"
  },
  "comparisonTable": [
    {
      "model": "Logistic Regression",
      "params": "7,850",
      "accuracy": "92.56%",
      "errors": "744"
    },
    {
      "model": "MLP (128 Hidden)",
      "params": "101,770",
      "accuracy": "97.49%",
      "errors": "251"
    },
    {
      "model": "HandwrittenDigitCNN",
      "params": "421,642",
      "accuracy": "99.06%",
      "errors": "94"
    }
  ],
  "keyObservations": [
    "Broke the 99% accuracy barrier for the first time in the curriculum (99.06% on original training pass).",
    "Cut errors by 62.5% compared to the MLP (from 251 down to 94).",
    "Weight sharing across local 3\u00d73 receptive fields dramatically improves sample efficiency and spatial invariance."
  ],
  "whatChanged": "Replaced flat 1D vector multiplications with 2D spatial convolutions, parameter sharing, and pooling downsampling.",
  "whatWeLearned": "Convolutional inductive bias is uniquely matched to visual imagery: translation invariance and local receptive fields prevent overfitting while modeling complex features."
};
