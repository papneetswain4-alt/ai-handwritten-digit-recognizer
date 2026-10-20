import React from 'react';

export default function ArchivalHeader({ healthStatus, onJumpToModel, onJumpToJourney }) {
  const isOnline = healthStatus && healthStatus.ok;

  return (
    <header className="app-header">
      <div className="header-brand-group">
        <a href="#/" className="header-logo" onClick={onJumpToModel}>
          AI LAB // RESEARCH ARCHIVE
        </a>
        <div className="header-status-indicator">
          <span className={`status-dot ${isOnline ? 'online' : ''}`} />
          <span>{isOnline ? 'INFERENCE ONLINE (PORT 8000)' : 'STANDBY / OFFLINE'}</span>
        </div>
      </div>

      <nav className="header-nav-links">
        <button type="button" className="nav-link-btn" onClick={onJumpToModel}>
          [ 00 // LIVE MODEL ]
        </button>
        <button type="button" className="nav-link-btn" onClick={onJumpToJourney}>
          [ 01–16 // JOURNEY MAP ]
        </button>
      </nav>
    </header>
  );
}
