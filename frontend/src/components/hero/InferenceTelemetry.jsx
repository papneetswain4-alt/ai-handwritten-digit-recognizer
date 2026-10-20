import React from 'react';

export default function InferenceTelemetry({ prediction, isLoading, error }) {
  if (error) {
    return (
      <div className="telemetry-panel">
        <div className="telemetry-header">
          <span>MODEL INFERENCE TELEMETRY</span>
          <span>ERROR</span>
        </div>
        <div className="telemetry-content">
          <div style={{ color: '#ff8888', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
            [!] {error}
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="telemetry-panel">
        <div className="telemetry-header">
          <span>MODEL INFERENCE TELEMETRY</span>
          <span>PROCESSING</span>
        </div>
        <div className="telemetry-content" style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-secondary)' }}>
            &gt; Upstream Phase 10 centering applied...
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-white)', marginTop: '8px' }}>
            &gt; Forward pass executing on CPU (models/cnn_mnist.pt)...
          </div>
        </div>
      </div>
    );
  }

  if (!prediction) {
    return (
      <div className="telemetry-panel">
        <div className="telemetry-header">
          <span>MODEL INFERENCE TELEMETRY</span>
          <span>AWAITING INPUT</span>
        </div>
        <div className="telemetry-content" style={{ justifyContent: 'center', alignItems: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', maxWidth: '300px' }}>
            Draw a single digit (0–9) in the workstation canvas and click <strong>Predict</strong> to evaluate the frozen production CNN.
          </p>
        </div>
      </div>
    );
  }

  const confidencePct = (prediction.confidence * 100).toFixed(1);
  const probabilities = prediction.probabilities || {};

  // UI interpretive label (explicitly noted as UI interpretation, not production threshold)
  let uiInterpretation = 'UI Note: Normal Match';
  if (prediction.confidence >= 0.90) {
    uiInterpretation = 'UI Note: High Agreement (≥90%)';
  } else if (prediction.confidence < 0.50) {
    uiInterpretation = 'UI Note: Ambiguous Stroke (<50%)';
  }

  return (
    <div className="telemetry-panel" aria-live="polite">
      <div className="telemetry-header">
        <span>MODEL INFERENCE TELEMETRY</span>
        <span className="archival-stamp active">CNN EVAL COMPLETED</span>
      </div>

      <div className="telemetry-content">
        <div className="prediction-hero-row">
          <div className="prediction-digit-box">
            <span className="digit-label">PREDICTED DIGIT</span>
            <span className="digit-glyph" id="predicted-digit-val">
              {prediction.digit}
            </span>
          </div>

          <div className="prediction-details-column">
            <div className="confidence-hero-stat">
              <span className="confidence-hero-number">{confidencePct}%</span>
              <span className="confidence-hero-label">MODEL CONFIDENCE</span>
            </div>
            <span className="ui-interpretation-note">
              {uiInterpretation}
            </span>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
              Softmax posterior P(y={prediction.digit}|x) under eval() mode
            </div>
          </div>
        </div>

        {/* 10-Class Posterior Distribution */}
        <div className="distribution-bars-grid">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px' }}>
            CLASS POSTERIOR DISTRIBUTION:
          </div>
          {Array.from({ length: 10 }).map((_, digit) => {
            const digitKey = String(digit);
            const prob = probabilities[digitKey] || 0;
            const pct = (prob * 100).toFixed(1);
            const isTop = digit === prediction.digit;

            return (
              <div key={digit} className={`prob-row ${isTop ? 'top-match' : ''}`}>
                <span className="prob-digit-id">{digit}</span>
                <div className="prob-meter-track">
                  <div
                    className="prob-meter-fill"
                    style={{ width: `${Math.min(100, Math.max(0, prob * 100))}%` }}
                  />
                </div>
                <span className="prob-pct-label">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
