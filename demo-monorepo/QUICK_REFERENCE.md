# 📚 Quick Reference Guide

## Command Cheatsheet

### Installation & Setup
```bash
npm install                    # Install all dependencies
npm run dev:web              # Start web app
npm run dev:mobile           # Start mobile app
npm run build:web            # Build web for production
```

### Directory Navigation
```bash
cd apps/web                  # Web app folder
cd apps/mobile               # Mobile app folder
cd packages/types            # Shared types
cd packages/mocks            # Mock APIs
```

---

## File Locations

### Web App
```
apps/web/src/
├── pages/
│   ├── LoginPage.tsx        # Login form
│   ├── UploadPage.tsx       # File upload
│   └── ReportPage.tsx       # Results display
├── components/
│   └── Layout.tsx           # Header & layout
├── store/
│   ├── authStore.ts         # Auth state (Zustand)
│   └── inferenceStore.ts    # Results cache
├── App.tsx                  # Router setup
└── main.tsx                 # Entry point
```

### Mobile App
```
apps/mobile/app/
├── auth/
│   ├── login.tsx            # Login screen
│   └── _layout.tsx          # Auth navigator
├── index.tsx                # Feed screen
├── detail.tsx               # Results screen
└── _layout.tsx              # Main navigator

components/
└── FeedCard.tsx             # Post card component

store/
├── authStore.ts             # Mobile auth state
└── inferenceStore.ts        # Results cache
```

### Shared Code
```
packages/types/index.ts      # User, Post, InferenceResult
packages/mocks/
├── auth.ts                  # mockLogin(), mockLogout()
├── inference.ts             # mockInference()
└── index.ts                 # mockPosts array
```

---

## Common Tasks

### 🔐 How to Login
```
Email: any@email.com         (Accept any email)
Password: anypassword        (Accept any password)
Click: Sign In / Login
```

### 📤 How to Upload (Web)
1. Go to Upload page
2. Drag image onto dropzone OR click to browse
3. Preview shows
4. Click "Analyze Image"
5. Wait 500-1500ms
6. See results on Report page

### 📱 How to View Feed (Mobile)
1. Login with any email/password
2. Scroll vertically through posts
3. Posts auto-analyze when visible
4. Red/green badge appears
5. Tap post to see full results

### ↩️ How to Modify Mock Results
Edit `packages/mocks/inference.ts`:
```typescript
// Line: const isReal = seed > 40;
// Change 40 to adjust real/fake ratio
// 40 = 40% real, 60% fake (default)
// 50 = 50% real, 50% fake (balanced)
// 20 = 20% real, 80% fake (mostly fake)
```

### 🔄 How to Modify Mock Posts
Edit `packages/mocks/index.ts`:
```typescript
// Add to mockPosts array:
{
  id: "post-16",
  mediaUrl: "https://images.unsplash.com/...",
  type: "image",
  caption: "Your caption here",
  author: "Author Name",
  createdAt: new Date().toISOString(),
}
```

### 🔗 How to Change Inference Delay
Edit `packages/mocks/inference.ts`:
```typescript
// Line: const delay = Math.random() * 1000 + 500;
// 500-1500ms currently
// Change to: Math.random() * 500 + 200;
// For 200-700ms faster response
```

---

## Zustand Store Usage

### Web - Auth Store
```typescript
import { useAuthStore } from '@/store/authStore'

// In component:
const { user, token, login, logout } = useAuthStore()

// Login:
await login("user@email.com", "password")

// Logout:
await logout()
```

### Web - Inference Store
```typescript
import { useInferenceStore } from '@/store/inferenceStore'

// In component:
const { currentResult, setCurrentResult, results } = useInferenceStore()

// Get result:
const result = results.get(key)

// Set result:
setCurrentResult(result)
```

### Mobile - Auth Store
```typescript
import { useMobileAuthStore } from '@/store/authStore'

const { user, login, logout, restoreAuth } = useMobileAuthStore()
```

### Mobile - Inference Store
```typescript
import { useMobileInferenceStore } from '@/store/inferenceStore'

const { getResult, setResult, isLoading } = useMobileInferenceStore()
```

---

## React Router (Web)

### Page Navigation
```typescript
import { useNavigate } from 'react-router-dom'

const navigate = useNavigate()

// Go to upload page:
navigate('/upload')

// Go back:
navigate(-1)

// Replace history:
navigate('/login', { replace: true })
```

### Protected Routes
```typescript
// In App.tsx, routes check: if (!user) → redirect to /login
```

---

## Expo Router (Mobile)

### Navigation
```typescript
import { useRouter } from 'expo-router'

const router = useRouter()

// Navigate:
router.push('/detail')

// Replace:
router.replace('/')

// Navigate with params:
router.push({
  pathname: '/detail',
  params: { result: JSON.stringify(data) }
})
```

