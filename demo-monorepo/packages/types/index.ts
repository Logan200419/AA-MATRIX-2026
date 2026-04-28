export interface InferenceResult {
  id: string;
  label: "real" | "fake";
  confidence: number;
  modelVersion: string;
  timestamp: string;
  details?: {
    artifactDetected: string[];
    keyFrameAnalysis?: string;
  };
}

export interface Post {
  id: string;
  mediaUrl: string;
  type: "image" | "video";
  caption?: string;
  author?: string;
  createdAt?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  token: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}

export interface InferenceCache {
  [key: string]: InferenceResult;
}
