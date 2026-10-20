import React, { useState, useEffect, useRef } from 'react';
import ResearchCodeBlock from './ResearchCodeBlock.jsx';
import TerminalConsoleOutput from './TerminalConsoleOutput.jsx';
import ArchivalFigure from './ArchivalFigure.jsx';
import FigureLightbox from './FigureLightbox.jsx';
import { getDossier } from '../../services/dossierService.js';

export default function DossierModal({ expId, onClose }) {
  const [dossier, setDossier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [enlargedFigure, setEnlargedFigure] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      const data = await getDossier(expId);
      if (isMounted) {
        setDossier(data);
        setLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, [expId]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !enlargedFigure) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, enlargedFigure]);

  if (!expId) return null;

  return (
    <div
      className="dossier-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Experiment ${expId} Dossier`}
    >
      <div
        className="dossier-window"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Window Titlebar */}
        <div className="archival-window-titlebar">
          <div className="titlebar-left">
            <div className="titlebar-dots">
              <span className="titlebar-dot" />
              <span className="titlebar-dot" />
            </div>
            <span className="titlebar-title">
              ARCHIVE DOSSIER // EXP-{expId}
            </span>
          </div>
          <div className="titlebar-right">
            <span className="titlebar-tag">
              {dossier ? `notebooks/${dossier.notebookFilename}` : 'LOADING...'}
            </span>
            <button
              type="button"
              className="titlebar-btn"
              onClick={onClose}
              title="Close Dossier (Esc)"
            >
              [ × CLOSE ]
            </button>
          </div>
        </div>

        {/* Stepped Archival Folder Tabs (Reference 2 Inspiration) */}
        <div className="archival-folder-tabs">
          <button
            type="button"
            className={`folder-tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            [ FULL DOSSIER ]
          </button>
          <button
            type="button"
            className={`folder-tab ${activeTab === 'theory' ? 'active' : ''}`}
            onClick={() => setActiveTab('theory')}
          >
            THEORY &amp; CONTEXT
          </button>
          <button
            type="button"
            className={`folder-tab ${activeTab === 'code' ? 'active' : ''}`}
            onClick={() => setActiveTab('code')}
          >
            CODE &amp; CONSOLE
          </button>
          <button
            type="button"
            className={`folder-tab ${activeTab === 'figures' ? 'active' : ''}`}
            onClick={() => setActiveTab('figures')}
          >
            ARTIFACTS &amp; PLOTS ({dossier?.figureCount || 0})
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="dossier-scroll-area" ref={scrollRef}>
          {loading ? (
            <div style={{ padding: '60px', textAlign: 'center', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              &gt; ACCESSING ARCHIVE FOR EXPERIMENT {expId}...
            </div>
          ) : !dossier ? (
            <div style={{ padding: '40px', color: '#ff8888', fontFamily: 'var(--font-mono)' }}>
              [!] Failed to load dossier for Experiment {expId}.
            </div>
          ) : (
            <>
              {/* Dossier Header & Metadata Grid */}
              <div className="dossier-header-block">
                <div className="dossier-hero-number">
                  CHAPTER 0{dossier.chapterId}: {dossier.chapterTitle} • EXPERIMENT {dossier.number}
                </div>
                <h2 className="dossier-hero-title">{dossier.title}</h2>

                {/* Archival Metadata Table */}
                <div className="archival-meta-grid">
                  {Object.entries(dossier.verifiedMetrics || {}).map(([key, val]) => (
                    <div key={key} className="archival-meta-cell">
                      <span className="archival-meta-label">{key}</span>
                      <span className="archival-meta-value">{val}</span>
                    </div>
                  ))}
                </div>

                <div style={{ background: 'var(--color-black)', padding: '16px', border: '1px solid var(--color-gray-700)', marginBottom: '24px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    CENTRAL RESEARCH QUESTION:
                  </div>
                  <div style={{ fontStyle: 'italic', color: 'var(--color-white)', fontSize: '15px' }}>
                    "{dossier.keyQuestion}"
                  </div>
                </div>

                <div style={{ background: 'var(--color-ink-900)', padding: '14px', borderLeft: '3px solid var(--color-white)', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-primary)' }}>
                  <strong>EMPIRICAL TAKEAWAY:</strong> {dossier.keyTakeaway}
                </div>
              </div>

              {/* Linear Stream of Notebook Cells */}
              <div className="notebook-cells-stream">
                {dossier.cells.map((cell) => {
                  // Tab filtering
                  if (activeTab === 'theory' && cell.cellType !== 'markdown') return null;
                  if (activeTab === 'code' && cell.cellType !== 'code') return null;
                  if (activeTab === 'figures') {
                    const hasImage = cell.outputs?.some((o) => o.outputType === 'image');
                    if (!hasImage) return null;
                  }

                  if (cell.cellType === 'markdown') {
                    return (
                      <div
                        key={cell.cellIndex}
                        className="cell-markdown-block"
                        dangerouslySetInnerHTML={{
                          __html: formatMarkdown(cell.source),
                        }}
                      />
                    );
                  }

                  if (cell.cellType === 'code') {
                    const codeFigures = cell.outputs?.filter((o) => o.outputType === 'image') || [];
                    const htmlOutputs = cell.outputs?.filter((o) => o.outputType === 'html') || [];
                    const streamOutputs = cell.outputs?.filter(
                      (o) => o.outputType === 'stream' || o.outputType === 'execute_result'
                    ) || [];

                    return (
                      <div key={cell.cellIndex} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                        {activeTab !== 'figures' && (
                          <ResearchCodeBlock
                            code={cell.source}
                            executionCount={cell.executionCount}
                            cellIndex={cell.cellIndex}
                          />
                        )}

                        {activeTab !== 'figures' && streamOutputs.map((out, idx) => (
                          <TerminalConsoleOutput
                            key={idx}
                            text={out.text}
                            name={out.name}
                            outputType={out.outputType}
                          />
                        ))}

                        {htmlOutputs.map((htmlOut, idx) => (
                          <div
                            key={idx}
                            style={{ overflowX: 'auto', padding: '14px', background: '#fff', color: '#111', border: '1px solid var(--color-gray-700)' }}
                            dangerouslySetInnerHTML={{ __html: htmlOut.html }}
                          />
                        ))}

                        {codeFigures.map((fig, idx) => (
                          <ArchivalFigure
                            key={idx}
                            figure={fig}
                            onEnlarge={setEnlargedFigure}
                          />
                        ))}
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {enlargedFigure && (
        <FigureLightbox
          figure={enlargedFigure}
          onClose={() => setEnlargedFigure(null)}
        />
      )}
    </div>
  );
}

/**
 * Lightweight safe markdown formatter for notebook markdown text
 */
function formatMarkdown(src) {
  if (!src) return '';
  let html = src
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold & italic
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    // Code ticks
    .replace(/`([^`]+)`/gim, '<code>$1</code>')
    // Bullet lists
    .replace(/^\s*[-*]\s+(.*$)/gim, '<li>$1</li>')
    // Line breaks / paragraphs
    .replace(/\n\n+/g, '</p><p>');

  // Wrap list items
  html = html.replace(/(<li>[\s\S]*?<\/li>)/gm, '<ul>$1</ul>');
  return `<p>${html}</p>`;
}
