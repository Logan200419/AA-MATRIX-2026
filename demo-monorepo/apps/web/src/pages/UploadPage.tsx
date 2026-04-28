import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockInference } from '@mocks/inference';
import { useInferenceStore } from '../store/inferenceStore';
import './UploadPage.css';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const { setCurrentResult, setIsLoading } = useInferenceStore();

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setError('');
    } else {
      setError('Please select an image file');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.currentTarget.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setIsAnalyzing(true);
    setIsLoading(true);

    try {
      const result = await mockInference(file.name);
      setCurrentResult(result);
      navigate('/report');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setIsAnalyzing(false);
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setPreview(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-header">
        <h2>Analyze Media</h2>
        <p className="upload-subtitle">
          Upload an image or video to detect if it's authentic or deepfaked
        </p>
      </div>

      <div className="upload-card">
        {!preview ? (
          <div
            className="dropzone"
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              e.currentTarget.classList.add('drag-active');
            }}
            onDragLeave={(e) => {
              e.currentTarget.classList.remove('drag-active');
            }}
            onClick={handleClick}
          >
            <div className="dropzone-content">
              <div className="upload-icon">📤</div>
              <h3>Drop your image here</h3>
              <p>or click to browse</p>
              <p className="format-hint">Supports: PNG, JPG, GIF</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              style={{ display: 'none' }}
            />
          </div>
        ) : (
          <div className="preview-container">
            <div className="preview-image">
              <img src={preview} alt="Preview" />
            </div>
            <div className="preview-info">
              <h3>📄 {file?.name}</h3>
              <p className="file-size">
                {file && (file.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <button
                type="button"
                className="change-btn"
                onClick={handleClear}
                disabled={isAnalyzing}
              >
                Choose Different File
              </button>
            </div>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <div className="button-group">
          {preview && (
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="analyze-btn"
            >
              {isAnalyzing ? (
                <>
                  <span className="spinner"></span>
                  Analyzing...
                </>
              ) : (
                <>
                  🔍 Analyze Image
                </>
              )}
            </button>
          )}
        </div>

        <div className="info-section">
          <h4>ℹ️ How it works:</h4>
          <ul>
            <li>Upload an image file (PNG, JPG, or GIF)</li>
            <li>AI model analyzes facial features and artifacts</li>
            <li>Get instant results with confidence score</li>
            <li>Results are cached for consistency</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
