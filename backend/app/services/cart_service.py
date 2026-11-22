from fastapi import HTTPException, status
from ..repositories.cart_repository import CartRepository
from ..repositories.product_repository import ProductRepository
from ..schemas.cart_schema import (
    CartItemCreate,
    CartItemResponse,
    CartResponse,
)


class CartService:
    def __init__(self, db):
        self.repository = CartRepository(db)
        self.product_repository = ProductRepository(db)

    async def add_item(
        self,
        user_id: int,
        item_data: CartItemCreate,
    ):
        product = await self.product_repository.get_by_id(item_data.product_id)

        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product not found",
            )

        if product["quantity"] < item_data.quantity:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Not enough products in stock",
            )

        cart = await self.repository.get_cart_by_user_id(user_id)

        if not cart:
            cart = await self.repository.create_cart(user_id)

        cart_item = await self.repository.get_cart_item(
            cart["id"],
            item_data.product_id,
        )

        if cart_item:
            new_quantity = cart_item["quantity"] + item_data.quantity

            if product["quantity"] < new_quantity:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Not enough products in stock",
                )

            return await self.repository.update_cart_item(
                cart["id"],
                item_data.product_id,
                new_quantity,
            )

        return await self.repository.create_cart_item(
            cart["id"],
            item_data.product_id,
            item_data.quantity,
        )

    async def change_quantity(self, product_id, user_id, quantity):
        product = await self.product_repository.get_by_id(product_id)

        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product not found",
            )

        quantity_value = quantity.quantity
        if product["quantity"] < quantity_value:
            quantity_value = product["quantity"]

        cart = await self.repository.get_cart_by_user_id(user_id)

        if not cart:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Cart not found",
            )

        cart_item = await self.repository.get_cart_item(
            cart["id"],
            product_id,
        )

        if cart_item:
            return await self.repository.update_cart_item(
                cart["id"],
                product_id,
                quantity_value,
            )

    async def get_cart(self, user_id: int) -> CartResponse:
        cart = await self.repository.get_cart_by_user_id(user_id)

        if not cart:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Cart not found",
            )

        items = await self.repository.get_cart_items(cart["id"])

        items_response = [CartItemResponse.model_validate(dict(item)) for item in items]

        total_price = sum(item["price"] * item["cart_quantity"] for item in items)

        return CartResponse(
            **dict(cart),
            items=items_response,
            total_price=total_price,
        )

    async def delete_from_cart(self, user_id: int, product_id: int) -> CartItemResponse:
        product = await self.repository.delete(user_id, product_id)

        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product not found",
            )

        return CartItemResponse.model_validate(dict(product))
