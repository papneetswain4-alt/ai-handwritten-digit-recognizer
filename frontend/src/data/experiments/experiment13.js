// Experiment 13 — Transfer Learning
// Source of Truth: notebooks/13_transfer_learning.ipynb and README.md

export const experiment13 = {
  "id": "13",
  "number": "13",
  "title": "Transfer Learning",
  "notebook": "13_transfer_learning.ipynb",
  "category": "Transfer Learning & Freeze",
  "badge": "Transfer Learning",
  "objective": "Expand curriculum to natural color imagery (CIFAR-10) and evaluate feature reuse from a pretrained ResNet-18 backbone.",
  "question": "Can visual features learned on ImageNet transfer to low-resolution natural images without training a backbone from scratch?",
  "dataset": {
    "name": "CIFAR-10 Natural Images",
    "samples": "45,000 Train / 5,000 Val / 10,000 Test",
    "resolution": "32 \u00d7 32 RGB (Upscaled to 64 \u00d7 64 with ImageNet Norm)",
    "classes": "10 Object Categories (Airplane, Car, Bird, Cat, etc.)"
  },
  "method": "Frozen ResNet-18 Feature Extraction vs From-Scratch CNN Baseline",
  "architecture": "Pretrained ResNet-18 (Backbone Frozen) + Linear(512 -> 10) Head",
  "parameters": {
    "total": "11,181,642",
    "trainable": "5,130 (0.05%)",
    "frozen": "11,176,512 (99.95%)"
  },
  "hyperparameters": {
    "optimizer": "Adam (lr = 0.001 for head)",
    "epochs": 5,
    "batchSize": 64,
    "runtime": "Google Colab NVIDIA Tesla T4 GPU"
  },
  "metrics": {
    "frozen_resnet_accuracy": "64.59%",
    "frozen_resnet_errors": 3541,
    "scratch_cnn_accuracy": "74.52%",
    "scratch_cnn_errors": 2548,
    "trainingTime": "100.75s (ResNet) vs 102.72s (Scratch CNN)"
  },
  "comparisonTable": [
    {
      "model": "Frozen ResNet-18 (Exp 13)",
      "trainable_params": "5,130 (0.05%)",
      "training_time": "100.75s",
      "test_accuracy": "64.59%",
      "test_errors": "3,541"
    },
    {
      "model": "Baseline CNN From Scratch",
      "trainable_params": "620,810 (100.0%)",
      "training_time": "102.72s",
      "test_accuracy": "74.52%",
      "test_errors": "2,548"
    }
  ],
  "keyObservations": [
    "With only 5,130 trainable parameters (0.05% of model), frozen ResNet-18 reached 64.59% accuracy on natural images.",
    "From-scratch CNN beat frozen ResNet by +9.93% (74.52% vs 64.59%) due to Resolution and Domain Mismatch: ResNet was pretrained on 224\u00d7224 photos, while CIFAR-10 is 32\u00d732.",
    "Rigid frozen filters could not adapt to blurred low-resolution textures, creating an expressive ceiling."
  ],
  "whatChanged": "Moved beyond MNIST to CIFAR-10; froze 11.17M backbone weights and trained only a 10-class linear classification head.",
  "whatWeLearned": "Feature extraction is computationally fast, but when image resolution diverges drastically from pretraining, frozen representations plateau."
};
