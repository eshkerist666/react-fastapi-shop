from fastapi import HTTPException, status

from ..repositories.order_repository import OrderRepository
from ..schemas.order_schema import (
    OrderResponse,
    OrderItemResponse,
    OrderCreate,
    OrdersListResponse,
)


class OrderService:
    def __init__(self, db):
        self.repository = OrderRepository(db)

    async def get_all_orders(self) -> OrdersListResponse:
        orders = await self.repository.get_all()

        if not orders:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Orders not found",
            )

        orders_response = [
            OrderResponse.model_validate(dict(order)) for order in orders
        ]
        return OrdersListResponse(orders=orders_response, total=len(orders_response))

    async def get_all_orders_by_user_id(self, user_id) -> OrdersListResponse:
        orders = await self.repository.get_all_by_user_id(user_id)

        orders_response = [
            OrderResponse.model_validate(dict(order)) for order in orders
        ]
        return OrdersListResponse(orders=orders_response, total=len(orders_response))

    async def create_order(
        self, user_id: int, order_data: OrderCreate
    ) -> OrderResponse:

        order, order_items, error = await self.repository.create_order_from_cart(
            user_id, order_data
        )

        if error == "Cart is empty":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=error,
            )

        if error:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=error,
            )

        return OrderResponse(
            **dict(order),
            items=[
                OrderItemResponse.model_validate(dict(item)) for item in order_items
            ],
        )
