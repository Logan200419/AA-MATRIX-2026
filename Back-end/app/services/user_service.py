"""User Service - Business Logic Layer"""
from typing import List, Optional
from app.models import User, UserCreate, UserResponse


class UserService:
    """Service layer for user operations"""
    
    # Simulated database storage (replace with actual DB)
    _users_db: dict = {}
    _id_counter: int = 1
    
    @classmethod
    def create_user(cls, user_data: UserCreate) -> UserResponse:
        """
        Create a new user
        
        Args:
            user_data: UserCreate object with user information
            
        Returns:
            UserResponse object
        """
        # In production, hash the password and save to database
        user_id = cls._id_counter
        cls._id_counter += 1
        
        user = {
            "id": user_id,
            "username": user_data.username,
            "email": user_data.email,
            "full_name": user_data.full_name,
            "is_active": True,
        }
        
        cls._users_db[user_id] = user
        return UserResponse(**user)
    
    @classmethod
    def get_user(cls, user_id: int) -> Optional[UserResponse]:
        """
        Get user by ID
        
        Args:
            user_id: User ID
            
        Returns:
            UserResponse object or None
        """
        user = cls._users_db.get(user_id)
        if user:
            return UserResponse(**user)
        return None
    
    @classmethod
    def get_all_users(cls) -> List[UserResponse]:
        """
        Get all users
        
        Returns:
            List of UserResponse objects
        """
        return [UserResponse(**user) for user in cls._users_db.values()]
    
    @classmethod
    def update_user(cls, user_id: int, user_data: dict) -> Optional[UserResponse]:
        """
        Update user information
        
        Args:
            user_id: User ID
            user_data: Dictionary with fields to update
            
        Returns:
            Updated UserResponse object or None
        """
        if user_id not in cls._users_db:
            return None
        
        cls._users_db[user_id].update(user_data)
        return UserResponse(**cls._users_db[user_id])
    
    @classmethod
    def delete_user(cls, user_id: int) -> bool:
        """
        Delete a user
        
        Args:
            user_id: User ID
            
        Returns:
            True if deleted, False if not found
        """
        if user_id in cls._users_db:
            del cls._users_db[user_id]
            return True
        return False
