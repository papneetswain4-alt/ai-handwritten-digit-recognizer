// Experiment 08 — Real-World Preprocessing & Distribution Shift
// Source of Truth: notebooks/08_real_world_preprocessing.ipynb and README.md

export const experiment08 = {
  "id": "08",
  "number": "08",
  "title": "Real-World Preprocessing & Distribution Shift",
  "notebook": "08_real_world_preprocessing.ipynb",
  "category": "Diagnostics & Shift",
  "badge": "Covariate Shift Solution",
  "objective": "Test the frozen production CNN on 35 realistic hand-drawn browser canvas samples and resolve covariate distribution shift without retraining.",
  "question": "Why does a 99.07% accurate model fail on web browser canvas drawings, and how can upstream preprocessing fix it?",
  "dataset": {
    "name": "Phase 10 Real-World Dataset",
    "samples": "35 Realistic Freehand Canvas Drawings",
    "resolution": "280 \u00d7 280 Canvas Export",
    "classes": "All Digits 0\u20139"
  },
  "method": "Comparison between Baseline Direct Downsampling vs. Improved 8-Stage Preprocessing Pipeline",
  "architecture": "HandwrittenDigitCNN (backend/models/cnn_mnist.pt \u2014 Frozen)",
  "parameters": {
    "total": "421,642 (Zero Retraining)",
    "trainable": "0",
    "frozen": "421,642"
  },
  "hyperparameters": {
    "pipeline": "Grayscale -> Bounding Box Crop -> 20x20 Aspect-Preserving Scale -> Centroid Alignment -> [0,1] Normalization"
  },
  "metrics": {
    "accuracy": "100.0% (35 / 35 on improved pipeline)",
    "errors": 0,
    "totalTest": 35,
    "baselineAccuracy": "85.7% (30 / 35 on naive pipeline)"
  },
  "comparisonTable": [
    {
      "pipeline": "Baseline Naive Preprocessing",
      "correct": "30 / 35",
      "accuracy": "85.7%",
      "errors": "5",
      "mean_conf_wrong": "73.0%"
    },
    {
      "pipeline": "Improved Phase 10 Pipeline",
      "correct": "35 / 35",
      "accuracy": "100.0%",
      "errors": "0",
      "mean_conf_right": "99.1%"
    }
  ],
  "keyObservations": [
    "Fixed 5 out of 5 failure modes with zero regressions, including the infamous Phase 9 bug (0 -> 9 at 89.7% confidence fixed to 0 -> 0 at 100%).",
    "Real-world drawing canvas variance causes Covariate Distribution Shift: small or off-center drawings compress into tiny corner patches under naive downsampling.",
    "Replicating MNIST's historical construction (20\u00d720 bounding box with center-of-mass alignment) aligns user drawings with the convolutional receptive fields."
  ],
  "whatChanged": "Engineered upstream preprocessing pipeline and integrated it into backend/src/inference.py without touching CNN weights.",
  "whatWeLearned": "Preprocessing is an integral component of the ML system. Resolving distribution shift upstream can achieve 100% real-world accuracy without retraining."
};
