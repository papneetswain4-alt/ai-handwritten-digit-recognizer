import React from 'react';
import { modelCardData } from '../../data/modelCardData.js';

export default function ModelCard() {
  return (
    <div className="model-card-panel">
      <div className="model-card-header">
        <div className="mc-title-group">
          <span className="mc-icon">🔒</span>
          <span className="mc-title">PRODUCTION MODEL CARD</span>
        </div>
        <span className="mc-status-pill">{modelCardData.productionStatus}</span>
      </div>

      <div className="mc-grid">
        <div className="mc-item">
          <span className="mc-label">Model Architecture:</span>
          <span className="mc-value bold">{modelCardData.modelName}</span>
          <span className="mc-sub">{modelCardData.architecture}</span>
        </div>

        <div className="mc-item">
          <span className="mc-label">Canonical Accuracy:</span>
          <span className="mc-value highlight-green">{modelCardData.canonicalTestAccuracy}</span>
          <span className="mc-sub">{modelCardData.canonicalTestErrors} errors</span>
        </div>

        <div className="mc-item">
          <span className="mc-label">Real-World Accuracy:</span>
          <span className="mc-value highlight-cyan">{modelCardData.realWorldAccuracy}</span>
          <span className="mc-sub">Tested with Phase 10 Pipeline</span>
        </div>

        <div className="mc-item">
          <span className="mc-label">End-to-End Latency:</span>
          <span className="mc-value">{modelCardData.latencyP50} (P50)</span>
          <span className="mc-sub">P99: {modelCardData.latencyP99} ({modelCardData.latencyDevice})</span>
        </div>

        <div className="mc-item full-width">
          <span className="mc-label">Checkpoint Path:</span>
          <span className="mc-value font-mono">{modelCardData.checkpointPath}</span>
          <span className="mc-sub">{modelCardData.fileSize} • {modelCardData.totalParameters.toLocaleString()} parameters</span>
        </div>

        <div className="mc-item full-width">
          <span className="mc-label">Cryptographic Checksum (SHA-256):</span>
          <span className="mc-value font-mono checksum-tag">{modelCardData.sha256}</span>
          <span className="mc-sub">Verified Master Checksum — Guaranteed Unaltered Since Experiment 06</span>
        </div>
      </div>
    </div>
  );
}
