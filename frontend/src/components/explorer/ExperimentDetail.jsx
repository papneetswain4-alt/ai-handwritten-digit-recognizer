import React from 'react';
import MetricsTable from './MetricsTable.jsx';
import TakeawaysCard from './TakeawaysCard.jsx';
import MetricPill from '../common/MetricPill.jsx';

export default function ExperimentDetail({ experiment, onSelectNext, onSelectPrev, hasNext, hasPrev }) {
  if (!experiment) return null;

  return (
    <article className="experiment-detail-panel">
      {/* Header Banner */}
      <header className="detail-header">
        <div className="header-meta-row">
          <span className="exp-badge category-badge">{experiment.category}</span>
          <span className="exp-badge file-badge">notebooks/{experiment.notebook}</span>
          {experiment.badge && (
            <span className="exp-badge highlight-badge">{experiment.badge}</span>
          )}
        </div>

        <div className="title-row">
          <span className="hero-exp-num">EXP {experiment.number}</span>
          <h2 className="hero-exp-title">{experiment.title}</h2>
        </div>

        {/* Top Metric Pills */}
        <div className="hero-metrics-bar">
          {experiment.metrics?.accuracy && experiment.metrics.accuracy !== 'N/A' && (
            <MetricPill label="Test Accuracy" value={experiment.metrics.accuracy} variant="cyan" />
          )}
          {experiment.metrics?.errors !== undefined && experiment.metrics.errors !== 'N/A' && (
            <MetricPill label="Test Errors" value={`${experiment.metrics.errors} / ${experiment.metrics.totalTest || 10000}`} variant="neutral" />
          )}
          {experiment.parameters?.total && experiment.parameters.total !== 'N/A' && (
            <MetricPill label="Parameters" value={experiment.parameters.total} variant="neutral" />
          )}
          {experiment.metrics?.trainingTime && (
            <MetricPill label="Train / Eval Time" value={experiment.metrics.trainingTime} variant="neutral" />
          )}
        </div>
      </header>

      {/* Question & Objective Callout */}
      <section className="detail-section callout-section">
        <div className="core-question-box">
          <span className="section-label">CENTRAL RESEARCH QUESTION</span>
          <p className="question-text">"{experiment.question}"</p>
        </div>

        <div className="objective-box">
          <span className="section-label">EXPERIMENTAL OBJECTIVE</span>
          <p className="objective-text">{experiment.objective}</p>
        </div>
      </section>

      {/* Technical Specifications Grid */}
      <section className="detail-section">
        <h3 className="section-title">Technical Specifications</h3>
        <div className="specs-grid">
          <div className="spec-card">
            <span className="spec-label">Dataset &amp; Resolution</span>
            <span className="spec-val-primary">{experiment.dataset.name}</span>
            <span className="spec-val-sub">{experiment.dataset.resolution}</span>
            <span className="spec-val-sub">{experiment.dataset.samples}</span>
          </div>

          <div className="spec-card">
            <span className="spec-label">Method &amp; Algorithm</span>
            <span className="spec-val-primary">{experiment.method}</span>
            <span className="spec-val-sub">{experiment.architecture}</span>
          </div>

          <div className="spec-card">
            <span className="spec-label">Parameter Breakdown</span>
            <span className="spec-val-primary">Total: {experiment.parameters.total}</span>
            <span className="spec-val-sub">Trainable: {experiment.parameters.trainable}</span>
            {experiment.parameters.frozen && (
              <span className="spec-val-sub">Frozen: {experiment.parameters.frozen}</span>
            )}
          </div>

          <div className="spec-card">
            <span className="spec-label">Optimization &amp; Runtime</span>
            {Object.entries(experiment.hyperparameters).map(([key, val]) => (
              <div key={key} className="hyperparam-row">
                <span className="hp-key">{key}:</span>
                <span className="hp-val">{String(val)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benchmark Results Table */}
      {experiment.comparisonTable && experiment.comparisonTable.length > 0 && (
        <section className="detail-section">
          <h3 className="section-title">Measured Benchmark Results</h3>
          <MetricsTable rows={experiment.comparisonTable} />
        </section>
      )}

      {/* Key Observations */}
      {experiment.keyObservations && experiment.keyObservations.length > 0 && (
        <section className="detail-section">
          <h3 className="section-title">Key Empirical Observations</h3>
          <ul className="observations-list">
            {experiment.keyObservations.map((obs, idx) => (
              <li key={idx} className="observation-item">
                <span className="obs-bullet">▸</span>
                <span className="obs-text">{obs}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Takeaways Card */}
      <section className="detail-section">
        <TakeawaysCard
          whatChanged={experiment.whatChanged}
          whatWeLearned={experiment.whatWeLearned}
        />
      </section>

      {/* Pagination Footer */}
      <footer className="detail-pagination">
        <button
          type="button"
          className="btn-pagination"
          onClick={onSelectPrev}
          disabled={!hasPrev}
        >
          ← Previous Experiment
        </button>

        <span className="pagination-info">
          Experiment {experiment.number} of 16
        </span>

        <button
          type="button"
          className="btn-pagination"
          onClick={onSelectNext}
          disabled={!hasNext}
        >
          Next Experiment →
        </button>
      </footer>
    </article>
  );
}
