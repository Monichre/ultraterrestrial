
from typing import List, Dict, Any
import spacy
from transformers import pipeline
from src.storage.models import Entity, EntityMention

class EntityRecognizer:
    def __init__(self):
        # Load SpaCy model for basic NER
        self.nlp = spacy.load("en_core_web_trf")
        # Load specialized NER model for domain-specific entities
        self.ner_pipeline = pipeline("ner", model="jean-baptiste/roberta-large-ner-english")
        
    async def process_content(self, text: str, session) -> List[Dict[str, Any]]:
        """
        Process text content to extract entities using multiple NER approaches
        """
        entities = []
        
        # Use SpaCy for basic NER
        doc = self.nlp(text)
        for ent in doc.ents:
            entity = {
                'text': ent.text,
                'label': ent.label_,
                'start': ent.start_char,
                'end': ent.end_char,
                'context': text[max(0, ent.start_char-50):min(len(text), ent.end_char+50)]
            }
            entities.append(entity)
        
        # Use specialized NER model for domain-specific entities
        specialized_entities = self.ner_pipeline(text)
        for ent in specialized_entities:
            entity = {
                'text': ent['word'],
                'label': ent['entity'],
                'score': ent['score'],
                'start': ent['start'],
                'end': ent['end'],
                'context': text[max(0, ent['start']-50):min(len(text), ent['end']+50)]
            }
            entities.append(entity)
        
        # Deduplicate and store entities
        unique_entities = await self._store_entities(entities, session)
        return unique_entities
    
    async def _store_entities(self, entities: List[Dict], session) -> List[Dict]:
        """
        Store extracted entities in the database
        """
        unique_entities = {}
        
        for ent in entities:
            # Create or get entity
            db_entity = await session.query(Entity).filter(
                Entity.name == ent['text']
            ).first()
            
            if not db_entity:
                db_entity = Entity(
                    name=ent['text'],
                    entity_type=ent['label'],
                    metadata={'type_confidence': ent.get('score', 1.0)}
                )
                session.add(db_entity)
            
            unique_entities[ent['text']] = {
                'entity': db_entity,
                'mentions': ent
            }
        
        await session.commit()
        return unique_entities
