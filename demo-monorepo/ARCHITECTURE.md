# 🏗️ Architecture Overview

## System Design

This fully-mocked demo follows a **monorepo architecture** with:
- Shared packages for types and mock APIs
- Separate web and mobile apps
- No real backend - all logic runs on frontend
- State management with Zustand

---

## Monorepo Structure

```
demo-monorepo/
├── apps/
│   ├── web/          # React + Vite (desktop/tablet)
│   └── mobile/       # React Native + Expo (iOS/Android)
│
├── packages/
│   ├── types/        # Shared TypeScript types
│   └── mocks/        # Mock APIs & data
│
└── package.json      # Workspace configuration
```

### Why Monorepo?

1. **Code Reuse**: `packages/types` shared by both apps
2. **Consistency**: `packages/mocks` provides same behavior
3. **Single Version**: All apps updated together
4. **Easy Testing**: Test mocks independently
5. **Scalability**: Easy to add more apps later

---

## Data Flow

### Authentication Flow

```
User Input
    ↓
LoginPage / login.tsx
    ↓
mockLogin(email, password)  ← Any combination works
    ↓
Generate Fake JWT Token
    ↓
Save to localStorage/AsyncStorage
    ↓
Update Zustand Store
    ↓
Navigate to Home/Feed
```

### Inference Flow

```
User Upload / Post Visible
    ↓
Image/URL Selected
    ↓
mockInference(filename/url)
    ↓
Check Cache First
    ↓
If Cached → Return Immediately
    ↓
If Not Cached → 
    Simulate Network Delay (500-1500ms)
    ↓
    Generate Consistent Result
      - Hash filename/url
      - Use hash as seed
      - Always return same result
    ↓
    Cache Result
    ↓
    Return to Component
    ↓
Display in UI
```

---

## State Management

### Web State (Zustand)

```typescript
// Auth Store
useAuthStore() → {
  user: User | null,
  token: string | null,
  login(email, password),
  logout()
}

// Inference Store
useInferenceStore() → {
  results: Map<string, InferenceResult>,
  currentResult: InferenceResult | null,
  setResult(key, result),
  getResult(key)
}
```

### Mobile State (Zustand)

```typescript
// Auth Store (with SecureStore)
useMobileAuthStore() → {
  user: User | null,
  token: string | null,
  login(email, password),
  logout(),
  restoreAuth()  // SecureStore
}

// Inference Store
useMobileInferenceStore() → {
  results: Map<string, InferenceResult>,
  loading: Set<string>,
  getResult(url),
  setLoading(url, loading)
}
```

---

## Component Hierarchy

### Web App

```
App (Router)
├── /login
│   └── LoginPage
├── /upload
│   └── UploadPage
└── /report
    └── ReportPage

Layout (Header + Main)
├── Header (Logo, User, Logout)
└── Main Content (Pages)
```

### Mobile App

```
RootLayout (Conditional Auth)
├── NOT AUTHENTICATED
│   └── AuthLayout
│       └── LoginScreen
└── AUTHENTICATED
    ├── FeedScreen (Index)
    │   └── FlatList
    │       └── FeedCard (Per Post)
    │           ├── Image
    │           ├── Loading State
    │           └── Result Badge
    └── DetailScreen
        ├── Result Icon
        ├── Confidence Bar
        └── Artifacts List
```

---

## Mock APIs

### Inference Engine

**File:** `packages/mocks/inference.ts`

```typescript
export async function mockInference(
  fileOrUrl: string
): Promise<InferenceResult>

// Behavior:
// 1. Simulate network delay (500-1500ms)
// 2. Hash the input for consistency
// 3. Generate deterministic result from hash
// 4. Cache result for future calls
// 5. Return within 2 seconds
```

### Authentication

**File:** `packages/mocks/auth.ts`

```typescript
export async function mockLogin(
  email: string,
  password: string
): Promise<{ user: User; token: string }>

// Behavior:
// 1. Accept any email/password
// 2. Generate user object from email
// 3. Create fake JWT token
// 4. Return user + token
// 5. Update global auth state
```

### Mock Data

**File:** `packages/mocks/index.ts`

```typescript
export const mockPosts: Post[] = [
  // 15 posts with:
  // - Real Unsplash image URLs
  // - Mix of authors
  // - Varied captions
  // - Different timestamps
]
```

---

## Shared Types

**File:** `packages/types/index.ts`

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  token: string;
}

