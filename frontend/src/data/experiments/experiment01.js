// Experiment 01 — Dataset Exploration & Topological Analysis
// Source of Truth: notebooks/01_dataset_exploration.ipynb and README.md

export const experiment01 = {
  "id": "01",
  "number": "01",
  "title": "Dataset Exploration & Topological Analysis",
  "notebook": "01_dataset_exploration.ipynb",
  "category": "Classical Machine Learning",
  "badge": "Dataset Analysis",
  "objective": "Explore the canonical MNIST benchmark (LeCun et al., 1998), understand pixel intensity distributions, dimensionality, class balance, and 2D spatial topology.",
  "question": "What are the structural properties, statistical distributions, and class balance of raw MNIST images before applying any learning algorithm?",
  "dataset": {
    "name": "MNIST (NIST Special Database 19/3)",
    "samples": "60,000 Train / 10,000 Test",
    "resolution": "28 \u00d7 28 Grayscale (784 dimensions)",
    "classes": "10 Balanced Digits (0\u20139)"
  },
  "method": "Exploratory Data Analysis, Pixel Histograms, Bivariate Correlation, Mean Digit Profiling",
  "architecture": "Non-parametric (Data Inspection Only)",
  "parameters": {
    "total": "N/A",
    "trainable": "0",
    "frozen": "N/A"
  },
  "hyperparameters": {
    "normalization": "Raw intensities [0, 255] -> Scaled [0.0, 1.0]",
    "split": "Standard Train / Test partition",
    "batchSize": "N/A",
    "epochs": "N/A"
  },
  "metrics": {
    "accuracy": "N/A (Exploratory)",
    "errors": "N/A",
    "totalTest": 10000,
    "trainingTime": "Instantaneous"
  },
  "comparisonTable": [
    {
      "dimension": "Training Set Size",
      "value": "60,000 samples"
    },
    {
      "dimension": "Test Set Size",
      "value": "10,000 samples"
    },
    {
      "dimension": "Class Distribution",
      "value": "Balanced (~5,400 to ~6,700 samples / digit)"
    },
    {
      "dimension": "Pixel Intensity Distribution",
      "value": "Bimodal: Peak at 0.0 (background), secondary peak at 200\u2013255 (strokes)"
    }
  ],
  "keyObservations": [
    "MNIST images are tightly centered 20\u00d720 character boxes placed inside a 28\u00d728 black canvas by center of mass.",
    "Strong spatial correlation exists between adjacent pixels; background pixels near borders contain virtually zero entropy.",
    "Flattening 28\u00d728 grids into 784-dimensional vectors discards 2D spatial adjacency relationships."
  ],
  "whatChanged": "Initial foundational dataset exploration and manifold inspection.",
  "whatWeLearned": "Images are spatial manifolds rather than arbitrary vector arrays. Retaining spatial topology will be essential for advanced architectures."
};