### Get Route Params
```typescript
import { useLocalSearchParams } from 'expo-router'

const { result } = useLocalSearchParams<{ result: string }>()
const data = JSON.parse(result)
```

---

## TypeScript Types

### InferenceResult
```typescript
{
  id: string                           // "inference-12345"
  label: "real" | "fake"              // Detection result
  confidence: number                  // 0.75-0.99
  modelVersion: string                // "demo-v1.0"
  timestamp: string                   // ISO date string
  details?: {
    artifactDetected: string[]        // ["Facial boundaries"]
    keyFrameAnalysis?: string         // "Temporal artifacts..."
  }
}
```

### User
```typescript
{
  id: string                          // "user-1234567890"
  email: string                       // "user@example.com"
  name: string                        // "User"
  token: string                       // "eyJhbGc..."
}
```

### Post
```typescript
{
  id: string                          // "post-1"
  mediaUrl: string                    // "https://..."
  type: "image" | "video"            // Media type
  caption?: string                    // "Caption text"
  author?: string                     // "Author Name"
  createdAt?: string                  // ISO timestamp
}
```

---

## Debugging

### Enable Logs
```typescript
// Add to inference.ts:
console.log('Inference called with:', input)
console.log('Hash:', hash, 'Result:', result)

// Add to auth.ts:
console.log('Login called with:', email)
console.log('Token generated:', token)
```

### Browser DevTools
```
Web App:
F12 → Console → See logs
F12 → Network → See simulated delays
F12 → Application → See localStorage

Mobile:
Expo DevTools in app → View console
Or use Flipper (React Native debugging tool)
```

### Clear Cache
```typescript
// Web localStorage:
localStorage.clear()

// Mobile AsyncStorage:
await AsyncStorage.clear()

// Zustand stores:
useAuthStore.setState({ user: null, token: null })
useInferenceStore.setState({ results: new Map() })
```

---

## Common Errors

### "Cannot find module '@mocks'"
**Fix:** Restart dev server - imports may need to reload

### "Login not working"
**Check:**
- Email field not empty
- Password field not empty
- Browser console for errors (F12)

### "Results not showing"
**Check:**
- Wait 500-1500ms for inference
- File uploaded successfully (preview shows)
- Try different file

### "Mobile app blank"
**Fix:**
- Pull down to refresh in Expo Go
- Restart `npm run dev:mobile`
- Clear cache: `expo start --clear`

### "TypeScript errors"
**Fix:**
- Save file to trigger check
- Restart dev server
- Check imports paths match files

---

## Performance Tips

### Optimize Bundle Size
```bash
npm run build:web
# Check dist/ folder size
# Should be <500KB for React + mocks
```

### Monitor Memory
```typescript
// Check Zustand store size:
console.log(useInferenceStore.getState().results.size)
// Should grow slowly as you upload files
```

### Cache Efficiency
```typescript
// Verify caching works:
// 1. Upload file1.jpg → wait 1.5s
// 2. Upload file1.jpg → instant (<10ms)
// 3. Upload file2.jpg → wait 1.5s again
```

---

## Style Customization

### Web - CSS Variables
Edit `apps/web/src/index.css`:
```css
:root {
  --primary-green: #10b981;      /* Change detection color */
  --primary-red: #ef4444;        /* Change fail color */
  --text-primary: #1f2937;       /* Text color */
  /* ... more variables ... */
}
```

### Mobile - StyleSheet
Edit component files:
```typescript
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#10b981',  /* Change any color */
    fontSize: 16,                /* Adjust fonts */
  }
})
```

---

## File Size Reference

After `npm install`:
```
node_modules/               ~500MB (normal!)
apps/web/dist/              ~200KB (after build)
apps/mobile/ (Expo build)   ~30MB (iOS/Android)
```

---

## Environment Variables

Not needed for demo, but for reference:
```
.env (never commit!)
VITE_API_URL=...
EXPO_PUBLIC_API_URL=...
```

---

## Git Workflow

```bash
# Check status
git status

# Stage changes
git add .

# Commit
git commit -m "Add feature description"

# Push
git push origin main
```

---

## Resources

- **React**: https://react.dev
- **React Native**: https://reactnative.dev
- **Expo**: https://expo.dev
- **Zustand**: https://github.com/pmndrs/zustand
- **Vite**: https://vitejs.dev
- **TypeScript**: https://www.typescriptlang.org

---

## Need Help?

1. Check **SETUP.md** for installation help
2. Check **README.md** for feature overview
3. Check **ARCHITECTURE.md** for design details
4. Check browser console for error messages (F12)
5. Try restarting dev server

---

**Keep this guide handy while developing! 📖**
