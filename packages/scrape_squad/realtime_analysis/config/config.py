
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # API Keys
    NEWSAPI_KEY = os.getenv('NEWSAPI_KEY')
    TWITTER_BEARER_TOKEN = os.getenv('TWITTER_BEARER_TOKEN')
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
    
    # Database Configuration
    MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017')
    NEO4J_URI = os.getenv('NEO4J_URI', 'bolt://localhost:7687')
    NEO4J_USER = os.getenv('NEO4J_USER', 'neo4j')
    NEO4J_PASSWORD = os.getenv('NEO4J_PASSWORD')
    
    # Application Settings
    UPDATE_INTERVAL = 300  # 5 minutes
    MAX_RETRIES = 3
    BATCH_SIZE = 100
    
    # Topic Categories
    TOPIC_CATEGORIES = [
        'Sightings',
        'Government Reports',
        'Scientific Analysis',
        'Witness Accounts',
        'Historical Cases',
        'Technology',
        'Research',
        'Media Coverage'
    ]
