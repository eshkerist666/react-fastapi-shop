import asyncpg
from ..schemas.user_schema import UserCreate


class UserRepository:
    def __init__(self, db: asyncpg.Connection):
        self.db = db

    async def get_all(self):
        return await self.db.fetch("SELECT * FROM users")

    async def get_by_id(self, user_id: int):
        return await self.db.fetchrow("SELECT * FROM users WHERE id = $1", user_id)

    async def get_by_email(self, email: str):
        return await self.db.fetchrow(
            "SELECT * FROM users WHERE email = $1",
            email,
        )

    async def create(self, user_data: UserCreate):
        return await self.db.fetchrow(
            """INSERT INTO users (email, password_hash, first_name, last_name, role)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *""",
            user_data.email,
            user_data.password,
            user_data.first_name,
            user_data.last_name,
            "user",
        )

    async def delete(self, user_id: int):
        return await self.db.fetchrow(
            "DELETE FROM users WHERE id = $1 RETURNING *", user_id
        )
