
# Real-time UFO/UAP Research Analysis System

This system monitors various data sources in real-time to collect, analyze, and process information related to UFO/UAP phenomena. It uses a combination of AI agents, natural language processing, and graph-based analysis to process and store structured information.

## Setup

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Copy .env.template to .env and fill in your API keys:
   ```bash
   cp .env.template .env
   ```

4. Start MongoDB and Neo4j:
   - Make sure MongoDB is running locally or update the connection string in .env
   - Make sure Neo4j is running locally or update the connection details in .env

5. Run the system:
   ```bash
   python src/orchestrator.py
   ```

## System Components

- Data Ingestion:
  - News API monitor
  - Twitter/X monitor
  - RSS feed monitor (TBD)

- Processing:
  - CrewAI-based analysis system
  - Entity recognition
  - Topic classification
  - Relationship analysis

- Storage:
  - MongoDB for raw and processed data
  - Neo4j for relationship graphs

## Configuration

All configuration settings can be found in `config/config.py` and can be overridden using environment variables.
