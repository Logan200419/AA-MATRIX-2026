# 🔍 DeepfakeDetect - Fully Mocked Demo Platform

A complete demo version of an AI-powered deepfake detection platform with **zero real backend**. Everything is mocked on the frontend for realistic UI/UX simulation.

## ✨ Features

### 🌐 Web App (React + Vite)
- **Login System**: Accept any email/password for demo
- **Upload Interface**: Drag & drop or file picker for images
- **Analysis Results**: Real-time detection with confidence scores
- **Color-Coded Feedback**: Green for authentic, red for deepfake
- **Responsive Design**: Works on desktop and tablet

### 📱 Mobile App (React Native + Expo)
- **Instagram-Style Feed**: Full-screen post scrolling
- **Real-Time Analysis**: Auto-analysis for visible posts
- **Shimmer Effects**: Loading states for realism
- **Cached Results**: Consistent results per post
- **Touch-Optimized**: Native mobile experience

### 🔐 Mock Auth
```typescript
// Accepts ANY email/password combination
mockLogin("user@example.com", "password123")
// Returns fake JWT token stored in localStorage/AsyncStorage
```

### 🧠 Mock Inference Engine
```typescript
// Simulates 500ms - 1500ms network delay
mockInference(fileOrUrl)
// Returns consistent results based on input hash
// Same input always returns same result
```

### 💾 State Management
- **Zustand** for lightweight state
- Auth state persistence
- Inference result caching
- Platform-specific (web uses localStorage, mobile uses AsyncStorage)

---

## 📁 Project Structure

```
demo-monorepo/
├── apps/
│   ├── web/                # React + Vite + TypeScript
│   │   ├── src/
│   │   │   ├── pages/      # Login, Upload, Report
│   │   │   ├── components/ # Layout, etc.
│   │   │   ├── store/      # Zustand stores
│   │   │   └── App.tsx
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   └── index.html
│   │
│   └── mobile/             # React Native + Expo
│       ├── app/            # Expo Router screens
│       │   ├── auth/       # Login screen
│       │   ├── index.tsx   # Feed screen
│       │   ├── detail.tsx  # Result screen
│       │   └── _layout.tsx # Navigation
│       ├── components/     # FeedCard, etc.
│       ├── store/          # Auth & inference stores
│       ├── package.json
│       └── app.json
│
├── packages/
│   ├── types/              # Shared TypeScript types
│   │   └── index.ts
│   │
│   └── mocks/              # Mock APIs & data
│       ├── inference.ts    # Mock inference engine
│       ├── auth.ts         # Mock authentication
│       └── index.ts        # Mock posts data
│
└── package.json            # Workspace root
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
cd demo-monorepo
npm install
```

### Web App

```bash
npm run dev:web
# Opens at http://localhost:5173
```

**Test Login:**
- Email: `any-email@example.com`
- Password: `any-password`

### Mobile App

```bash
# Install expo CLI first (optional)
npm install -g expo-cli

# Start Expo development server
npm run dev:mobile
```

Then use Expo app or emulator to preview:
- iOS Simulator: `i`
- Android Emulator: `a`
- Web: `w`

---

## 🎯 How It Works

### Mock Authentication Flow

```typescript
// 1. User submits email + password (any combination works)
await mockLogin("user@example.com", "password")

// 2. System generates fake JWT token
const token = "eyJhbGc..." // Base64 encoded

// 3. Store in localStorage (web) or AsyncStorage (mobile)
localStorage.setItem('authToken', token)

// 4. Restore on app reload
restoreAuthState()
```

### Mock Inference Flow

```typescript
// 1. User uploads image
// 2. Generate hash from filename/URL
const hash = hashString("photo.jpg")

// 3. Use hash to seed consistent random values
// Same file always returns same result

// 4. Simulate network delay (500-1500ms)
await new Promise(r => setTimeout(r, randomDelay))

// 5. Return result with:
// - 60% fake, 40% real distribution
// - Confidence: 75-99%
// - Detected artifacts (if fake)
// - Timestamp
```

### Caching Strategy

**Web:**
```typescript
// Zustand store with Map
useInferenceStore().results.get(key)
```

**Mobile:**
```typescript
// Per-post caching with loading states
getResult(post.mediaUrl) // Returns cached result
setLoading(url, true)    // Track loading state
```

---

## 🎨 UI/UX Highlights

