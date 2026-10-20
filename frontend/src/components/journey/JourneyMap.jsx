import React, { useState } from 'react';
import ChapterFolder from './ChapterFolder.jsx';

const CHAPTERS = [
  { id: 1, title: 'Foundations' },
  { id: 2, title: 'Neural Networks' },
  { id: 3, title: 'Understanding the Model' },
  { id: 4, title: 'Trust & Calibration' },
  { id: 5, title: 'Transfer & Generalization' },
  { id: 6, title: 'Production' },
];

export default function JourneyMap({ experiments, onOpenDossier }) {
  const [selectedExpId, setSelectedExpId] = useState(null);

  const handleSelectExperiment = (exp) => {
    setSelectedExpId((prev) => (prev === exp.id ? null : exp.id));
  };

  const handleCloseDrawer = () => {
    setSelectedExpId(null);
  };

  return (
    <section className="journey-section" id="journey-section">
      <div className="journey-masthead">
        <div className="journey-title-group">
          <h2>THE AI EXPERIMENT JOURNEY</h2>
          <p className="journey-subtitle">
            A chronological empirical progression across 16 verified research experiments and 6 chapters.
          </p>
        </div>

        <div className="journey-legend">
          <div className="legend-item">
            <span className="legend-swatch active" />
            <span>Active Path</span>
          </div>
          <div className="legend-item">
            <span className="legend-swatch negative" />
            <span>Negative Experiment</span>
          </div>
        </div>
      </div>

      <div className="chapters-stack">
        {CHAPTERS.map((chap) => {
          const chapExperiments = experiments.filter(
            (exp) => exp.chapterId === chap.id
          );

          return (
            <ChapterFolder
              key={chap.id}
              chapterId={chap.id}
              chapterTitle={chap.title}
              experiments={chapExperiments}
              selectedExpId={selectedExpId}
              onSelectExperiment={handleSelectExperiment}
              onOpenDossier={onOpenDossier}
              onCloseDrawer={handleCloseDrawer}
            />
          );
        })}
      </div>
    </section>
  );
}
