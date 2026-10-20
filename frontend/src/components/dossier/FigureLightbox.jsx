import React, { useEffect } from 'react';

export default function FigureLightbox({ figure, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!figure) return null;

  return (
    <div
      className="lightbox-modal"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Enlarged figure view"
    >
      <button
        type="button"
        className="lightbox-close-btn"
        onClick={onClose}
      >
        [ × CLOSE INSPECTION ]
      </button>

      <div
        className="lightbox-img-wrapper"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={figure.src} alt={figure.alt || 'Figure'} />
        <div style={{ marginTop: '12px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#111' }}>
          <strong>{figure.figureNumber}</strong> — {figure.caption}
        </div>
      </div>
    </div>
  );
}
