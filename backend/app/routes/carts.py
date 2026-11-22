import asyncpg
from fastapi import APIRouter, Depends, status, Query, Path, Body
from typing import Annotated
from ..database import get_db
from ..services.cart_service import CartService
from ..schemas.user_schema import UserAuthSchema
from ..schemas.cart_schema import (
    CartItemCreate,
    CartResponse,
    CartItemResponse,
    CartUpdateQuantity,
)
from ..auth import auth

router = APIRouter(prefix="/carts", tags=["Carts"])


@router.post(
    "/items",
    status_code=status.HTTP_201_CREATED,
)
async def add_to_cart(
    user: Annotated[UserAuthSchema, Depends(auth.get_current_auth_user)],
    item_data: Annotated[CartItemCreate, Body()],
    db: Annotated[asyncpg.Connection, Depends(get_db)],
):
    service = CartService(db)
    return await service.add_item(
        user_id=user.id,
        item_data=item_data,
    )


@router.get("/{user_id}", response_model=CartResponse, status_code=status.HTTP_200_OK)
async def get_cart(
    user_id: Annotated[int, Path()],
    db: Annotated[asyncpg.Connection, Depends(get_db)],
):
    service = CartService(db)
    return await service.get_cart(
        user_id,
    )


@router.patch("/items/{product_id}", status_code=status.HTTP_200_OK)
async def update_quantity(
    user: Annotated[UserAuthSchema, Depends(auth.get_current_auth_user)],
    product_id: Annotated[int, Path()],
    quantity: Annotated[CartUpdateQuantity, Body()],
    db: Annotated[asyncpg.Connection, Depends(get_db)],
):
    service = CartService(db)
    return await service.change_quantity(
        product_id=product_id, user_id=user.id, quantity=quantity
    )


@router.delete(
    "/items/{product_id}",
    response_model=CartItemResponse,
    status_code=status.HTTP_200_OK,
)
async def delete_from_cart(
    user: Annotated[UserAuthSchema, Depends(auth.get_current_auth_user)],
    product_id: Annotated[int, Path()],
    db: Annotated[asyncpg.Connection, Depends(get_db)],
):
    service = CartService(db)
    return await service.delete_from_cart(user_id=user.id, product_id=product_id)
