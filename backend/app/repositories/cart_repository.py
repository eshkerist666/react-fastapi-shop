import asyncpg
from ..schemas.cart_schema import CartItemCreate


class CartRepository:
    def __init__(self, db: asyncpg.Connection):
        self.db = db

    async def get_cart_by_user_id(self, user_id: int):
        return await self.db.fetchrow(
            """
            SELECT * FROM carts
            WHERE user_id = $1
            """,
            user_id,
        )

    async def create_cart(self, user_id: int):
        return await self.db.fetchrow(
            """
            INSERT INTO carts (user_id)
            VALUES ($1)
            RETURNING *
            """,
            user_id,
        )

    async def get_product(self, product_id: int):
        return await self.db.fetchrow(
            """
            SELECT id, price, quantity FROM products
            WHERE id = $1
            """,
            product_id,
        )

    async def get_cart_item(
        self,
        cart_id: int,
        product_id: int,
    ):
        return await self.db.fetchrow(
            """
            SELECT * FROM cart_items
            WHERE cart_id = $1 AND product_id = $2
            """,
            cart_id,
            product_id,
        )

    async def create_cart_item(
        self,
        cart_id: int,
        product_id: int,
        quantity: int,
    ):
        return await self.db.fetchrow(
            """
            INSERT INTO cart_items (cart_id, product_id, quantity)
            VALUES ($1, $2, $3)
            RETURNING *
            """,
            cart_id,
            product_id,
            quantity,
        )

    async def update_cart_item(
        self,
        cart_id: int,
        product_id: int,
        quantity: int,
    ):
        return await self.db.fetchrow(
            """
            UPDATE cart_items
            SET quantity = $1
            WHERE cart_id = $2 AND product_id = $3
            RETURNING *
            """,
            quantity,
            cart_id,
            product_id,
        )

    async def get_cart_items(self, cart_id: int):
        return await self.db.fetch(
            """
            SELECT ci.id, ci.product_id, ci.quantity AS cart_quantity, p.* FROM cart_items ci
            JOIN products p ON p.id = ci.product_id
            WHERE ci.cart_id = $1
            """,
            cart_id,
        )

    async def delete(self, user_id: int, product_id: int):
        return await self.db.fetchrow(
            """
            DELETE FROM cart_items
            USING carts
            WHERE cart_items.cart_id = carts.id AND carts.user_id = $1 AND cart_items.product_id = $2
            RETURNING *""",
            user_id,
            product_id,
        )
