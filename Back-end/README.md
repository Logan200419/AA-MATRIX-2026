# AA-MATRIX: Production-Grade Full-Stack Deepfake Detection System

A comprehensive, scalable application featuring a React web app, React Native mobile app, and Express.js backend, all integrated with NVIDIA Triton Inference Server for real-time deepfake detection.

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    USERS                                    │
├────────────────────┬────────────────────┬──────────────────┤
│   Web Browser      │  Mobile App (iOS)  │  Mobile App (Android) │
└────────────────────┼────────────────────┴──────────────────┘
                     │
         ┌───────────▼───────────┐
         │   API Gateway         │
         │ (Express.js Backend)  │
         └───────────┬───────────┘
                     │
         ┌───────────┴─────────────────┐
         │                             │
    ┌────▼──────┐            ┌────────▼──────┐
    │  Auth     │            │  Inference    │
    │  Service  │            │  Service      │
    └───────────┘            └────────┬──────┘
                                      │
                       ┌──────────────▼──────────────┐
                       │  NVIDIA Triton Server       │
                       │  (Deepfake Detection)       │
                       └─────────────────────────────┘
```

## 📋 Project Structure

```
AA-MATRIX-2026/
├── backend/                    # Express.js API
│   ├── src/
│   │   ├── config/            # Config management
│   │   ├── middleware/        # Auth, error handling
│   │   ├── routes/            # API endpoints
│   │   ├── services/          # Business logic
│   │   ├── utils/             # Helpers & validators
│   │   ├── app.js             # Express app
│   │   └── index.js           # Server entry
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── web/                        # React web app
│   ├── src/
│   │   ├── components/        # UI components
│   │   ├── pages/             # Page screens
│   │   ├── services/          # API clients
│   │   ├── context/           # State management (Zustand)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── README.md
│
├── mobile/                     # React Native app
│   ├── src/
│   │   ├── screens/           # Screen components
│   │   ├── components/        # Reusable components
│   │   ├── services/          # API clients
│   │   ├── context/           # State management (Zustand)
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── README.md
│
└── README.md                   # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL 12+ (for production)
- NVIDIA Triton Server (for inference)
- Git

### 1. Backend Setup

```bash
cd backend
cp .env.example .env
npm install

# Edit .env with your configuration
# - Database credentials
# - JWT secrets
# - Triton server URL

npm run dev
```

Server runs on `http://localhost:3001`

### 2. Web App Setup

```bash
cd web
npm install
npm run dev
```

App opens at `http://localhost:3000`

### 3. Mobile App Setup

```bash
cd mobile
npm install

# iOS
npm run ios

# Android
npm run android
```

## 🔐 Authentication System

### JWT-Based Architecture

1. **Registration/Login**
   - User provides email & password
   - Backend validates and hashes password with bcryptjs (10 salt rounds)
   - Returns access token (7-day expiration) & refresh token (30-day expiration)

2. **Token Storage**
   - **Web**: Access token in localStorage, refresh token in httpOnly cookie
   - **Mobile**: Both tokens in encrypted AsyncStorage

3. **Token Refresh**
   - Automatic refresh on 401 response
   - Refresh token rotated on each refresh
   - Seamless user experience without re-login

4. **Session Handling**
   - Logout clears both tokens
   - Expired sessions redirect to login
   - Secure logout across platforms

### API Endpoints

**Authentication:**
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user profile

## 🤖 Inference Integration

### Triton Server Communication

The system integrates with NVIDIA Triton Inference Server for deepfake detection:

```
User Upload
    ↓
Backend API
    ↓
File Validation
    ↓
Triton Server (HTTP/gRPC)
    ↓
Inference Result
    ↓
Parse & Format Response
    ↓
Return to Client
```

### Inference Endpoints

**Web Upload:**
- `POST /api/inference/upload` - Single image upload with inference
- Returns: Classification (Real/Fake), confidence score, metadata

**Mobile Batch:**
- `POST /api/inference/batch` - Multiple images for feed analysis
- Returns: Results array with status for each image

**History:**
- `GET /api/inference/history` - Get all inference results
- `GET /api/inference/results/:id` - Get specific result

### Response Format

```json
{
  "result": {
    "id": 1,
    "userId": 1,
    "fileName": "image.jpg",
    "inference": {
      "classification": "Real",
      "confidence": 95.23,
      "modelVersion": "1",
      "timestamp": "2024-01-15T10:30:00Z",
      "metadata": {
        "fileName": "image.jpg",
        "mimeType": "image/jpeg",
        "fileSize": 102400
      }
    },
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

## 🌐 Web Application

### Features

- **Secure Authentication**: Register, login, logout with JWT
- **Image Upload**: Drag-and-drop or file picker
- **Real-Time Analysis**: Send to Triton and display results
- **Professional Reports**: Structured result display
- **Session Management**: Auto token refresh, logout

### Pages

1. **Login Page** - User authentication
2. **Register Page** - New user registration  
3. **Dashboard** - Main interface with upload & results

### Technology Stack

- React 18 with Hooks
- Zustand for state management
- Axios for API calls
- Tailwind CSS for styling
- Vite for bundling
- React Router for navigation

## 📱 Mobile Application

### Features

- **Instagram-Style Feed**: Infinite scrolling vertical feed
- **Real-Time Inference**: Automatic analysis as items become visible
- **Non-Intrusive Badges**: Real/Fake indicators on top-right
- **Caching**: Local result caching
- **Performance**: Optimized rendering and network calls
- **Secure Auth**: JWT tokens in secure storage

### Screens

1. **Feed Screen** - Content feed with inference badges
2. **Profile Screen** - User info and settings
3. **Login Screen** - Authentication

### Performance Optimizations

- **Debounced Inference**: 500ms debounce on inference calls
- **Visibility Detection**: Only process visible items
- **Local Caching**: Avoid redundant API calls
- **Background Processing**: Non-blocking operations
- **Memory Management**: Proper resource cleanup

### Technology Stack

- React Native 0.72
- React Navigation for routing
- Zustand for state management
- Axios for API calls
- Async Storage for secure token storage
- Lodash debounce for performance

## 🔧 Configuration

### Backend .env

```bash
# Environment
NODE_ENV=development
PORT=5000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=aa_matrix
DB_USER=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRE=30d

