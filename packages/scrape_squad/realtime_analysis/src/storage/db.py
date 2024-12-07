
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from contextlib import asynccontextmanager
import os

class DatabaseHandler:
    def __init__(self, connection_string=None):
        self.connection_string = connection_string or os.getenv(
            'DATABASE_URL',
            'postgresql+asyncpg://postgres:postgres@localhost:5432/ultraterrestrial'
        )
        self.engine = create_async_engine(self.connection_string, echo=True)
        self.SessionLocal = sessionmaker(
            bind=self.engine,
            class_=AsyncSession,
            expire_on_commit=False
        )
    
    @asynccontextmanager
    async def get_session(self):
        async with self.SessionLocal() as session:
            try:
                yield session
                await session.commit()
            except Exception as e:
                await session.rollback()
                raise e
    
    async def init_db(self):
        from src.storage.models import Base
        async with self.engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
    
    async def close(self):
        await self.engine.dispose()
