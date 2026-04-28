# 🚀 Setup Guide - DeepfakeDetect Demo

This guide walks you through setting up and running the demo platform.

## Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher
- **Git** (optional, for version control)

### Check Your Versions

```bash
node --version  # Should be v18.x.x or higher
npm --version   # Should be 9.x.x or higher
```

---

## Installation Steps

### 1. Navigate to the Project

```bash
cd /Users/manikandan/AA-MATRIX-2026/demo-monorepo
```

### 2. Install Dependencies

```bash
npm install
```

This will:
- Install root dependencies
- Install dependencies for all workspace packages
- Set up `node_modules` structure

**Time**: ~2-3 minutes (depending on internet speed)

---

## Running the Web App

### Start Development Server

```bash
npm run dev:web
```

This will:
- Start Vite development server
- Open browser at `http://localhost:5173`
- Auto-reload on file changes

### Test the Web App

1. **Login Page**
   - Enter any email: `test@example.com`
   - Enter any password: `password123`
   - Click "Sign In"

2. **Upload Page**
   - Drag & drop an image OR click to browse
   - Preview appears automatically
   - Click "Analyze Image"

3. **Report Page**
   - See if image is "REAL" or "FAKE"
   - Confidence score with progress bar
   - Detected artifacts (if deepfake)
   - Click "Analyze Another Image" to go back

**Demo Tip:** Try uploading the same image twice - you'll see the same result due to caching!

---

## Running the Mobile App

### Prerequisites for Expo

```bash
# Install Expo CLI (optional, can use npx)
npm install -g expo-cli
```

### Start Expo Development Server

```bash
npm run dev:mobile
```

This will start the Expo dev server and show options:

### Connect a Device

**Option 1: Expo Go App (Easiest)**
- Download "Expo Go" app from App Store or Google Play
- Scan the QR code from terminal
- App opens instantly in Expo Go

**Option 2: iOS Simulator** (macOS only)
- Press `i` in terminal
- Simulator opens with app

**Option 3: Android Emulator** (Windows, Mac, Linux)
- Launch Android Emulator first
- Press `a` in terminal
- App opens in emulator

### Test the Mobile App

1. **Login Screen**
   - Enter any email and password
   - Tap "Sign In"

2. **Feed Screen**
   - Scroll vertically through posts
   - Each post auto-analyzes when visible
   - Green badge = REAL, Red badge = FAKE
   - Tap any post to see details

3. **Detail Screen**
   - See full analysis results
   - Confidence percentage with progress bar
   - Tap "Back to Feed" to continue scrolling

---

## Project Structure Overview

```
demo-monorepo/
├── apps/
│   ├── web/                # React app (what you'll build for web)
│   └── mobile/             # React Native app (iOS/Android)
│
├── packages/
│   ├── types/              # Shared TypeScript types
│   └── mocks/              # Mock APIs (no backend!)
│
└── README.md               # Full documentation
```

---

## Building for Production

### Web App

```bash
npm run build:web
# Creates optimized build in apps/web/dist/
```

### Mobile App (Requires Expo Account)

```bash
npm install -g eas-cli
cd apps/mobile
eas build
```

---

## Troubleshooting

### Issue: `npm install` fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Issue: Web app won't start

**Solution:**
```bash
# Make sure you're in the right directory
cd /Users/manikandan/AA-MATRIX-2026/demo-monorepo

# Kill any existing processes on port 5173
lsof -i :5173
kill -9 <PID>

# Try again
npm run dev:web
```

### Issue: Mobile app shows blank screen

**Solution:**
```bash
# Restart Expo dev server
# Press Ctrl+C to stop, then run again
npm run dev:mobile

# In Expo Go app: pull down to refresh
```

### Issue: Can't login

**Solution:**
- Demo accepts ANY email/password
- Try: `user@test.com` / `password`
- Check browser console for errors (F12)

### Issue: Analysis doesn't show result

**Solution:**
- Wait 2-3 seconds (simulating network delay)
- Upload different file (some have 60% fake rate)
- Check if caching is working (same file should be instant)

---

## Development Workflow

### 1. Making Changes to Web App

```bash
# Edit files in apps/web/src/
# Changes auto-reload in browser

# Example: Edit LoginPage
code apps/web/src/pages/LoginPage.tsx
```

### 2. Making Changes to Mobile App

```bash
# Edit files in apps/mobile/
# Press 'r' in Expo terminal to reload

# Example: Edit login screen
code apps/mobile/app/auth/login.tsx
```

### 3. Making Changes to Shared Code

```bash
# Edit in packages/types/ or packages/mocks/
# Both apps use these shared types and mock APIs

# Example: Add new inference logic
code packages/mocks/inference.ts
```

---

## Understanding the Mock System

### How Authentication Works

```typescript
// apps/web/src/store/authStore.ts
// accepts ANY email/password
await mockLogin("any@email.com", "anypassword")
// returns fake JWT token
// stores in localStorage
```

### How Inference Works

```typescript
// packages/mocks/inference.ts
// Simulates 500-1500ms delay
await mockInference(filename)
// Same filename always returns same result (cached)
// 60% fake, 40% real distribution
// Returns confidence 75-99%
```

### How Results are Cached

**Web:**
```typescript
// Zustand store
useInferenceStore().results.get(key)
```

**Mobile:**
```typescript
// Per-post caching
useMobileInferenceStore().getResult(url)
```

---

## Key Files to Know

| File | Purpose |
|------|---------|
| `packages/mocks/inference.ts` | Mock detection logic |
| `packages/mocks/auth.ts` | Mock authentication |
| `apps/web/src/pages/LoginPage.tsx` | Web login |
| `apps/web/src/pages/UploadPage.tsx` | Web upload |
| `apps/web/src/pages/ReportPage.tsx` | Web results |
| `apps/mobile/app/auth/login.tsx` | Mobile login |
| `apps/mobile/app/index.tsx` | Mobile feed |
| `apps/mobile/app/detail.tsx` | Mobile results |

---

## Next Steps

1. ✅ Get the app running locally
2. ✅ Test both web and mobile flows
3. ✅ Explore the mock APIs
4. ✅ Try uploading different files
5. ✅ Check the caching behavior
6. ✅ Read the main README.md for deep dive

---

## Tips & Tricks

- **Same file = same result**: Try uploading a screenshot twice
- **Network delay**: Simulated 500-1500ms wait mimics real API
- **Color coding**: Green = REAL, Red = FAKE (intuitive!)
- **Mobile scroll**: Try scrolling slowly to watch posts load
- **DevTools**: Open browser DevTools (F12) to see network timing

---

## Questions?

Refer to main [README.md](./README.md) for:
- Architecture details
- Component structure
- State management patterns
- Production readiness notes

---

**Happy testing! 🚀**
