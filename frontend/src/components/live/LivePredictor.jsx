import React, { useState } from 'react';
import DrawingCanvas from './DrawingCanvas.jsx';
import PredictionResult from './PredictionResult.jsx';
import ProbabilityDistribution from './ProbabilityDistribution.jsx';
import PipelineVisualizer from './PipelineVisualizer.jsx';
import ModelCard from './ModelCard.jsx';
import { predictDigit } from '../../services/api.js';

export default function LivePredictor() {
  const [hasDrawing, setHasDrawing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handlePredict = async (imageBlob) => {
    if (!imageBlob) return;
    setIsLoading(true);
    setError(null);

    try {
      const data = await predictDigit(imageBlob);
      setPrediction(data);
    } catch (err) {
      console.error('Inference API Error:', err);
      setError(
        err.message || 'Failed to connect to the AI inference server. Ensure FastAPI is running on port 8000.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setPrediction(null);
    setError(null);
    setHasDrawing(false);
  };

  return (
    <div className="live-predictor-container">
      {/* Top Banner */}
      <div className="live-header-banner">
        <div className="live-title-group">
          <span className="live-pill">PRODUCTION INFERENCE ENGINE</span>
          <h2 className="live-heading">Interactive Handwritten Digit Recognizer</h2>
          <p className="live-subheading">
            Draw a digit (0–9) on the canvas to test the frozen production CNN with upstream Phase 10 preprocessing.
          </p>
        </div>
      </div>

      {/* Main Two-Column Interactive Workspace */}
      <div className="live-workspace-grid">
        {/* Left Column: Canvas & Controls */}
        <section className="live-left-column">
          <DrawingCanvas
            onPredict={handlePredict}
            onClear={handleClear}
            hasDrawing={hasDrawing}
            setHasDrawing={setHasDrawing}
            isLoading={isLoading}
            error={error}
          />
        </section>

        {/* Right Column: Prediction Result & Class Probabilities */}
        <section className="live-right-column">
          <PredictionResult
            prediction={prediction}
            isLoading={isLoading}
          />

          <ProbabilityDistribution
            probabilities={prediction?.probabilities}
            predictedDigit={prediction?.digit}
          />
        </section>
      </div>

      {/* Pipeline Visualizer: How the Model Sees It */}
      <section className="live-pipeline-section">
        <PipelineVisualizer />
      </section>

      {/* Official Frozen Model Card */}
      <section className="live-modelcard-section">
        <ModelCard />
      </section>
    </div>
  );
}
