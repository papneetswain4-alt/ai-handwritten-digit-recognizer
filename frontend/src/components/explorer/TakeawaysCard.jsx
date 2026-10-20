import React from 'react';

export default function TakeawaysCard({ whatChanged, whatWeLearned }) {
  return (
    <div className="takeaways-grid">
      <div className="takeaway-box change-box">
        <div className="takeaway-header">
          <span className="takeaway-icon">⟳</span>
          <h4>What Changed From Previous Experiment?</h4>
        </div>
        <p className="takeaway-text">{whatChanged}</p>
      </div>

      <div className="takeaway-box learning-box">
        <div className="takeaway-header">
          <span className="takeaway-icon">💡</span>
          <h4>What Did We Learn?</h4>
        </div>
        <p className="takeaway-text">{whatWeLearned}</p>
      </div>
    </div>
  );
}
