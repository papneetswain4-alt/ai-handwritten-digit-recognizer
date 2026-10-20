import React, { useState } from 'react';
import ExperimentSidebar from './ExperimentSidebar.jsx';
import ExperimentDetail from './ExperimentDetail.jsx';

export default function ExperimentExplorer({ experiments }) {
  const [selectedId, setSelectedId] = useState('06'); // Default to CNN (Exp 06) or 01

  const currentIndex = experiments.findIndex((e) => e.id === selectedId);
  const currentExperiment = experiments[currentIndex] || experiments[0];

  const handleNext = () => {
    if (currentIndex < experiments.length - 1) {
      setSelectedId(experiments[currentIndex + 1].id);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedId(experiments[currentIndex - 1].id);
    }
  };

  return (
    <div className="explorer-container">
      <ExperimentSidebar
        experiments={experiments}
        selectedId={selectedId}
        onSelectExperiment={setSelectedId}
      />
      <main className="explorer-main">
        <ExperimentDetail
          experiment={currentExperiment}
          onSelectNext={handleNext}
          onSelectPrev={handlePrev}
          hasNext={currentIndex < experiments.length - 1}
          hasPrev={currentIndex > 0}
        />
      </main>
    </div>
  );
}
