import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInferenceStore } from '../store/inferenceStore';
import './ReportPage.css';

export default function ReportPage() {
  const navigate = useNavigate();
  const { currentResult } = useInferenceStore();

  useEffect(() => {
    if (!currentResult) {
      navigate('/upload');
    }
  }, [currentResult, navigate]);

  if (!currentResult) {
    return null;
  }

  const isReal = currentResult.label === 'real';
  const confidencePercent = Math.round(currentResult.confidence * 100);

  return (
    <div className="report-container">
      <div className="report-header">
        <h2>Analysis Results</h2>
        <p className="timestamp">
          Generated: {new Date(currentResult.timestamp).toLocaleString()}
        </p>
      </div>

      <div className={`result-card result-${isReal ? 'real' : 'fake'}`}>
        <div className="result-label-section">
          <div className={`result-icon ${isReal ? 'real' : 'fake'}`}>
            {isReal ? '✓' : '⚠'}
          </div>
          <h1 className={`result-label ${isReal ? 'real' : 'fake'}`}>
            {isReal ? 'AUTHENTIC' : 'DEEPFAKE DETECTED'}
          </h1>
        </div>

        <div className="confidence-section">
          <div className="confidence-header">
            <span>Confidence Score</span>
            <span className="confidence-percent">{confidencePercent}%</span>
          </div>
          <div className={`progress-bar ${isReal ? 'real' : 'fake'}`}>
            <div
              className="progress-fill"
              style={{ width: `${confidencePercent}%` }}
              onAnimationEnd={() => {}}
            ></div>
          </div>
        </div>

        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Model Version</span>
            <span className="detail-value">{currentResult.modelVersion}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Analysis ID</span>
            <span className="detail-value detail-id">{currentResult.id}</span>
          </div>
        </div>

        {currentResult.details?.artifactDetected &&
          currentResult.details.artifactDetected.length > 0 && (
            <div className="artifacts-section">
              <h3>🔍 Detected Artifacts</h3>
              <ul className="artifacts-list">
                {currentResult.details.artifactDetected.map(
                  (artifact, idx) => (
                    <li key={idx}>{artifact}</li>
                  )
                )}
              </ul>
            </div>
          )}

        {currentResult.details?.keyFrameAnalysis && (
          <div className="analysis-section">
            <h3>📊 Analysis Summary</h3>
            <p>{currentResult.details.keyFrameAnalysis}</p>
          </div>
        )}
      </div>

      <div className="action-buttons">
        <button
          className="btn btn-secondary"
          onClick={() => navigate('/upload')}
        >
          ← Analyze Another Image
        </button>
      </div>

      <div className="info-box">
        <h4>ℹ️ About These Results</h4>
        <p>
          This is a demo simulation. In production, this platform would use
          advanced deep learning models to detect facial manipulation artifacts,
          temporal inconsistencies, and other indicators of synthetic media.
        </p>
      </div>
    </div>
  );
}
