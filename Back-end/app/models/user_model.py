"""User Data Models"""
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class UserBase(BaseModel):
    """Base User model with common fields"""
    username: str
    email: EmailStr
    full_name: Optional[str] = None


class UserCreate(UserBase):
    """Model for creating a new user"""
    password: str


class User(UserBase):
    """User model for database"""
    id: int
    is_active: bool = True
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class UserResponse(UserBase):
    """Model for API responses"""
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True
