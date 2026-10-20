import React from 'react';

export default function ArchivalFigure({ figure, onEnlarge }) {
  if (!figure) return null;

  return (
    <figure className="cell-figure-card">
      <div className="figure-header">
        <span className="figure-number">{figure.figureNumber}</span>
        <button
          type="button"
          onClick={() => onEnlarge(figure)}
          className="titlebar-btn"
        >
          [ ⚲ ENLARGE ]
        </button>
      </div>

      <div
        className="figure-img-container"
        onClick={() => onEnlarge(figure)}
        title="Click to inspect in fullscreen"
      >
        <img
          src={figure.src}
          alt={figure.alt || 'Notebook plot'}
          loading="lazy"
        />
      </div>

      <figcaption className="figure-caption">
        {figure.caption}
      </figcaption>
    </figure>
  );
}
