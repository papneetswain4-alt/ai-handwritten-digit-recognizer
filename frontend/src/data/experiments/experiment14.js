// Experiment 14 — Fine-Tuning
// Source of Truth: notebooks/14_fine_tuning.ipynb and README.md

export const experiment14 = {
  "id": "14",
  "number": "14",
  "title": "Fine-Tuning",
  "notebook": "14_fine_tuning.ipynb",
  "category": "Transfer Learning & Freeze",
  "badge": "Discriminative Fine-Tuning",
  "objective": "Unfreeze convolutional layers in the pretrained ResNet-18 backbone using discriminative learning rates to adapt features to CIFAR-10.",
  "question": "Can fine-tuning overcome the 64.59% frozen plateau and beat the 74.52% from-scratch baseline?",
  "dataset": {
    "name": "CIFAR-10 Natural Images",
    "samples": "45,000 Train / 5,000 Val / 10,000 Test",
    "resolution": "32 \u00d7 32 RGB (Upscaled to 64 \u00d7 64)",
    "classes": "10 Categories"
  },
  "method": "Discriminative Fine-Tuning: Model B (Layer4 + Head) vs Model C (Full ResNet-18)",
  "architecture": "ResNet-18 with Selective vs Full Layer Unfreezing",
  "parameters": {
    "total": "11,181,642",
    "trainable_model_b": "8,398,858 (75.11%)",
    "trainable_model_c": "11,181,642 (100.0%)"
  },
  "hyperparameters": {
    "lr_backbone": "1e-5 (Preserves pretrained representations)",
    "lr_head": "1e-3 (Fast convergence on new task)",
    "epochs": 5,
    "runtime": "Google Colab NVIDIA Tesla T4 GPU"
  },
  "metrics": {
    "layer4_accuracy": "77.67%",
    "layer4_errors": 2233,
    "full_resnet_accuracy": "84.68%",
    "full_resnet_errors": 1532,
    "error_reduction": "56.7% error reduction vs frozen model"
  },
  "comparisonTable": [
    {
      "model": "Frozen ResNet-18 (Exp 13 Ref)",
      "trainable_params": "5,130",
      "training_time": "100.75s",
      "test_accuracy": "64.59%",
      "test_errors": "3,541"
    },
    {
      "model": "Fine-Tune Layer4 + Head (Model B)",
      "trainable_params": "8,398,858",
      "training_time": "102.58s",
      "test_accuracy": "77.67%",
      "test_errors": "2,233"
    },
    {
      "model": "Fine-Tune Full ResNet-18 (Model C)",
      "trainable_params": "11,181,642",
      "training_time": "117.98s",
      "test_accuracy": "84.68%",
      "test_errors": "1,532"
    },
    {
      "model": "CNN From Scratch (Exp 13 Baseline)",
      "trainable_params": "620,810",
      "training_time": "102.72s",
      "test_accuracy": "74.52%",
      "test_errors": "2,548"
    }
  ],
  "keyObservations": [
    "Full fine-tuning propelled test accuracy to 84.68% (+20.09% over frozen), cutting errors from 3,541 to 1,532 (a 56.7% error reduction).",
    "Decisively beat the from-scratch CNN (+10.16% gain) for only 15 seconds of additional GPU compute (117.98s vs 102.72s).",
    "Discriminative learning rates prevented catastrophic forgetting, allowing filters to gently adjust their receptive fields to low resolution."
  ],
  "whatChanged": "Unfroze backbone layers with differential learning rates (1e-5 for backbone, 1e-3 for head).",
  "whatWeLearned": "Fine-tuning aligns pretrained feature maps with the target data distribution, overcoming resolution mismatch while capitalizing on pre-existing visual representations."
};
