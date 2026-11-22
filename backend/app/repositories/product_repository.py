import asyncpg
from ..schemas.product_schema import ProductCreate


class ProductRepository:
    def __init__(self, db: asyncpg.Connection):
        self.db = db

    async def get_all(
        self,
        category_id: int | None,
        search: str | None,
        limit: int,
        offset: int,
    ):
        return await self.db.fetch(
            """
            SELECT *
            FROM products
            WHERE ($1::int IS NULL OR category_id = $1)
            AND ($2::text IS NULL OR name ILIKE '%' || $2 || '%')
            ORDER BY id
            LIMIT $3 OFFSET $4
            """,
            category_id,
            search,
            limit,
            offset,
        )

    async def get_total_count(self) -> int:
        return await self.db.fetchval("SELECT COUNT(*) FROM products")

    async def get_total_count_by_category(self, category_id) -> int:
        return await self.db.fetchval(
            "SELECT COUNT(*) FROM products WHERE category_id = $1", category_id
        )

    async def get_by_id(self, product_id: int):
        return await self.db.fetchrow(
            "SELECT * FROM products WHERE id = $1", product_id
        )

    async def create(self, product_data: ProductCreate):
        return await self.db.fetchrow(
            """INSERT INTO Products (name, description, price, quantity, category_id, image_url)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *""",
            product_data.name,
            product_data.description,
            product_data.price,
            product_data.quantity,
            product_data.category_id,
            product_data.image_url,
        )

    async def delete(self, product_id: int):
        return await self.db.fetchrow(
            "DELETE FROM Products WHERE id = $1 RETURNING *", product_id
        )
