import asyncpg
from ..schemas.order_schema import OrderCreate


class OrderRepository:
    def __init__(self, db: asyncpg.Connection):
        self.db = db

    async def get_all(self):
        orders = await self.db.fetch("""
            SELECT *
            FROM orders
            ORDER BY created_at DESC;
        """)

        items = await self.db.fetch("""
            SELECT *
            FROM order_items;
        """)

        items_by_order = {}

        for item in items:
            order_id = item["order_id"]

            if order_id not in items_by_order:
                items_by_order[order_id] = []

            items_by_order[order_id].append(dict(item))

        result = []

        for order in orders:
            new_row = dict(order)

            new_row["items"] = items_by_order.get(order["id"], [])

            result.append(new_row)

        return result

    async def get_all_by_user_id(self, user_id: int):
        orders = await self.db.fetch(
            """
                SELECT *
                FROM orders
                WHERE user_id = $1
                ORDER BY created_at DESC;
            """,
            user_id,
        )

        items = await self.db.fetch(
            """
                SELECT order_items.*, image_url, name, products.id AS item_id FROM order_items
                JOIN orders ON orders.id = order_items.order_id
                JOIN products ON products.id = order_items.product_id
                WHERE user_id = $1
            """,
            user_id,
        )

        items_by_order = {}

        for item in items:
            order_id = item["order_id"]

            if order_id not in items_by_order:
                items_by_order[order_id] = []

            items_by_order[order_id].append(dict(item))

        result = []

        for order in orders:
            new_row = dict(order)

            new_row["items"] = items_by_order.get(order["id"], [])

            result.append(new_row)

        return result

    async def create_order_from_cart(self, user_id: int, order_data: OrderCreate):
        async with self.db.transaction():
            cart_items = await self.db.fetch(
                """
                SELECT
                    ci.product_id,
                    ci.quantity,
                    p.price,
                    p.quantity AS stock_quantity
                FROM carts c
                JOIN cart_items ci
                    ON ci.cart_id = c.id
                JOIN products p
                    ON p.id = ci.product_id
                WHERE c.user_id = $1
                FOR UPDATE OF p
                """,
                user_id,
            )

            if not cart_items:
                return None, None, "Cart is empty"

            for item in cart_items:
                if item["quantity"] > item["stock_quantity"]:
                    return (
                        None,
                        None,
                        f"Not enough product {item['product_id']} in stock",
                    )

            total_price = sum(item["price"] * item["quantity"] for item in cart_items)

            order = await self.db.fetchrow(
                """
                INSERT INTO orders (
                    user_id,
                    status,
                    total_price,
                    country,
                    city,
                    street,
                    house,
                    apartment,
                    postal_code
                )
                VALUES (
                    $1, $2, $3, $4, $5, $6, $7, $8, $9
                )
                RETURNING *
                """,
                user_id,
                "pending",
                total_price,
                order_data.country,
                order_data.city,
                order_data.street,
                order_data.house,
                order_data.apartment,
                order_data.postal_code,
            )

            order_items = []

            for item in cart_items:

                order_item = await self.db.fetchrow(
                    """
                    INSERT INTO order_items (
                        order_id,
                        product_id,
                        quantity,
                        price
                    )
                    VALUES ($1, $2, $3, $4)
                    RETURNING *
                    """,
                    order["id"],
                    item["product_id"],
                    item["quantity"],
                    item["price"],
                )

                order_items.append(order_item)

                await self.db.execute(
                    """
                    UPDATE products
                    SET quantity = quantity - $1
                    WHERE id = $2
                    """,
                    item["quantity"],
                    item["product_id"],
                )

            # Очищаем корзину
            await self.db.execute(
                """
                DELETE FROM cart_items
                WHERE cart_id = (
                    SELECT id
                    FROM carts
                    WHERE user_id = $1
                )
                """,
                user_id,
            )

            return order, order_items, None
