"""PyTorch Convolutional Neural Network (CNN) Model Architecture.

Recreates the exact CNN architecture used in Experiment 05 and analyzed in
Experiment 06 of AI Lab.

Tensor Flow:
    Input:                 (Batch, 1, 28, 28)
           |
           v Conv2D (1 -> 32 channels, 3x3 kernel, pad 1) + ReLU
    Feature Maps 1:        (Batch, 32, 28, 28)
           |
           v MaxPool2D (2x2 kernel, stride 2)
    Pooled Maps 1:         (Batch, 32, 14, 14)
           |
           v Conv2D (32 -> 64 channels, 3x3 kernel, pad 1) + ReLU
    Feature Maps 2:        (Batch, 64, 14, 14)
           |
           v MaxPool2D (2x2 kernel, stride 2)
    Pooled Maps 2:         (Batch, 64, 7, 7)
           |
           v Flatten (64 * 7 * 7 = 3,136 features)
    Flattened Vector:      (Batch, 3136)
           |
           v Linear (3136 -> 128) + ReLU
    Hidden State:          (Batch, 128)
           |
           v Linear (128 -> 10)
    Output Logits:         (Batch, 10) [Unnormalized scores for digits 0-9]
"""

import torch
import torch.nn as nn


class HandwrittenDigitCNN(nn.Module):
    """Convolutional Neural Network for 28x28 grayscale handwritten digit recognition.

    Total Trainable Parameters: 421,642
      - conv1: (32 * 1 * 3 * 3) + 32 = 320
      - conv2: (64 * 32 * 3 * 3) + 64 = 18,496
      - fc1:   (3136 * 128) + 128 = 401,536
      - fc2:   (128 * 10) + 10 = 1,290
    """

    def __init__(self):
        super(HandwrittenDigitCNN, self).__init__()

        # Conv Block 1: 1 input channel (grayscale) -> 32 feature maps (3x3 kernel, pad 1 preserves 28x28)
        self.conv1 = nn.Conv2d(in_channels=1, out_channels=32, kernel_size=3, padding=1)
        self.relu1 = nn.ReLU()
        # MaxPool halves spatial height and width: 28x28 -> 14x14
        self.pool1 = nn.MaxPool2d(kernel_size=2, stride=2)

        # Conv Block 2: 32 channels -> 64 feature maps (3x3 kernel, pad 1 preserves 14x14)
        self.conv2 = nn.Conv2d(in_channels=32, out_channels=64, kernel_size=3, padding=1)
        self.relu2 = nn.ReLU()
        # MaxPool halves spatial dimensions: 14x14 -> 7x7
        self.pool2 = nn.MaxPool2d(kernel_size=2, stride=2)

        # Dense Classifier: 64 channels * 7 * 7 = 3,136 flattened features
        self.fc1 = nn.Linear(64 * 7 * 7, 128)
        self.relu3 = nn.ReLU()
        self.fc2 = nn.Linear(128, 10)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        """Forward pass through the CNN.

        Args:
            x: Input 4D tensor with shape [Batch, 1, 28, 28]

        Returns:
            Output logits tensor with shape [Batch, 10]
        """
        # Block 1
        x = self.conv1(x)         # [N, 32, 28, 28]
        x = self.relu1(x)
        x = self.pool1(x)         # [N, 32, 14, 14]

        # Block 2
        x = self.conv2(x)         # [N, 64, 14, 14]
        x = self.relu2(x)
        x = self.pool2(x)         # [N, 64, 7, 7]

        # Flatten spatial feature volume into 1D vector per sample
        x = x.view(x.size(0), -1) # [N, 3136]

        # Classification layers
        x = self.relu3(self.fc1(x)) # [N, 128]
        x = self.fc2(x)           # [N, 10] (raw logits)

        return x
