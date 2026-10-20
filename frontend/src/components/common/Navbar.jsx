import React from 'react';

export default function Navbar({ activeTab, setActiveTab, healthStatus, onRefreshHealth }) {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <div className="brand-logo">
          <span className="logo-symbol">◈</span>
          <span className="logo-title">AI LAB</span>
        </div>
        <span className="brand-badge">RESEARCH &amp; DEPLOYMENT</span>
      </div>

      <nav className="navbar-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'explorer'}
          className={`nav-tab ${activeTab === 'explorer' ? 'active' : ''}`}
          onClick={() => setActiveTab('explorer')}
        >
          <span className="tab-icon">🔬</span>
          <span>Experiment Explorer</span>
          <span className="tab-counter">16/16</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'live'}
          className={`nav-tab ${activeTab === 'live' ? 'active' : ''}`}
          onClick={() => setActiveTab('live')}
        >
          <span className="tab-icon">⚡</span>
          <span>Live AI Predictor</span>
          <span className="tab-pill">CNN 99.07%</span>
        </button>
      </nav>

      <div className="navbar-status">
        <div 
          className={`status-indicator ${healthStatus.ok ? 'online' : 'offline'}`}
          title={healthStatus.ok ? `FastAPI backend active: ${healthStatus.model}` : `Backend unavailable: ${healthStatus.error || 'Port 8000'}`}
          onClick={onRefreshHealth}
        >
          <span className="status-dot" />
          <span className="status-label">
            {healthStatus.ok ? `API: Online` : `API: Offline`}
          </span>
          <span className="status-sub">
            {healthStatus.ok ? `(cnn_mnist)` : `(Port 8000)`}
          </span>
        </div>
      </div>
    </header>
  );
}
