
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # API Keys
    NEWSAPI_KEY = os.getenv('NEWSAPI_KEY')
    TWITTER_BEARER_TOKEN = os.getenv('TWITTER_BEARER_TOKEN')
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
    
    # Database Configuration
    DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql+asyncpg://postgres:postgres@localhost:5432/ultraterrestrial')
    
    # Application Settings
    UPDATE_INTERVAL = 300  # 5 minutes
    MAX_RETRIES = 3
    BATCH_SIZE = 100
