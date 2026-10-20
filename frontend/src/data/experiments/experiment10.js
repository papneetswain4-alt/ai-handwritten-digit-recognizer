// Experiment 10 — CNN Interpretability & Feature Visualization
// Source of Truth: notebooks/10_cnn_interpretability.ipynb and README.md

export const experiment10 = {
  "id": "10",
  "number": "10",
  "title": "CNN Interpretability & Feature Visualization",
  "notebook": "10_cnn_interpretability.ipynb",
  "category": "Interpretability & Calibration",
  "badge": "Model Interpretability",
  "objective": "Inspect the internal representations, learned convolutional filters, activation maps, and gradient saliency of the frozen production CNN.",
  "question": "What visual features do convolutional kernels and feature maps actually detect across layer depths?",
  "dataset": {
    "name": "MNIST Test Samples",
    "samples": "Selected Correct and Misclassified Instances",
    "resolution": "28 \u00d7 28",
    "classes": "10 Digits"
  },
  "method": "Direct weight inspection, feature map forward hooks, gradient-based saliency mapping (S(x) = max |\u2202z/\u2202x|)",
  "architecture": "HandwrittenDigitCNN (cnn_mnist.pt \u2014 Frozen)",
  "parameters": {
    "total": "421,642 (Frozen)",
    "trainable": "0",
    "frozen": "421,642"
  },
  "hyperparameters": {
    "mode": "torch.no_grad() for activations, torch.enable_grad() for saliency"
  },
  "metrics": {
    "conv1_filters": "32 filters (3\u00d73)",
    "conv2_filters": "64 filters (3\u00d73)",
    "relu_sparsity": "40% \u2013 60% zero activations",
    "evaluation_mode": "Zero retraining"
  },
  "comparisonTable": [
    {
      "layer": "Conv1 (32 channels, 28\u00d728)",
      "representation": "Directional edge detectors (horizontal, vertical, diagonal) & stroke spines"
    },
    {
      "layer": "Pool1 (32 channels, 14\u00d714)",
      "representation": "Downsampled peak activations with local translation tolerance"
    },
    {
      "layer": "Conv2 (64 channels, 14\u00d714)",
      "representation": "Abstract stroke combinations (loops, junctions, bifurcations)"
    },
    {
      "layer": "Pool2 (64 channels, 7\u00d77)",
      "representation": "Condensed 3,136-dim spatial feature volume"
    },
    {
      "layer": "FC1 (128 units)",
      "representation": "Dense distributed hidden state encoding global digit topology"
    }
  ],
  "keyObservations": [
    "Conv1 filters directly learn classic computer vision operators (Gabor edge filters, center-surround operators) from backpropagation.",
    "ReLU non-linearity induces 40\u201360% representational sparsity, eliminating destructive interference between stroke features.",
    "Gradient saliency maps highlight that the network focuses tightly on discriminating loops and stroke crossings."
  ],
  "whatChanged": "Conducted non-destructive inspection of internal layer representations without altering weights.",
  "whatWeLearned": "Deep convolutional networks construct a verifiable hierarchical visual grammar: lower layers detect primitives while upper layers assemble them into semantic parts."
};
