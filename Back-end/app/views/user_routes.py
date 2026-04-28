"""User Routes (Views) - API Endpoints"""
from fastapi import APIRouter, HTTPException, status
from app.controllers import UserController
from app.models import UserCreate, UserResponse
from typing import List

router = APIRouter(prefix="/api/users", tags=["users"])


@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(user_data: UserCreate):
    """
    Create a new user
    
    Args:
        user_data: User creation data
        
    Returns:
        Created user response
    """
    return UserController.handle_create_user(user_data)


@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: int):
    """
    Get a user by ID
    
    Args:
        user_id: User ID
        
    Returns:
        User response
        
    Raises:
        HTTPException: If user not found
    """
    user = UserController.handle_get_user(user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {user_id} not found"
        )
    return user


@router.get("/", response_model=List[UserResponse])
async def get_all_users():
    """
    Get all users
    
    Returns:
        List of user responses
    """
    return UserController.handle_get_all_users()


@router.put("/{user_id}", response_model=UserResponse)
async def update_user(user_id: int, user_data: dict):
    """
    Update a user
    
    Args:
        user_id: User ID
        user_data: User data to update
        
    Returns:
        Updated user response
        
    Raises:
        HTTPException: If user not found
    """
    user = UserController.handle_update_user(user_id, user_data)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {user_id} not found"
        )
    return user


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user_id: int):
    """
    Delete a user
    
    Args:
        user_id: User ID
        
    Raises:
        HTTPException: If user not found
    """
    success = UserController.handle_delete_user(user_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {user_id} not found"
        )
