
import asyncio
from src.storage.db import DatabaseHandler

async def init_database():
    db = DatabaseHandler()
    try:
        print("Initializing database...")
        await db.init_db()
        print("Database initialized successfully!")
    except Exception as e:
        print(f"Error initializing database: {str(e)}")
    finally:
        await db.close()

if __name__ == "__main__":
    asyncio.run(init_database())
