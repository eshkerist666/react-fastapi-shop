import asyncpg
from ..schemas.category_schema import CategoryCreate


class CategoryRepository:
    def __init__(self, db: asyncpg.Connection):
        self.db = db

    async def get_all(self):
        return await self.db.fetch("SELECT * FROM categories")

    async def get_by_id(self, category_id: int):
        return await self.db.fetchrow(
            "SELECT * FROM categories WHERE category_id = $1", category_id
        )

    async def create(self, category_data: CategoryCreate):
        return await self.db.fetchrow(
            """INSERT INTO categories (category_name)
            VALUES ($1)
            RETURNING *""",
            category_data.category_name,
        )

    async def delete(self, category_id: int):
        return await self.db.fetchrow(
            "DELETE FROM categories WHERE category_id = $1 RETURNING *", category_id
        )
