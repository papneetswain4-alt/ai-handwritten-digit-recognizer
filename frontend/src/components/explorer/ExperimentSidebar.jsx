import React, { useState } from 'react';

const CATEGORIES = [
  'All',
  'Classical Machine Learning',
  'Deep Learning',
  'Diagnostics & Shift',
  'Interpretability & Calibration',
  'Transfer Learning & Freeze',
];

export default function ExperimentSidebar({ experiments, selectedId, onSelectExperiment }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredExperiments = experiments.filter((exp) => {
    const matchesSearch =
      exp.number.includes(searchTerm) ||
      exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || exp.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <aside className="experiment-sidebar">
      <div className="sidebar-header">
        <div className="sidebar-title-row">
          <span className="sidebar-title">CURRICULUM TIMELINE</span>
          <span className="sidebar-count">{experiments.length} Runs</span>
        </div>

        <div className="sidebar-search">
          <input
            type="text"
            placeholder="Search experiments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchTerm('')}
            >
              ×
            </button>
          )}
        </div>

        <div className="category-chips">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`chip ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === 'All' ? 'All (16)' : cat.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <nav className="experiment-list" aria-label="Experiment list">
        {filteredExperiments.map((exp) => {
          const isSelected = exp.id === selectedId;
          return (
            <button
              key={exp.id}
              type="button"
              className={`experiment-item ${isSelected ? 'active' : ''}`}
              onClick={() => onSelectExperiment(exp.id)}
            >
              <div className="item-left">
                <span className="item-num">{exp.number}</span>
              </div>
              <div className="item-info">
                <span className="item-title">{exp.title}</span>
                <div className="item-meta">
                  <span className="item-category">{exp.category}</span>
                  {exp.metrics?.accuracy && exp.metrics.accuracy !== 'N/A' && (
                    <span className="item-accuracy">{exp.metrics.accuracy}</span>
                  )}
                </div>
              </div>
            </button>
          );
        })}

        {filteredExperiments.length === 0 && (
          <div className="no-results">No experiments match your search.</div>
        )}
      </nav>
    </aside>
  );
}
