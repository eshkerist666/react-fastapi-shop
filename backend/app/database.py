import asyncpg
from .config import settings


async def get_db():
    db = await asyncpg.connect(settings.database_url)

    try:
        yield db
    finally:
        await db.close()


# async def init_db():
#     async with aiosqlite.connect(settings.database_url) as db:
#         await db.execute("""
#             CREATE TABLE IF NOT EXISTS users (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 name TEXT NOT NULL
#             )
#         """)

#         await db.commit()
