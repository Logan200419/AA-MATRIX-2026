# 📋 Project Index - DeepfakeDetect Demo Monorepo

## Overview

This is a **fully mocked demo** of an AI-powered deepfake detection platform with zero real backend. Everything runs on the frontend.

---

## 📂 Complete File Structure

```
demo-monorepo/
│
├── 📖 Documentation
│   ├── README.md                 # Main documentation
│   ├── SETUP.md                  # Installation & getting started
│   ├── ARCHITECTURE.md           # System design & data flow
│   ├── QUICK_REFERENCE.md        # Developer cheatsheet
│   └── INDEX.md                  # This file
│
├── 📦 Root Configuration
│   ├── package.json              # Workspace config with scripts
│   ├── .gitignore                # Git ignore rules
│   └── tsconfig.json             # Root TypeScript config
│
├── 🖥️ Web App (React)
│   └── apps/web/
│       ├── package.json          # Web app dependencies
│       ├── vite.config.ts        # Vite configuration
│       ├── tsconfig.json         # Web TypeScript config
│       ├── tsconfig.node.json    # Vite TypeScript config
│       ├── index.html            # Entry HTML
│       └── src/
│           ├── main.tsx          # React entry point
│           ├── App.tsx           # Router setup
│           ├── App.css           # Global styles
│           ├── index.css         # Theme variables
│           ├── pages/
│           │   ├── LoginPage.tsx
│           │   ├── LoginPage.css
│           │   ├── UploadPage.tsx
│           │   ├── UploadPage.css
│           │   ├── ReportPage.tsx
│           │   └── ReportPage.css
│           ├── components/
│           │   ├── Layout.tsx    # Header & layout
│           │   └── Layout.css
│           ├── store/
│           │   ├── authStore.ts  # Zustand auth state
│           │   └── inferenceStore.ts  # Results cache
│           └── hooks/            # (Ready for custom hooks)
│
├── 📱 Mobile App (React Native)
│   └── apps/mobile/
│       ├── package.json          # Mobile dependencies
│       ├── app.json              # Expo configuration
│       ├── components/
│       │   └── FeedCard.tsx      # Post card component
│       ├── store/
│       │   ├── authStore.ts      # Mobile auth with SecureStore
│       │   └── inferenceStore.ts # Results cache
│       ├── hooks/                # (Ready for custom hooks)
│       └── app/                  # Expo Router screens
│           ├── _layout.tsx       # Navigation root
│           ├── index.tsx         # Feed screen
│           ├── detail.tsx        # Results screen
│           └── auth/
│               ├── _layout.tsx   # Auth navigator
│               └── login.tsx     # Login screen
│
└── 📚 Shared Packages
    └── packages/
        │
        ├── types/                # TypeScript types
        │   ├── package.json
        │   ├── tsconfig.json
        │   └── index.ts          # All types exported here
        │
        └── mocks/                # Mock APIs & data
            ├── package.json
            ├── tsconfig.json
            ├── auth.ts           # mockLogin, mockLogout
            ├── inference.ts      # mockInference with caching
            └── index.ts          # mockPosts data
```

---

## 🔑 Key Files to Know

| File | Purpose | When to Edit |
|------|---------|--------------|
| `packages/types/index.ts` | All TypeScript types | Add new types |
| `packages/mocks/inference.ts` | Detection logic | Change fake/real ratio |
| `packages/mocks/auth.ts` | Login behavior | Modify token format |
| `packages/mocks/index.ts` | Mock posts | Add new posts |
| `apps/web/src/App.tsx` | Web routing | Add new pages |
| `apps/web/src/store/authStore.ts` | Web auth state | Web-specific auth logic |
| `apps/web/src/pages/LoginPage.tsx` | Login UI | Customize login form |
| `apps/mobile/app/_layout.tsx` | Mobile routing | Add new screens |
| `apps/mobile/store/authStore.ts` | Mobile auth | Mobile-specific auth logic |
| `apps/mobile/app/auth/login.tsx` | Mobile login UI | Customize mobile login |

---

## 🚀 Getting Started

### 1. Install
```bash
cd /Users/manikandan/AA-MATRIX-2026/demo-monorepo
npm install
```

### 2. Run Web
```bash
npm run dev:web
# Opens http://localhost:5173
```

### 3. Run Mobile
```bash
npm run dev:mobile
# Shows Expo options: press 'i' (iOS), 'a' (Android), or 'w' (web)
```

### 4. Build
```bash
npm run build:web    # Creates optimized build
```

---

## 📝 Documentation Map

