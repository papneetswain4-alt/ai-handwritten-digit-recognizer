import React, { useState } from 'react';
import CanvasWorkstation from './CanvasWorkstation.jsx';
import InferenceTelemetry from './InferenceTelemetry.jsx';
import PipelineStream from './PipelineStream.jsx';
import { predictDigit } from '../../services/api.js';

export default function ModelTestChamber({ onJumpToJourney }) {
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
      console.error('Inference Error:', err);
      setError(
        err.message || 'Inference engine unreachable. Ensure FastAPI is running on port 8000.'
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
    <section className="hero-section" id="model-section">
      <div className="hero-banner">
        <div className="hero-brand-statement">
          <h1>INTELLIGENCE DESIGNED TO EVOLVE</h1>
          <p>
            An empirical research chronicle of 16 machine learning experiments, culminating in a
            distribution-shift-resilient, calibrated Convolutional Neural Network.
          </p>
        </div>

        <div className="hero-meta-strip">
          <span className="archival-stamp">PRODUCTION CNN: 99.07%</span>
          <span className="archival-stamp">LATENCY: P50 1.175 MS</span>
          <span className="archival-stamp active">MODELS/CNN_MNIST.PT</span>
        </div>
      </div>

      <div className="model-workstation-grid">
        <CanvasWorkstation
          onPredict={handlePredict}
          onClear={handleClear}
          hasDrawing={hasDrawing}
          setHasDrawing={setHasDrawing}
          isLoading={isLoading}
        />

        <InferenceTelemetry
          prediction={prediction}
          isLoading={isLoading}
          error={error}
        />
      </div>

      <PipelineStream />

      <a
        href="#journey"
        className="journey-anchor-banner"
        onClick={(e) => {
          e.preventDefault();
          onJumpToJourney();
        }}
      >
        <div className="journey-anchor-left">
          <span className="journey-anchor-title">
            HOW DID THIS HAPPEN?
          </span>
          <span className="journey-anchor-desc">
            Explore the 16-experiment research path from raw pixels and non-parametric baselines to deep convolutional representations.
          </span>
        </div>
        <span className="journey-anchor-arrow">↓</span>
      </a>
    </section>
  );
}
