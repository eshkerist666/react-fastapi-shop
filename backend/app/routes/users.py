import asyncpg
from fastapi import APIRouter, Depends, status, Query, Path, Body
from typing import Annotated
from ..database import get_db
from ..services.user_service import UserService
from ..schemas.user_schema import UserCreate, UserResponse, UsersListResponse

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("", response_model=UsersListResponse, status_code=status.HTTP_200_OK)
async def get_users(db: asyncpg.Connection = Depends(get_db)):
    service = UserService(db)
    return await service.get_all_users()


@router.get("/{user_id}", response_model=UserResponse, status_code=status.HTTP_200_OK)
async def get_user(
    user_id: Annotated[int, Path()], db: asyncpg.Connection = Depends(get_db)
):
    service = UserService(db)
    return await service.get_user_by_id(user_id)


@router.post("", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(
    user_data: Annotated[UserCreate, Body()],
    db: asyncpg.Connection = Depends(get_db),
):
    service = UserService(db)
    return await service.create_user(user_data)


@router.delete(
    "/{user_id}", response_model=UserResponse, status_code=status.HTTP_200_OK
)
async def delete_user(
    user_id: Annotated[int, Path()], db: asyncpg.Connection = Depends(get_db)
):
    service = UserService(db)
    return await service.delete_user(user_id)
