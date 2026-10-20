import React, { useState } from 'react';

const PIPELINE_STEPS = [
  {
    step: 1,
    name: 'Raw Canvas Drawing',
    badge: '280 × 280 px',
    desc: 'Captures raw high-resolution client pointer stroke on black background.',
    detail: 'Client-side export as image/png blob.'
  },
  {
    step: 2,
    name: 'Grayscale Conversion',
    badge: '1 Channel (L)',
    desc: 'Standardizes RGB/RGBA canvas pixels to single-channel 8-bit luminance.',
    detail: 'Eliminates color variance, reducing data footprint.'
  },
  {
    step: 3,
    name: 'Foreground Detection',
    badge: 'Threshold > 20',
    desc: 'Identifies non-background stroke pixels to separate ink from empty canvas.',
    detail: 'Prevents blank canvas crashes; handles empty strokes safely.'
  },
  {
    step: 4,
    name: 'Tight Bounding Box Crop',
    badge: 'Crop [x, y, w, h]',
    desc: 'Crops tightly around the drawn character, discarding arbitrary user margins.',
    detail: 'Eliminates off-center position variance and border whitespace.'
  },
  {
    step: 5,
    name: 'Aspect-Preserving Resize',
    badge: 'Fit in 20 × 20 box',
    desc: 'Scales the longest stroke dimension to 20 px and scales the other proportionally.',
    detail: 'Preserves character topology without geometric stretching or distortion.'
  },
  {
    step: 6,
    name: 'Centroid Alignment',
    badge: 'Center of Mass',
    desc: 'Computes intensity center-of-mass (x̄, ȳ) and translates it to canvas center (14, 14).',
    detail: 'Replicates LeCun et al. (1998) historical MNIST construction rule.'
  },
  {
    step: 7,
    name: 'Tensor Normalization',
    badge: '[1, 1, 28, 28] in [0, 1]',
    desc: 'Divides pixel intensities by 255.0 to produce normalized 32-bit float tensor.',
    detail: 'Matches the exact dynamic range expected by CNN convolutional kernels.'
  },
  {
    step: 8,
    name: 'CNN Convolutions & Softmax',
    badge: '421k Params -> P(y)',
    desc: 'Passes 28×28 tensor through Conv1, Conv2, FC1, FC2 to output 10 posterior probabilities.',
    detail: 'Executes in sub-2ms on CPU in eval() mode with zero retraining.'
  }
];

export default function PipelineVisualizer() {
  const [selectedStep, setSelectedStep] = useState(6); // Default highlight on Centroid Alignment

  return (
    <div className="pipeline-card">
      <div className="pipeline-header">
        <span className="card-title">HOW THE MODEL SEES IT — PRODUCTION PIPELINE</span>
        <span className="pipeline-phase-badge">Phase 10 &amp; Exp 18 Verified</span>
      </div>

      <p className="pipeline-subtitle">
        The 8-stage upstream transformation resolving real-world distribution shift before CNN inference:
      </p>

      {/* Steps Flow Timeline */}
      <div className="pipeline-timeline">
        {PIPELINE_STEPS.map((step) => {
          const isSelected = selectedStep === step.step;
          return (
            <button
              key={step.step}
              type="button"
              className={`pipeline-step-node ${isSelected ? 'active' : ''}`}
              onClick={() => setSelectedStep(step.step)}
            >
              <div className="node-num">{step.step}</div>
              <div className="node-info">
                <span className="node-name">{step.name}</span>
                <span className="node-badge">{step.badge}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Step Deep Dive */}
      {selectedStep && (
        <div className="pipeline-detail-box">
          <div className="detail-top-row">
            <span className="detail-step-num">STAGE {selectedStep} OF 8</span>
            <h4 className="detail-step-title">{PIPELINE_STEPS[selectedStep - 1].name}</h4>
            <span className="detail-step-badge">{PIPELINE_STEPS[selectedStep - 1].badge}</span>
          </div>
          <p className="detail-desc">{PIPELINE_STEPS[selectedStep - 1].desc}</p>
          <div className="detail-engineering-note">
            <span className="eng-icon">⚙</span>
            <span className="eng-text"><strong>Engineering Role:</strong> {PIPELINE_STEPS[selectedStep - 1].detail}</span>
          </div>
        </div>
      )}
    </div>
  );
}
