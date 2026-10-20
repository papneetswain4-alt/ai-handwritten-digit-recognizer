import React from 'react';

export default function ArchivalFooter() {
  return (
    <footer className="app-footer">
      <div className="footer-left">
        <span className="footer-brand">AI LAB PLATFORM</span>
        <span>•</span>
        <span>16 Machine Learning Experiments Sealed</span>
        <span>•</span>
        <span>Production CNN: 99.07% (421,642 params)</span>
        <span>•</span>
        <span>Inference Latency: Mean 1.077 ms | P50 1.175 ms | P95 1.687 ms | P99 1.992 ms</span>
      </div>
      <div className="footer-right">
        <span>CHECKPOINT: models/cnn_mnist.pt (1.69 MB)</span>
        <span>•</span>
        <span>STATE: FROZEN</span>
      </div>
    </footer>
  );
}
