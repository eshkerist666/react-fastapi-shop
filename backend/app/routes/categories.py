import asyncpg
from fastapi import APIRouter, Depends, status, Query, Path, Body
from typing import Annotated
from ..database import get_db
from ..services.category_service import CategoryService
from ..schemas.category_schema import (
    CategoryCreate,
    CategoryResponse,
    CategoryListResponse,
)

router = APIRouter(prefix="/categories", tags=["Categories"])


@router.get("", response_model=CategoryListResponse, status_code=status.HTTP_200_OK)
async def get_categories(db: asyncpg.Connection = Depends(get_db)):
    service = CategoryService(db)
    return await service.get_all_categories()


@router.get(
    "/{category_id}", response_model=CategoryResponse, status_code=status.HTTP_200_OK
)
async def get_category(
    category_id: Annotated[int, Path()], db: asyncpg.Connection = Depends(get_db)
):
    service = CategoryService(db)
    return await service.get_category_by_id(category_id)


@router.post("", response_model=CategoryResponse, status_code=status.HTTP_201_CREATED)
async def create_category(
    category_data: Annotated[CategoryCreate, Body()],
    db: asyncpg.Connection = Depends(get_db),
):
    service = CategoryService(db)
    return await service.create_category(category_data)


@router.delete(
    "/{category_id}", response_model=CategoryResponse, status_code=status.HTTP_200_OK
)
async def delete_category(
    category_id: Annotated[int, Path()], db: asyncpg.Connection = Depends(get_db)
):
    service = CategoryService(db)
    return await service.delete_category(category_id)
