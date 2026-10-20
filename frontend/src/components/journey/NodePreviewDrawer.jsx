import React from 'react';

export default function NodePreviewDrawer({ experiment, onOpenDossier, onClose }) {
  if (!experiment) return null;

  return (
    <div className="node-preview-drawer" role="region" aria-label={`Preview of Experiment ${experiment.number}`}>
      <div className="drawer-content">
        <div className="drawer-tagline">
          EXPERIMENT {experiment.number} // {experiment.title}
        </div>

        <div className="drawer-question">
          "{experiment.keyQuestion}"
        </div>

        <div className="drawer-takeaway">
          <strong>FINDING:</strong> {experiment.keyTakeaway}
        </div>
      </div>

      <div className="drawer-actions">
        <button
          type="button"
          className="btn-open-dossier"
          onClick={() => onOpenDossier(experiment.id)}
        >
          [▶] OPEN DOSSIER
        </button>
        <button
          type="button"
          className="btn-close-drawer"
          onClick={onClose}
        >
          Close Preview
        </button>
      </div>
    </div>
  );
}
