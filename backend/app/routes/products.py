import asyncpg
from fastapi import APIRouter, Depends, status, Query, Path, Body
from typing import Annotated, Optional
from ..database import get_db
from ..services.product_service import ProductService
from ..schemas.product_schema import (
    ProductCreate,
    ProductResponse,
    ProductsListResponse,
)

router = APIRouter(prefix="/products", tags=["Products"])


@router.get("", response_model=ProductsListResponse, status_code=status.HTTP_200_OK)
async def get_products(
    category_id: Annotated[int | None, Query()] = None,
    search: Annotated[str | None, Query()] = None,
    limit: Annotated[int, Query(ge=1, le=100)] = 16,
    offset: Annotated[int, Query(ge=0)] = 0,
    db: asyncpg.Connection = Depends(get_db),
):
    service = ProductService(db)

    return await service.get_all_products(
        category_id=category_id,
        search=search,
        limit=limit,
        offset=offset,
    )


@router.get(
    "/{product_id}", response_model=ProductResponse, status_code=status.HTTP_200_OK
)
async def get_product(
    product_id: Annotated[int, Path()], db: asyncpg.Connection = Depends(get_db)
):
    service = ProductService(db)
    return await service.get_product_by_id(product_id)


@router.post("", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
async def create_product(
    product_data: Annotated[ProductCreate, Body()],
    db: asyncpg.Connection = Depends(get_db),
):
    service = ProductService(db)
    return await service.create_product(product_data)


@router.delete(
    "/{product_id}", response_model=ProductResponse, status_code=status.HTTP_200_OK
)
async def delete_product(
    product_id: Annotated[int, Path()], db: asyncpg.Connection = Depends(get_db)
):
    service = ProductService(db)
    return await service.delete_product(product_id)
