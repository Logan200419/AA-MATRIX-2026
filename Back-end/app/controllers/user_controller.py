"""User Controller - Business Logic Orchestration"""
from app.services import UserService
from app.models import UserCreate, UserResponse
from typing import List, Optional


class UserController:
    """Controller for handling user operations"""
    
    @staticmethod
    def handle_create_user(user_data: UserCreate) -> UserResponse:
        """
        Handle user creation request
        
        Args:
            user_data: UserCreate object
            
        Returns:
            UserResponse object
        """
        return UserService.create_user(user_data)
    
    @staticmethod
    def handle_get_user(user_id: int) -> Optional[UserResponse]:
        """
        Handle get user request
        
        Args:
            user_id: User ID
            
        Returns:
            UserResponse object or None
        """
        return UserService.get_user(user_id)
    
    @staticmethod
    def handle_get_all_users() -> List[UserResponse]:
        """
        Handle get all users request
        
        Returns:
            List of UserResponse objects
        """
        return UserService.get_all_users()
    
    @staticmethod
    def handle_update_user(user_id: int, user_data: dict) -> Optional[UserResponse]:
        """
        Handle user update request
        
        Args:
            user_id: User ID
            user_data: Dictionary with fields to update
            
        Returns:
            Updated UserResponse object or None
        """
        return UserService.update_user(user_id, user_data)
    
    @staticmethod
    def handle_delete_user(user_id: int) -> bool:
        """
        Handle user deletion request
        
        Args:
            user_id: User ID
            
        Returns:
            True if deleted, False if not found
        """
        return UserService.delete_user(user_id)
