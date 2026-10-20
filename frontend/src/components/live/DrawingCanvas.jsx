import React, { useRef, useEffect } from 'react';

const CANVAS_SIZE = 280;
const STROKE_WIDTH = 18;

export default function DrawingCanvas({
  onPredict,
  onClear,
  hasDrawing,
  setHasDrawing,
  isLoading,
  error,
}) {
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);

  const initCanvas = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handlePointerDown = (e) => {
    e.target.setPointerCapture(e.pointerId);
    isDrawingRef.current = true;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e);

    ctx.strokeStyle = '#ffffff';
    ctx.fillStyle = '#ffffff';
    ctx.lineWidth = STROKE_WIDTH;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y);
    ctx.stroke();

    setHasDrawing(true);
  };

  const handlePointerMove = (e) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e);

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handlePointerUp = (e) => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    try {
      e.target.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if released
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.closePath();
  };

  const handleClearClick = () => {
    initCanvas();
    setHasDrawing(false);
    if (onClear) onClear();
  };

  const handlePredictClick = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (blob && onPredict) {
        onPredict(blob);
      }
    }, 'image/png');
  };

  return (
    <div className="canvas-card">
      <div className="canvas-header-row">
        <span className="card-title">DIGIT DRAWING CANVAS</span>
        <span className={`canvas-status-tag ${hasDrawing ? 'active' : 'idle'}`}>
          {hasDrawing ? 'Stroke Active' : 'Canvas Empty'}
        </span>
      </div>

      <div className="canvas-wrapper">
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerCancel={handlePointerUp}
          aria-label="Digit drawing canvas"
          role="img"
          className="drawing-canvas"
        />
      </div>

      {error && (
        <div className="error-banner" role="alert">
          <span className="error-icon">⚠️</span>
          <span className="error-msg">{error}</span>
        </div>
      )}

      <div className="canvas-actions">
        <button
          type="button"
          className="btn-secondary"
          onClick={handleClearClick}
          disabled={isLoading}
          id="clear-btn"
        >
          Clear Canvas
        </button>

        <button
          type="button"
          className="btn-primary"
          onClick={handlePredictClick}
          disabled={isLoading || !hasDrawing}
          id="predict-btn"
        >
          {isLoading ? 'Recognizing...' : 'Predict Digit'}
        </button>
      </div>

      <div className="canvas-hint">
        Draw any single digit (0–9) clearly in the center of the black box.
      </div>
    </div>
  );
}
