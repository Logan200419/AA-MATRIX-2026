# API Documentation

## Base URL

- **Development**: `http://localhost:5000`
- **Production**: `https://api.aa-matrix.com`

## Authentication

All protected endpoints require Bearer token in Authorization header:

```
Authorization: Bearer <access_token>
```

## API Endpoints

### Authentication Endpoints

#### Register User

```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "confirmPassword": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Cookie Set:**
```
Set-Cookie: refreshToken=<refresh_token>; HttpOnly; Secure; SameSite=Strict
```

#### Refresh Token

```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "<refresh_token>"
}
```

**Response (200):**
```json
{
  "message": "Token refreshed successfully",
  "accessToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Get Current User

```http
GET /auth/me
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Logout

```http
POST /auth/logout
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "message": "Logout successful"
}
```

### Inference Endpoints

#### Upload Image and Run Inference

```http
POST /api/inference/upload
Authorization: Bearer <access_token>
Content-Type: multipart/form-data

form-data:
  image: <file>
```

**Response (200):**
```json
{
  "message": "Inference completed successfully",
  "result": {
    "id": 1,
    "userId": 1,
    "fileName": "sample.jpg",
    "filePath": "/uploads/1234567890-sample.jpg",
    "inference": {
      "classification": "Real",
      "confidence": 95.23,
      "modelVersion": "1",
      "timestamp": "2024-01-15T10:30:00Z",
      "metadata": {
        "fileName": "sample.jpg",
        "mimeType": "image/jpeg",
        "fileSize": 102400
      }
    },
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Batch Inference (Mobile)

```http
POST /api/inference/batch
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "images": [
    {
      "id": "item_1",
      "data": "<base64_encoded_image>"
    },
    {
      "id": "item_2",
      "data": "<base64_encoded_image>"
    }
  ]
}
```

**Response (200):**
```json
{
  "message": "Batch inference completed",
  "results": [
    {
      "sourceId": "item_1",
      "result": {
        "classification": "Real",
        "confidence": 92.15,
        "modelVersion": "1",
        "timestamp": "2024-01-15T10:30:00Z"
      },
      "status": "success"
    },
    {
      "sourceId": "item_2",
      "result": {
        "classification": "Fake",
        "confidence": 88.50,
        "modelVersion": "1",
        "timestamp": "2024-01-15T10:30:01Z"
      },
      "status": "success"
    }
  ]
}
```

#### Get Inference Result

```http
GET /api/inference/results/:id
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "result": {
    "id": 1,
    "userId": 1,
    "fileName": "sample.jpg",
    "inference": {
      "classification": "Real",
      "confidence": 95.23,
      "modelVersion": "1",
      "timestamp": "2024-01-15T10:30:00Z"
    },
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Get Inference History

```http
GET /api/inference/history?limit=50&offset=0
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "total": 42,
  "results": [
    {
      "id": 42,
      "fileName": "image1.jpg",
      "inference": {
        "classification": "Real",
        "confidence": 93.50
      },
      "createdAt": "2024-01-15T09:00:00Z"
    },
    {
      "id": 41,
      "fileName": "image2.jpg",
      "inference": {
        "classification": "Fake",
        "confidence": 87.20
      },
      "createdAt": "2024-01-15T08:30:00Z"
    }
  ]
}
```

#### Health Check

```http
GET /api/inference/health
```

**Response (200):**
```json
{
  "status": "healthy",
  "tritonUrl": "http://localhost:8000"
}
```

### System Endpoints

#### Server Health

```http
GET /health
```

**Response (200):**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00Z",
  "uptime": 3600
}
```

## Error Responses

### 400 Bad Request

```json
{
  "error": "Validation error",
  "code": "VALIDATION_ERROR",
  "details": [
    {
      "field": "email",
      "message": "Email must be valid"
    }
  ]
}
```

### 401 Unauthorized

```json
{
  "error": "Invalid or expired access token",
  "code": "INVALID_TOKEN"
}
```

### 403 Forbidden

```json
{
  "error": "Unauthorized",
  "code": "UNAUTHORIZED"
}
```

### 404 Not Found

```json
{
  "error": "Resource not found",
  "code": "NOT_FOUND"
}
```

### 500 Internal Server Error

```json
{
  "error": "Internal server error",
  "code": "INTERNAL_ERROR"
}
```

## File Upload Constraints

- **Max Size**: 50MB
- **Allowed Types**: image/jpeg, image/png, image/gif, image/webp, video/mp4
- **Form Field**: `image` (multipart/form-data)

## Rate Limiting

(To be implemented in production)

- **Auth endpoints**: 5 requests per minute per IP
- **Inference endpoints**: 100 requests per minute per user
- **General endpoints**: 1000 requests per hour per user

## CORS Headers

```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

## Token Expiration

- **Access Token**: 7 days
- **Refresh Token**: 30 days

## Rate Limiting (Production)

All endpoints implement rate limiting. Current limits:
- Auth: 5 requests/min per IP
- API: 100 requests/min per user

## Pagination

Pagination parameters:
- `limit`: Number of results (default: 50, max: 100)
- `offset`: Number of results to skip (default: 0)

## Examples

### cURL

```bash
# Register
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"SecurePass123!","confirmPassword":"SecurePass123!"}'

# Login
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"SecurePass123!"}'

# Upload image
curl -X POST http://localhost:5000/api/inference/upload \
  -H "Authorization: Bearer <access_token>" \
  -F "image=@/path/to/image.jpg"
```

### JavaScript/Axios

```javascript
import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
});

// Login
const response = await client.post('/auth/login', {
  email: 'user@example.com',
  password: 'SecurePass123!',
});

const accessToken = response.data.accessToken;

// Upload image
const formData = new FormData();
formData.append('image', imageFile);

const result = await client.post('/api/inference/upload', formData, {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'multipart/form-data',
  },
});
```

## Versioning

Current API Version: v1

Future versions will be available at `/v2`, `/v3`, etc.

## Support

For API support:
- Email: api-support@aa-matrix.com
- Issues: https://github.com/aa-matrix/api/issues
- Docs: https://docs.aa-matrix.com
