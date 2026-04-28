import type { InferenceResult, Post } from "../types";

// Simple hash function for consistent results
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Cache for consistent results per input
const inferenceCache = new Map<string, InferenceResult>();

// Simulate different detection patterns based on URL/filename
function generateConsistentResult(
  input: string,
  hash: number
): InferenceResult {
  const seed = hash % 100;
  const isReal = seed > 40; // 60% fake, 40% real for demo variety

  // More confidence for consistent results
  const baseConfidence = 0.82 + (seed % 15) / 100; // 0.82 - 0.97
  const confidence = Math.min(0.99, Math.max(0.75, baseConfidence));

  return {
    id: `inference-${hash}`,
    label: isReal ? "real" : "fake",
    confidence: parseFloat(confidence.toFixed(3)),
    modelVersion: "demo-v1.0",
    timestamp: new Date().toISOString(),
    details: {
      artifactDetected: isReal
        ? []
        : [
            "Facial boundaries",
            "Eye pupil anomalies",
            "Skin texture inconsistency",
          ].slice(0, Math.floor(seed / 30) + 1),
      keyFrameAnalysis: isReal
        ? "No inconsistencies detected"
        : "Temporal artifacts detected in frame transitions",
    },
  };
}

export async function mockInference(
  fileOrUrl: string
): Promise<InferenceResult> {
  // Check cache first
  if (inferenceCache.has(fileOrUrl)) {
    return inferenceCache.get(fileOrUrl)!;
  }

  // Simulate network delay
  const delay = Math.random() * 1000 + 500; // 500ms - 1500ms
  await new Promise((resolve) => setTimeout(resolve, delay));

  // Generate consistent result based on input hash
  const hash = hashString(fileOrUrl);
  const result = generateConsistentResult(fileOrUrl, hash);

  // Cache the result
  inferenceCache.set(fileOrUrl, result);

  return result;
}

export function clearInferenceCache(): void {
  inferenceCache.clear();
}

export function getCachedInference(input: string): InferenceResult | null {
  return inferenceCache.get(input) || null;
}
