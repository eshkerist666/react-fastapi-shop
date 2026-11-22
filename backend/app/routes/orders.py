import asyncpg
from typing import Annotated
from fastapi import APIRouter, Depends, status, Query, Path, Body
from ..database import get_db
from ..services.order_service import OrderService
from ..schemas.order_schema import OrderResponse, OrderCreate, OrdersListResponse
from ..schemas.user_schema import UserAuthSchema
from ..auth import auth

router = APIRouter(
    prefix="/orders",
    tags=["Orders"],
)


@router.get("", response_model=OrdersListResponse, status_code=status.HTTP_201_CREATED)
async def get_orders(
    db: Annotated[asyncpg.Connection, Depends(get_db)],
):
    service = OrderService(db)
    return await service.get_all_orders()


@router.get(
    "/mine",
    response_model=OrdersListResponse,
    status_code=status.HTTP_200_OK,
)
async def get_user_orders(
    user: Annotated[UserAuthSchema, Depends(auth.get_current_auth_user)],
    db: Annotated[asyncpg.Connection, Depends(get_db)],
):
    service = OrderService(db)
    return await service.get_all_orders_by_user_id(user.id)


@router.post(
    "",
    response_model=OrderResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_order(
    user: Annotated[UserAuthSchema, Depends(auth.get_current_auth_user)],
    order_data: Annotated[OrderCreate, Body()],
    db: Annotated[asyncpg.Connection, Depends(get_db)],
):
    service = OrderService(db)
    return await service.create_order(user_id=user.id, order_data=order_data)
