
import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from src.storage.models import Base

async def init_db():
    # Use default connection string
    engine = create_async_engine('postgresql+asyncpg://postgres:postgres@localhost:5432/ultraterrestrial')
    
    try:
        # Try to create tables
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        print("Database initialized successfully!")
    except Exception as e:
        print(f"Error initializing database: {str(e)}")
    finally:
        await engine.dispose()

if __name__ == "__main__":
    asyncio.run(init_db())
