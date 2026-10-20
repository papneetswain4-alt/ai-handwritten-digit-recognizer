import React from 'react';

export default function ProbabilityDistribution({ probabilities, predictedDigit }) {
  if (!probabilities) return null;

  return (
    <div className="prob-card">
      <div className="prob-header">
        <span className="card-title">10-CLASS POSTERIOR DISTRIBUTION</span>
        <span className="prob-legend">Softmax P(y = k | x)</span>
      </div>

      <div className="prob-list">
        {Array.from({ length: 10 }, (_, i) => {
          // Backend returns keys as string numbers "0", "1", ...
          const prob = probabilities[String(i)] ?? probabilities[i] ?? 0;
          const probPct = (prob * 100).toFixed(1);
          const isWinner = predictedDigit === i;

          return (
            <div
              key={i}
              className={`prob-row ${isWinner ? 'is-winner' : ''}`}
              id={`prob-row-${i}`}
            >
              <div className="prob-digit-badge">
                <span>{i}</span>
              </div>

              <div className="prob-track">
                <div
                  className={`prob-fill ${isWinner ? 'winner-fill' : ''}`}
                  style={{ width: `${Math.max(prob * 100, 0.8)}%` }}
                />
              </div>

              <span className="prob-percent">{probPct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
