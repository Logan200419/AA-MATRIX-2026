"""Application Configuration"""
import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    """Application settings"""
    
    # API Configuration
    API_TITLE = "AA-MATRIX API"
    API_VERSION = "1.0.0"
    API_DESCRIPTION = "FastAPI backend for AA-MATRIX application"
    
    # Server Configuration
    DEBUG = os.getenv("DEBUG", "True") == "True"
    HOST = os.getenv("HOST", "0.0.0.0")
    PORT = int(os.getenv("PORT", 8000))
    
    # CORS Configuration
    ALLOWED_ORIGINS = [
        "http://localhost:3000",
        "http://localhost:8000",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:8000",
    ]
    
    # Database Configuration (add your database settings)
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./database.db")
    
    # JWT Configuration (if using authentication)
    SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 30


settings = Settings()
