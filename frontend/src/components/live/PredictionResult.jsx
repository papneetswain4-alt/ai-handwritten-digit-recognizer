import React from 'react';

export default function PredictionResult({ prediction, isLoading }) {
  if (isLoading) {
    return (
      <div className="result-card loading-state">
        <div className="spinner" />
        <span className="loading-label">Evaluating with CNN...</span>
        <span className="loading-sub">Running upstream preprocessing + forward pass</span>
      </div>
    );
  }

  if (!prediction) {
    return (
      <div className="result-card empty-state">
        <span className="card-title">MODEL INFERENCE OUTPUT</span>
        <div className="placeholder-content">
          <span className="placeholder-icon">✍</span>
          <p className="placeholder-text">
            Draw a digit on the canvas and click <strong>Predict Digit</strong> to view CNN inference.
          </p>
        </div>
      </div>
    );
  }

  const confidencePct = (prediction.confidence * 100).toFixed(1);
  const isHighConfidence = prediction.confidence >= 0.90;
  const isModerateConfidence = prediction.confidence >= 0.50 && prediction.confidence < 0.90;

  return (
    <div className="result-card success-state">
      <div className="result-header">
        <span className="card-title">MODEL INFERENCE OUTPUT</span>
        <span
          className={`tier-badge ${
            isHighConfidence
              ? 'tier-high'
              : isModerateConfidence
              ? 'tier-mod'
              : 'tier-ambiguous'
          }`}
        >
          {isHighConfidence
            ? 'High Certainty (≥90%)'
            : isModerateConfidence
            ? 'Moderate Certainty (50-89%)'
            : 'Ambiguous (<50%)'}
        </span>
      </div>

      <div className="result-body">
        <div className="result-digit-container">
          <span className="result-digit-label">PREDICTED DIGIT</span>
          <span className="result-digit-hero" id="predicted-digit">
            {prediction.digit}
          </span>
        </div>

        <div className="result-meta-container">
          <div className="meta-item">
            <span className="meta-label">Softmax Confidence:</span>
            <span className="meta-value hero-conf" id="predicted-confidence">
              {confidencePct}%
            </span>
          </div>

          <div className="meta-item">
            <span className="meta-label">Selected Model:</span>
            <span className="meta-value">HandwrittenDigitCNN</span>
          </div>

          <div className="meta-item">
            <span className="meta-label">Checkpoint:</span>
            <span className="meta-value font-mono">backend/models/cnn_mnist.pt</span>
          </div>
        </div>
      </div>
    </div>
  );
}
