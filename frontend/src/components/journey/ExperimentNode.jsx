import React from 'react';

export default function ExperimentNode({ experiment, isSelected, onSelect }) {
  const isNegative = experiment.isNegativeResult;

  return (
    <button
      type="button"
      className={`experiment-node-chip ${isSelected ? 'selected' : ''} ${isNegative ? 'negative-result' : ''}`}
      onClick={() => onSelect(experiment)}
      aria-expanded={isSelected}
    >
      <div className="node-chip-header">
        <span className="node-number">EXP {experiment.number}</span>
        <span className={`archival-stamp ${isNegative ? 'negative' : ''}`}>
          {isNegative ? 'NEGATIVE RESULT' : 'VERIFIED'}
        </span>
      </div>

      <div className="node-title">
        {experiment.shortTitle || experiment.title}
      </div>

      <div className="node-metrics-bar">
        <span className="node-headline-val">
          {experiment.headlineMetric?.value}
        </span>
        <span className="node-sub-val">
          {experiment.subMetric?.value}
        </span>
      </div>
    </button>
  );
}
