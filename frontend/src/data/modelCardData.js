// Production Model Card — Official Certified Checkpoint
// Source of Truth: Experiment 18 (notebooks/16_model_freeze_and_integration.ipynb)

export const modelCardData = {
  modelName: "HandwrittenDigitCNN",
  checkpointPath: "backend/models/cnn_mnist.pt",
  fileSize: "1,690,217 bytes (1.61 MB)",
  sha256: "E7BD9DBC143C566481C2944B699B9B56B43167A0C3AD0018AFA5E8CD17BCF87A",
  architecture: "Conv2D(32) -> Pool -> Conv2D(64) -> Pool -> FC(128) -> FC(10)",
  totalParameters: 421642,
  trainableParameters: 421642,
  frozenParameters: 0,
  canonicalTestAccuracy: "99.07%",
  canonicalTestErrors: "93 / 10,000",
  realWorldAccuracy: "100.0% (35 / 35 Freehand Samples)",
  latencyP50: "1.18 ms",
  latencyP95: "1.69 ms",
  latencyP99: "1.99 ms",
  latencyDevice: "Standard CPU (PyTorch)",
  productionStatus: "MODEL FROZEN — READY FOR FRONTEND INTEGRATION",
  contract: {
    inputFormat: "280x280 canvas export (PNG)",
    tensorShape: "[1, 1, 28, 28]",
    dtype: "torch.float32",
    normalization: "[0.0, 1.0]",
    outputSchema: "digit: 0..9, confidence: 0.0..1.0, probabilities: 10 floats summing to 1.0"
  }
};
