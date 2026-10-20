import React from 'react';

export default function MetricPill({ label, value, variant = 'neutral' }) {
  return (
    <div className={`metric-pill variant-${variant}`}>
      {label && <span className="metric-pill-label">{label}</span>}
      <span className="metric-pill-value">{value}</span>
    </div>
  );
}
