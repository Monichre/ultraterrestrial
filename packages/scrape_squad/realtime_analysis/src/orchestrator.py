
import asyncio
from datetime import datetime
from typing import Dict, Any
import hashlib
import json

from src.ingestion.news_feed import NewsFeedMonitor
from src.ingestion.social_media import TwitterMonitor
from src.ingestion.rss_feed import RSSMonitor
from src.processing.entity_recognition import EntityRecognizer
from src.processing.topic_classifier import TopicClassifier
from src.storage.db import DatabaseHandler
from src.storage.models import RawContent, EntityMention, TopicAssignment
from config.config import Config

class DataOrchestrator:
    def __init__(self):
        # Initialize configuration
        self.config = Config()
        
        # Initialize data sources
        self.news_monitor = NewsFeedMonitor(self.config.NEWSAPI_KEY)
        self.twitter_monitor = TwitterMonitor(self.config.TWITTER_BEARER_TOKEN)
        self.rss_monitor = RSSMonitor()
        
        # Initialize processors
        self.entity_recognizer = EntityRecognizer()
        self.topic_classifier = TopicClassifier()
        
        # Initialize database
        self.db = DatabaseHandler()
    
    async def process_content(self, content: Dict[str, Any], source_type: str) -> None:
        """
        Process incoming content through the analysis pipeline
        """
        async for session in self.db.get_session():
            try:
                # Create content hash
                content_hash = hashlib.md5(
                    json.dumps(content, sort_keys=True).encode()
                ).hexdigest()
                
                # Check if content already exists
                existing_content = await session.query(RawContent).filter(
                    RawContent.content_id == content_hash
                ).first()
                
                if existing_content:
                    return
                
                # Store raw content
                raw_content = RawContent(
                    content_id=content_hash,
                    content_type=source_type,
                    title=content.get('title', ''),
                    content=content.get('text', content.get('summary', '')),
                    metadata=content,
                    source_url=content.get('link', content.get('url', '')),
                    created_at=datetime.utcnow()
                )
                session.add(raw_content)
                await session.flush()
                
                # Process entities
                entities = await self.entity_recognizer.process_content(
                    raw_content.content,
                    session
                )
                
                # Create entity mentions
                for entity_data in entities.values():
                    mention = EntityMention(
                        raw_content_id=raw_content.id,
                        entity_id=entity_data['entity'].id,
                        context=entity_data['mentions']['context'],
                        confidence=entity_data['mentions'].get('score', 1.0),
                        mention_type='direct'
                    )
                    session.add(mention)
                
                # Process topics
                topics = await self.topic_classifier.process_content(
                    raw_content.content,
                    session
                )
                
                # Create topic assignments
                for topic_data in topics:
                    assignment = TopicAssignment(
                        raw_content_id=raw_content.id,
                        topic_id=topic_data['topic'].id,
                        confidence=topic_data['confidence']
                    )
                    session.add(assignment)
                
                # Mark content as processed
                raw_content.processed = True
                await session.commit()
                
            except Exception as e:
                print(f"Error processing content: {str(e)}")
                await session.rollback()
                raise
    
    async def run(self):
        """
        Main loop to run the data collection and analysis
        """
        # Initialize database
        await self.db.init_db()
        
        while True:
            try:
                # Process news
                news_articles = self.news_monitor.get_latest_news()
                for article in news_articles:
                    await self.process_content(article, 'news')
                
                # Process tweets
                tweets = self.twitter_monitor.get_recent_tweets()
                for tweet in tweets:
                    await self.process_content(tweet, 'twitter')
                
                # Process RSS feeds
                rss_entries = self.rss_monitor.parse_feed('ultraterrestrial')
                for entry in rss_entries:
                    await self.process_content(entry, 'rss')
                
                # Wait for next cycle
                await asyncio.sleep(self.config.UPDATE_INTERVAL)
                
            except Exception as e:
                print(f"Error in main loop: {str(e)}")
                await asyncio.sleep(60)  # Wait a minute before retrying
    
    async def cleanup(self):
        """
        Clean up connections
        """
        await self.db.close()

if __name__ == "__main__":
    orchestrator = DataOrchestrator()
    try:
        asyncio.run(orchestrator.run())
    except KeyboardInterrupt:
        print("Shutting down...")
        asyncio.run(orchestrator.cleanup())
