
from sqlalchemy import Column, Integer, String, DateTime, JSON, ForeignKey, Text, Boolean, Float
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class RawContent(Base):
    __tablename__ = 'raw_content'
    
    id = Column(Integer, primary_key=True)
    content_id = Column(String, unique=True)
    content_type = Column(String)
    title = Column(String)
    content = Column(Text)
    meta_data = Column(JSON)  # Changed from metadata
    source_url = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    processed = Column(Boolean, default=False)
    
    # Relationships will be set up after class definitions
    entities = None
    topics = None

class Entity(Base):
    __tablename__ = 'entities'
    
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)
    entity_type = Column(String)
    meta_data = Column(JSON)  # Changed from metadata
    first_seen = Column(DateTime, default=datetime.utcnow)
    last_seen = Column(DateTime, default=datetime.utcnow)
    
    # Relationships will be set up after class definitions
    mentions = None

class EntityMention(Base):
    __tablename__ = 'entity_mentions'
    
    id = Column(Integer, primary_key=True)
    raw_content_id = Column(Integer, ForeignKey('raw_content.id'))
    entity_id = Column(Integer, ForeignKey('entities.id'))
    context = Column(Text)
    confidence = Column(Float)
    mention_type = Column(String)
    
    # Relationships will be set up after class definitions
    raw_content = None
    entity = None

class Topic(Base):
    __tablename__ = 'topics'
    
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)
    description = Column(Text)
    parent_id = Column(Integer, ForeignKey('topics.id'), nullable=True)
    meta_data = Column(JSON)  # Changed from metadata
    
    # Relationships will be set up after class definitions
    assignments = None
    subtopics = None

class TopicAssignment(Base):
    __tablename__ = 'topic_assignments'
    
    id = Column(Integer, primary_key=True)
    raw_content_id = Column(Integer, ForeignKey('raw_content.id'))
    topic_id = Column(Integer, ForeignKey('topics.id'))
    confidence = Column(Float)
    assigned_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships will be set up after class definitions
    raw_content = None
    topic = None

# Set up relationships after class definitions
from sqlalchemy.orm import relationship

RawContent.entities = relationship("EntityMention", back_populates="raw_content")
RawContent.topics = relationship("TopicAssignment", back_populates="raw_content")

Entity.mentions = relationship("EntityMention", back_populates="entity")

EntityMention.raw_content = relationship("RawContent", back_populates="entities")
EntityMention.entity = relationship("Entity", back_populates="mentions")

Topic.assignments = relationship("TopicAssignment", back_populates="topic")
Topic.subtopics = relationship("Topic")

TopicAssignment.raw_content = relationship("RawContent", back_populates="topics")
TopicAssignment.topic = relationship("Topic", back_populates="assignments")
