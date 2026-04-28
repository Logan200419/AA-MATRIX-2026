# AA-MATRIX Backend

FastAPI backend application following Model-View-Controller (MVC) architecture.

## Project Structure

```
app/
├── __init__.py                 # Application package
├── config.py                   # Configuration settings
├── main.py                     # FastAPI app initialization
├── models/                     # Models (M) - Data schemas
│   ├── __init__.py
│   └── user_model.py          # Example user model
├── views/                      # Views (V) - API routes/endpoints
│   ├── __init__.py
│   └── user_routes.py         # Example user routes
├── controllers/                # Controllers (C) - Business logic orchestration
│   ├── __init__.py
│   └── user_controller.py     # Example user controller
├── services/                   # Services - Complex business logic
│   ├── __init__.py
│   └── user_service.py        # Example user service
└── utils/                      # Utility functions
    └── __init__.py

requirements.txt                # Python dependencies
.env.example                    # Environment variables template
run.py                          # Application entry point
```

## Architecture Explanation

### Model (M)
- **Location**: `app/models/`
- **Purpose**: Define data schemas and models using Pydantic
- **Responsibility**: Data validation and serialization
- **Example**: `UserCreate`, `User`, `UserResponse`

### View (V)
- **Location**: `app/views/`
- **Purpose**: Define API endpoints and routes
- **Responsibility**: Handle HTTP requests/responses
- **Example**: GET, POST, PUT, DELETE endpoints

### Controller (C)
- **Location**: `app/controllers/`
- **Purpose**: Orchestrate business logic and route handling
- **Responsibility**: Call services, handle validation, coordinate operations
- **Example**: `UserController` coordinates user operations

### Service Layer
- **Location**: `app/services/`
- **Purpose**: Encapsulate complex business logic
- **Responsibility**: Database operations, external API calls, data processing
- **Example**: `UserService` handles user creation, retrieval, updates

## Setup Instructions

### 1. Create Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment

```bash
cp .env.example .env
# Edit .env with your configuration
```

### 4. Run Application

```bash
python run.py
```

The API will be available at: `http://localhost:8000`

## API Documentation

Once running, access:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Available Endpoints

### Users
- `POST /api/users/` - Create a new user
- `GET /api/users/{user_id}` - Get user by ID
- `GET /api/users/` - Get all users
- `PUT /api/users/{user_id}` - Update user
- `DELETE /api/users/{user_id}` - Delete user

### Health Check
- `GET /health` - Health status
- `GET /` - Root/Welcome endpoint

## Adding New Features

### Step 1: Create Model
Create a new model in `app/models/`

### Step 2: Create Service
Create business logic in `app/services/`

### Step 3: Create Controller
Create controller in `app/controllers/` to orchestrate services

### Step 4: Create Routes
Create API routes in `app/views/`

### Step 5: Register Router
Include the router in `app/main.py`

## Best Practices

- Keep models focused on data structure
- Place business logic in services
- Use controllers for coordination
- Implement proper error handling
- Use environment variables for configuration
- Add type hints to all functions
- Document endpoints with docstrings

## Database Integration

To add database support:
1. Install SQLAlchemy: `pip install sqlalchemy`
2. Create database models in `app/models/`
3. Update services to use database operations
4. Implement connection management in `app/config.py`

## Authentication

To add authentication:
1. Install dependencies: `pip install python-jose python-multipart passlib`
2. Create authentication utilities
3. Add middleware in `app/main.py`
4. Protect endpoints with dependency injection

## CORS Configuration

CORS is already configured in `app/main.py` to allow frontend requests from:
- http://localhost:3000
- http://localhost:8000
- And local IP variations

Modify `ALLOWED_ORIGINS` in `app/config.py` as needed.

## Production Deployment

For production:
1. Set `DEBUG=False` in `.env`
2. Use a production ASGI server (e.g., Gunicorn with Uvicorn workers)
3. Configure proper SECRET_KEY
4. Set up proper database (PostgreSQL recommended)
5. Implement authentication and authorization
6. Set up logging and monitoring
7. Configure allowed origins for frontend

## Support

Refer to FastAPI documentation: https://fastapi.tiangolo.com/

This manages the logic handling and the api calls from the frontend to communicate with the database and the deep learning model (neural-net)