- **README.md** → Complete feature overview, architecture, UX highlights
- **SETUP.md** → Step-by-step installation, troubleshooting, testing guide
- **ARCHITECTURE.md** → System design, data flow, component hierarchy
- **QUICK_REFERENCE.md** → Commands, file locations, common tasks
- **INDEX.md** → This file, project structure overview

---

## ✨ Features at a Glance

### Web App
- ✅ Login (any email/password)
- ✅ Upload image (drag-drop or picker)
- ✅ Get analysis (REAL/FAKE)
- ✅ View confidence & artifacts
- ✅ Mobile responsive

### Mobile App
- ✅ Instagram-style feed
- ✅ Auto-analysis visible posts
- ✅ Real-time result badges
- ✅ Tap to see full results
- ✅ Scroll caching

### Tech Stack
- ✅ React 18 + Vite (web)
- ✅ React Native + Expo (mobile)
- ✅ TypeScript (all code)
- ✅ Zustand (state)
- ✅ Mock APIs (no backend)

---

## 🎯 Common Tasks

| Task | Command | File |
|------|---------|------|
| Start web dev | `npm run dev:web` | - |
| Start mobile dev | `npm run dev:mobile` | - |
| Add new web page | Create in `apps/web/src/pages/` | App.tsx |
| Add new mobile screen | Create in `apps/mobile/app/` | _layout.tsx |
| Modify mock detection | Edit `packages/mocks/inference.ts` | generateConsistentResult() |
| Add mock posts | Edit `packages/mocks/index.ts` | mockPosts array |
| Change auth behavior | Edit `packages/mocks/auth.ts` | mockLogin() |
| Update shared types | Edit `packages/types/index.ts` | Export interface |

---

## 🔌 API Reference

### Mock Login
```typescript
await mockLogin("any@email.com", "password")
// Returns: { user: User, token: string }
```

### Mock Inference
```typescript
await mockInference(filename)
// Delay: 500-1500ms
// Returns: InferenceResult (cached for same input)
```

### State Management
```typescript
// Web
useAuthStore()           // { user, token, login, logout }
useInferenceStore()      // { results, setResult, getResult }

// Mobile
useMobileAuthStore()     // Same + restoreAuth
useMobileInferenceStore() // { getResult, setResult, isLoading }
```

---

## 📊 Metrics

- **Total Files**: ~30
- **Lines of Code**: ~3000+
- **Components**: 8
- **Mock APIs**: 3
- **Documentation**: 2000+ lines
- **No Backend**: 100% frontend

---

## ⚙️ Configuration Files

- `package.json` → Workspace config, scripts
- `vite.config.ts` → Web build config
- `tsconfig.json` → TypeScript settings
- `app.json` → Expo mobile config
- `.gitignore` → Git ignore rules

---

## 🧪 Testing

### Manual Testing
1. Login with any credentials
2. Upload same file twice (check caching)
3. Scroll mobile feed (check auto-analysis)
4. Verify results are consistent

### Expected Results
- 60% deepfakes, 40% authentic
- Confidence 75-99%
- Same file = same result
- Delay simulates 500-1500ms

---

## 📈 Scalability

### Easy to Add
- ✅ New pages (web)
- ✅ New screens (mobile)
- ✅ New mock data
- ✅ New shared types
- ✅ New API endpoints

### Already Optimized For
- ✅ Result caching
- ✅ State management
- ✅ Code sharing
- ✅ TypeScript type safety
- ✅ Responsive design

---

## 🚨 Important Notes

⚠️ **Demo Only** - NOT for production:
- All auth is mocked
- No database
- No real file upload
- No server-side validation
- Results are simulated

For production, replace:
- `mockLogin()` → Real authentication
- `mockInference()` → Real ML model
- Client state → Server database

---

## 🎓 Learning Resources

This demo teaches:
- Monorepo architecture
- State management with Zustand
- Mock API patterns
- Web + mobile cross-platform development
- TypeScript in React
- Responsive design
- Component composition

---

## 📞 Quick Links

- **Web App**: http://localhost:5173 (after `npm run dev:web`)
- **Mobile Dev**: Expo app (after `npm run dev:mobile`)
- **Package Scripts**: `npm run` (shows all available)
- **Node Modules**: ~/.npm (npm cache)

---

## ✅ Checklist

- [x] Monorepo structure created
- [x] Shared types package
- [x] Mock APIs implemented
- [x] Web app (React)
- [x] Mobile app (React Native)
- [x] State management (Zustand)
- [x] Authentication flow
- [x] Inference caching
- [x] Responsive design
- [x] Complete documentation
- [x] Quick reference guide
- [x] Architecture documentation

---

**Ready to build? Start with:** `npm install` then `npm run dev:web` 🚀

For help, see SETUP.md or QUICK_REFERENCE.md