### Web App
- ✨ Smooth animations and transitions
- 🎯 Clear visual hierarchy
- 📊 Progress bars for confidence
- 🎨 Color-coded results (green/red)
- 📱 Fully responsive design
- ⚡ Fast drag-and-drop uploads

### Mobile App
- 📸 Instagram-style vertical scrolling
- 🔄 Auto-analysis on scroll
- 🏷️ Real-time result badges
- ⏱️ Realistic loading shimmer
- 🎬 Smooth animations
- 📊 Bottom sheet result details

---

## 🔌 Key Components

### `mockInference(input: string)`
Simulates deepfake detection:
- **Delay**: 500-1500ms
- **Consistency**: Same input → same result
- **Results**: 60% fake, 40% real
- **Details**: Artifact detection, frame analysis

### `mockLogin(email, password)`
Authentication simulator:
- **Accepts**: Any email/password
- **Returns**: User object + JWT token
- **Storage**: localStorage/AsyncStorage

### State Stores
- `useAuthStore` (web): Auth state with login/logout
- `useInferenceStore` (web): Results caching
- `useMobileAuthStore`: Mobile auth with SecureStore
- `useMobileInferenceStore`: Mobile result caching

---

## 🛠️ Development Tips

### Adding More Mock Posts
Edit `packages/mocks/index.ts`:
```typescript
export const mockPosts: Post[] = [
  // Add more posts with Unsplash or placeholder URLs
]
```

### Customizing Detection Logic
Edit `packages/mocks/inference.ts`:
```typescript
function generateConsistentResult(input: string, hash: number) {
  // Modify seed % values to change fake/real distribution
  // Adjust confidence range
  // Add custom artifacts
}
```

### Styling
- **Web**: CSS modules in each component folder
- **Mobile**: StyleSheet objects in React Native components

### Testing
```bash
# Web build
npm run build:web

# Mobile build (Expo CLI required)
expo build:ios
expo build:android
```

---

## 📊 Mock Data

### Inference Result
```typescript
{
  id: "inference-12345",
  label: "fake",                    // or "real"
  confidence: 0.92,                 // 75-99%
  modelVersion: "demo-v1.0",
  timestamp: "2024-04-28T...",
  details: {
    artifactDetected: [
      "Facial boundaries",
      "Eye pupil anomalies"
    ],
    keyFrameAnalysis: "Temporal artifacts detected..."
  }
}
```

### User Object
```typescript
{
  id: "user-1234567890",
  email: "user@example.com",
  name: "User",
  token: "eyJhbGc..."
}
```

---

## ⚠️ Demo Constraints

### By Design (Demo Only)
- ✅ No real ML model
- ✅ No Triton server
- ✅ No actual file upload
- ✅ Mocked authentication
- ✅ Simulated inference

### Not Included
- ❌ Real backend API
- ❌ Database
- ❌ Production deployment config
- ❌ Error handling for real failures
- ❌ Rate limiting

---

## 🎓 Learning Points

This demo illustrates:

1. **Monorepo Structure**: Shared packages with multiple apps
2. **State Management**: Zustand for lightweight state
3. **Mock APIs**: Realistic simulation without backends
4. **UI/UX Patterns**: Loading states, error handling, animations
5. **React Patterns**: Hooks, context, router
6. **React Native**: Mobile-first UI, Expo setup
7. **TypeScript**: Type safety across packages
8. **Responsive Design**: Web and mobile adaptation

---

## 📝 Notes

- **All results are deterministic**: Same input always produces same output
- **Results are cached**: Prevents redundant API calls
- **Network delays are simulated**: Realistic UX feedback
- **Authentication is stateless**: No session management needed
- **Mobile has offline capability**: Results persist across sessions

---

## 🤝 Contributing

To enhance the demo:

1. Add more mock posts to mobile feed
2. Create additional detection patterns
3. Improve animations and transitions
4. Add loading skeletons
5. Implement error states
6. Add accessibility features

---

## 📄 License

Demo project - Use freely for learning and reference.

---

## 🚀 Next Steps (For Production)

When building the real platform:

1. Replace `mockInference` with real API calls to Triton server
2. Implement real authentication with JWT validation
3. Add database for user management
4. Implement file upload to cloud storage
5. Add error handling and retry logic
6. Set up monitoring and logging
7. Add rate limiting and authentication checks

---

**Built with ❤️ for demonstration purposes**
