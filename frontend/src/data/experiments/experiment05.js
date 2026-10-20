// Experiment 05 — Multi-Layer Perceptron (Neural Network)
// Source of Truth: notebooks/05_neural_network.ipynb and README.md

export const experiment05 = {
  "id": "05",
  "number": "05",
  "title": "Multi-Layer Perceptron (Neural Network)",
  "notebook": "05_neural_network.ipynb",
  "category": "Deep Learning",
  "badge": "First Deep Model",
  "objective": "Introduce non-linear hidden representations using an Artificial Neural Network (ANN) to break through the linear separability ceiling.",
  "question": "Does adding a non-linear hidden layer (ReLU) allow the model to learn non-linear decision boundaries and outperform linear regression?",
  "dataset": {
    "name": "MNIST (Canonical)",
    "samples": "60,000 Train / 10,000 Test",
    "resolution": "28 \u00d7 28 Flattened to 784-dim",
    "classes": "10 Digits (0\u20139)"
  },
  "method": "Multi-Layer Perceptron (784 -> 128 -> 10) with ReLU activation",
  "architecture": "Linear(784 -> 128) -> ReLU -> Linear(128 -> 10)",
  "parameters": {
    "total": "101,770",
    "trainable": "101,770 ((784\u00d7128 + 128) + (128\u00d710 + 10))",
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
    "accuracy": "97.49%",
    "errors": 251,
    "totalTest": 10000,
    "trainingTime": "30.06 seconds"
  },
  "comparisonTable": [
    {
      "model": "Logistic Regression",
      "params": "7,850",
      "accuracy": "92.56%",
      "errors": "744",
      "training_time": "12.4s"
    },
    {
      "model": "Multi-Layer Perceptron (128 Hidden)",
      "params": "101,770",
      "accuracy": "97.49%",
      "errors": "251",
      "training_time": "30.06s"
    }
  ],
  "keyObservations": [
    "Test accuracy surged from 92.56% to 97.49% (+4.93%), reducing errors from 744 to 251 (a 66.3% error reduction).",
    "Surpassed the KNN baseline (97.05%) while operating as a fast, compact parametric model.",
    "Hidden layer representations combine pixel interactions into distributed stroke features."
  ],
  "whatChanged": "Introduced an intermediate 128-dimensional hidden projection with non-linear ReLU activations.",
  "whatWeLearned": "Non-linear activations allow neural networks to warp the feature space so that complex curved manifolds become linearly separable."
};
