import React, { useRef, useEffect } from 'react';

const CANVAS_SIZE = 280;
const STROKE_WIDTH = 18;

export default function CanvasWorkstation({
  onPredict,
  onClear,
  hasDrawing,
  setHasDrawing,
  isLoading,
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
    <div className="canvas-workstation-panel">
      <div className="canvas-panel-header">
        <span>INPUT WORKSTATION</span>
        <span>280 × 280 PX</span>
      </div>

      <div className="canvas-interactive-area">
        <div className="canvas-frame">
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            role="img"
            aria-label="Draw a handwritten digit on this canvas"
          />
        </div>

        <div className="canvas-controls-bar">
          <button
            type="button"
            className="btn-canvas btn-canvas-clear"
            onClick={handleClearClick}
            disabled={!hasDrawing || isLoading}
          >
            Clear
          </button>
          <button
            type="button"
            className="btn-canvas btn-canvas-predict"
            onClick={handlePredictClick}
            disabled={!hasDrawing || isLoading}
          >
            {isLoading ? 'Evaluating...' : 'Predict'}
          </button>
        </div>
      </div>
    </div>
  );
}
