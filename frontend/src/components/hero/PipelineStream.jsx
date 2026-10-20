import React from 'react';

const PIPELINE_STEPS = [
  { step: '01', name: 'Raw Canvas', badge: '280×280 px' },
  { step: '02', name: 'Grayscale', badge: '1 Channel (L)' },
  { step: '03', name: 'Foreground', badge: 'Thresh > 20' },
  { step: '04', name: 'Bounding Box', badge: 'Tight Crop' },
  { step: '05', name: 'Aspect Fit', badge: '20×20 Box' },
  { step: '06', name: 'Center of Mass', badge: 'Centroid (14,14)' },
  { step: '07', name: 'Normalize', badge: '[0.0, 1.0] Float' },
  { step: '08', name: 'CNN Softmax', badge: 'P(y|x) Output' },
];

export default function PipelineStream() {
  return (
    <div className="pipeline-stream-box">
      <div className="pipeline-stream-header">
        <span>UPSTREAM VISION PIPELINE // RESOLVING DISTRIBUTION SHIFT</span>
        <span>PHASE 10 &amp; EXP 08 VERIFIED</span>
      </div>

      <div className="pipeline-tape-row">
        {PIPELINE_STEPS.map((step, idx) => (
          <React.Fragment key={step.step}>
            <div className="pipeline-step-node">
              <span className="pipeline-step-num">STAGE {step.step}</span>
              <span className="pipeline-step-name">{step.name}</span>
              <span className="pipeline-step-badge">{step.badge}</span>
            </div>
            {idx < PIPELINE_STEPS.length - 1 && (
              <span className="pipeline-arrow">→</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
