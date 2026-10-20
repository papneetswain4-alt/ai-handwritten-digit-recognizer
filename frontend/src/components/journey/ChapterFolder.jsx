import React from 'react';
import ExperimentNode from './ExperimentNode.jsx';
import NodePreviewDrawer from './NodePreviewDrawer.jsx';

export default function ChapterFolder({
  chapterId,
  chapterTitle,
  experiments,
  selectedExpId,
  onSelectExperiment,
  onOpenDossier,
  onCloseDrawer,
}) {
  const selectedInChapter = experiments.find((exp) => exp.id === selectedExpId);

  return (
    <section className="chapter-container">
      <div className="chapter-header">
        <div className="chapter-tag-group">
          <span className="chapter-number">CH.0{chapterId}</span>
          <h3 className="chapter-title">{chapterTitle}</h3>
        </div>
        <span className="chapter-count">{experiments.length} EXPERIMENTS</span>
      </div>

      <div className="chapter-nodes-grid">
        {experiments.map((exp) => (
          <ExperimentNode
            key={exp.id}
            experiment={exp}
            isSelected={selectedExpId === exp.id}
            onSelect={onSelectExperiment}
          />
        ))}

        {selectedInChapter && (
          <NodePreviewDrawer
            experiment={selectedInChapter}
            onOpenDossier={onOpenDossier}
            onClose={onCloseDrawer}
          />
        )}
      </div>
    </section>
  );
}