interface InferenceResult {
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

interface Post {
  id: string;
  mediaUrl: string;
  type: "image" | "video";
  caption?: string;
  author?: string;
  createdAt?: string;
}
```

---

## Caching Strategy

### Consistency

Same input always produces same output:

```typescript
// Hash-based determinism
hashString("photo.jpg") → 12345
seed = 12345 % 100      → 45
isReal = 45 > 40        → true (40% real)
confidence = 0.82 + ...  → 0.87

// Next time:
hashString("photo.jpg") → 12345  (same!)
// → Same result returned
```

### Storage

- **Web**: `localStorage` (survives page reload)
- **Mobile**: `AsyncStorage` (survives app restart)
- **In-Memory**: Zustand Map (fast lookups)

---

## Performance Considerations

### Optimization

1. **Caching**: Results never recalculated
2. **Lazy Inference**: Mobile only analyzes visible posts
3. **Debouncing**: Prevents redundant calls
4. **Batching**: State updates batched by Zustand
5. **Code Splitting**: Vite handles automatically

### Metrics

- **Load Time**: <2s (Vite + React)
- **Inference Time**: 500-1500ms (simulated)
- **Cache Hit**: <1ms
- **Memory**: ~2-5MB for app + state

---

## Security Notes

⚠️ **Demo Only** - NOT production-ready:

- ✅ JWT tokens are fake (base64 encoded, not cryptographic)
- ✅ No server-side validation
- ✅ All auth happens client-side
- ✅ File uploads are simulated (no actual upload)
- ✅ No database or persistence server

**For Production:**
- Implement real JWT signing/verification
- Validate tokens server-side
- Use HTTPS for all communications
- Store secrets in environment variables
- Add CORS headers properly
- Implement rate limiting
- Add CSRF protection

---

## Extensibility

### Adding a New Page (Web)

1. Create file: `apps/web/src/pages/NewPage.tsx`
2. Add route: `apps/web/src/App.tsx`
3. Create styles: `apps/web/src/pages/NewPage.css`
4. Use hooks: `useAuthStore()`, `useInferenceStore()`

### Adding a New Screen (Mobile)

1. Create file: `apps/mobile/app/newscreen.tsx`
2. Update layout: `apps/mobile/app/_layout.tsx`
3. Use hooks: `useMobileAuthStore()`, `useMobileInferenceStore()`

### Adding Mock Data

1. Edit: `packages/mocks/index.ts`
2. Add to `mockPosts` array
3. Both apps automatically see new data

### Modifying Inference Logic

1. Edit: `packages/mocks/inference.ts`
2. Change `generateConsistentResult()` function
3. Both apps use new logic immediately

---

## Testing Strategy

### Manual Testing

1. **Login Flow**: Any email/password works
2. **Upload Flow**: Can upload multiple files, same file returns same result
3. **Caching**: Upload twice, check instant result
4. **Mobile**: Scroll feed, posts auto-analyze
5. **Cross-App**: Web and mobile have same inference results

### Expected Results

- 60% of uploads/posts show FAKE
- 40% show REAL
- Confidence always 75-99%
- Same input always same result
- Delay simulates real inference (500-1500ms)

---

## Deployment Notes

### Web

```bash
# Build static files
npm run build:web

# Deploy to:
# - Vercel
# - Netlify
# - GitHub Pages
# - Any static host

# Features:
# - No backend needed
# - All mocks run in browser
# - Fast initial load
```

### Mobile

```bash
# Use Expo for easy distribution
# Build and submit with eas-cli
eas build

# Or use Expo Go for testing
# Scan QR code, test immediately

# Features:
# - Works on iOS/Android
# - No backend needed
# - Test on device easily
```

---

## Future Enhancements

### UI/UX
- [ ] Loading skeletons
- [ ] Shimmer effects
- [ ] Undo/Redo
- [ ] Batch analysis
- [ ] Result export
- [ ] Dark mode

### Features
- [ ] Video upload
- [ ] Batch analysis
- [ ] History tracking
- [ ] Result sharing
- [ ] Custom reports

### Technical
- [ ] Unit tests
- [ ] E2E tests
- [ ] TypeScript strict mode
- [ ] Accessibility (a11y)
- [ ] Performance metrics
- [ ] Error boundaries

---

## Key Design Decisions

| Decision | Reason |
|----------|--------|
| Monorepo | Code sharing, easy to maintain |
| Zustand | Lightweight, no boilerplate |
| Mock APIs | No backend complexity |
| Hash-based consistency | Deterministic results, easy to test |
| Separate web/mobile | Optimized UX per platform |
| TypeScript | Type safety across packages |
| Vite | Fast dev experience, small bundle |
| Expo | Easy mobile testing without emulator |

---

## Architecture Diagram

```
┌─────────────────────────────────────────┐
│       User Interface Layer              │
├─────────────────┬───────────────────────┤
│   Web (React)   │  Mobile (React Native)│
│   ├─ Login      │  ├─ Login             │
│   ├─ Upload     │  ├─ Feed              │
│   └─ Report     │  └─ Detail            │
└────────┬────────┴────────┬──────────────┘
         │                 │
         └────────┬────────┘
                  │
         ┌────────▼──────────┐
         │ State Management  │
         │    (Zustand)      │
         ├───────┬───────────┤
         │ Auth  │ Inference │
         └───────┴────┬──────┘
                      │
         ┌────────────▼──────────┐
         │    Mock APIs Layer    │
         ├───────────┬───────────┤
         │ Auth      │ Inference │
         │ mockLogin │ mockInfer │
         └───────────┴───────────┘
                      │
         ┌────────────▼──────────┐
         │   Shared Packages     │
         ├───────────┬───────────┤
         │   Types   │ Mock Data │
         └───────────┴───────────┘
```

---

**This architecture is optimized for demo purposes - clear, modular, and easy to understand.**