# Triton
TRITON_SERVER_URL=http://localhost:8000
TRITON_MODEL_NAME=deepfake_detector
TRITON_MODEL_VERSION=1

# Files
MAX_FILE_SIZE=52428800
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,image/webp,video/mp4

# CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:8081
```

### Web .env

```bash
VITE_API_URL=http://localhost:3001
```

### Mobile (apiClient.js)

```javascript
const API_URL = 'http://your-backend-url:5000';
```

## 📦 Deployment

### Using Docker

```bash
# Backend
docker-compose -f docker-compose.backend.yml up -d

# Web
docker-compose -f docker-compose.web.yml up -d

# Mobile requires native app stores
```

### Manual Deployment

**Backend (Ubuntu/Debian):**
```bash
# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and setup
git clone <repo>
cd backend
npm install
pm2 start src/index.js --name aa-matrix-api

# Setup reverse proxy (Nginx)
# Configure SSL with Let's Encrypt
```

**Web (Vercel/Netlify):**
```bash
# Build
npm run build

# Deploy dist/ folder
# Configure environment variables
# Set API_URL to production backend
```

**Mobile (App Stores):**
```bash
# iOS
npm run build-ios
# Submit to App Store

# Android
npm run build-android
# Submit to Google Play
```

## 🧪 Testing

### Backend

```bash
cd backend
npm test
```

### Web

```bash
cd web
npm run test
```

### Mobile

```bash
cd mobile
npm test
```

## 📊 Monitoring & Logging

### Backend Logs

- Request logging with timestamps and durations
- Error logging with stack traces
- Health check endpoints
- Triton server status monitoring

### Application Monitoring

- API response times
- Error rates
- User authentication attempts
- Inference success/failure rates

## 🔒 Security Best Practices

### Implemented

- ✅ Passwords hashed with bcryptjs (10 rounds)
- ✅ JWT tokens with expiration
- ✅ Refresh token rotation
- ✅ CORS with domain whitelist
- ✅ Helmet.js for security headers
- ✅ Input validation (Joi)
- ✅ File upload validation
- ✅ HTTP-only cookies
- ✅ Secure token storage

### Recommended for Production

- ✅ Enable HTTPS/SSL
- ✅ Use environment variables for secrets
- ✅ Rate limiting on auth endpoints
- ✅ DDoS protection
- ✅ Regular security audits
- ✅ Database encryption
- ✅ VPN for internal services
- ✅ Web Application Firewall (WAF)

## 📈 Scalability

### Current Architecture

- Stateless backend (easy horizontal scaling)
- Session storage in tokens (no session store needed)
- Inference caching (reduces API calls)
- File upload optimization

### Future Improvements

- Database connection pooling
- Redis caching layer
- Message queue (RabbitMQ/Kafka)
- Load balancing
- Microservices architecture
- Kubernetes deployment

## 🐛 Troubleshooting

### Common Issues

**CORS Errors**
- Ensure backend CORS includes your frontend URL
- Check browser console for exact error

**Token Expiration**
- Automatically handled by interceptors
- Check refresh token in storage
- Verify JWT_REFRESH_SECRET matches

**Triton Connection Failed**
- Verify Triton server is running
- Check TRITON_SERVER_URL is correct
- Verify network connectivity

**Upload Failures**
- Check file size (max 50MB)
- Verify file type is allowed
- Check disk space on server

**Performance Issues**
- Monitor API response times
- Check database query efficiency
- Implement caching strategies
- Use CDN for static files

## 📚 Documentation

Each project includes detailed README:

- [Backend README](./backend/README.md)
- [Web README](./web/README.md)
- [Mobile README](./mobile/README.md)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues and questions:
- Check documentation
- Review troubleshooting guide
- Open GitHub issue
- Contact support team

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Core authentication
- ✅ Image upload & inference
- ✅ Feed interface
- ✅ Real-time indicators

### Phase 2
- Real-time notifications
- Batch processing
- Advanced analytics
- User history dashboard

### Phase 3
- Video analysis
- Webhook integrations
- API rate limiting
- Advanced caching

### Phase 4
- Kubernetes deployment
- Multi-language support
- Mobile app optimization
- Enterprise features

## 📞 Contact

- **Email**: support@aa-matrix.com
- **Website**: https://aa-matrix.com
- **Issues**: GitHub Issues

---

**Version**: 1.0.0  
**Last Updated**: 2024-01-15  
**Status**: Production Ready
