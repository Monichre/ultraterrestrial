# ScrapeSquad Crew

Welcome to the ScrapeSquad Crew project, powered by [crewAI](https://crewai.com). This template is designed to help you set up a multi-agent AI system with ease, leveraging the powerful and flexible framework provided by crewAI. Our goal is to enable your agents to collaborate effectively on complex tasks, maximizing their collective intelligence and capabilities.

## Installation

Ensure you have Python >=3.10 <=3.13 installed on your system. This project uses [UV](https://docs.astral.sh/uv/) for dependency management and package handling, offering a seamless setup and execution experience.

First, if you haven't already, install uv:

```bash
pip install uv
```

Next, navigate to your project directory and install the dependencies:

(Optional) Lock the dependencies and install them by using the CLI command:

```bash
crewai install
```

### Customizing

**Add your `OPENAI_API_KEY` into the `.env` file**

- Modify `src/scrape_squad/config/agents.yaml` to define your agents
- Modify `src/scrape_squad/config/tasks.yaml` to define your tasks
- Modify `src/scrape_squad/crew.py` to add your own logic, tools and specific args
- Modify `src/scrape_squad/main.py` to add custom inputs for your agents and tasks

## Running the Project

To kickstart your crew of AI agents and begin task execution, run this from the root folder of your project:

```bash
crewai run
```

This command initializes the scrape_squad Crew, assembling the agents and assigning them tasks as defined in your configuration.

This example, unmodified, will run the create a `report.md` file with the output of a research on LLMs in the root folder.

## Understanding Your Crew

The scrape_squad Crew is composed of multiple AI agents, each with unique roles, goals, and tools. These agents collaborate on a series of tasks, defined in `config/tasks.yaml`, leveraging their collective skills to achieve complex objectives. The `config/agents.yaml` file outlines the capabilities and configurations of each agent in your crew.

## Support

For support, questions, or feedback regarding the ScrapeSquad Crew or crewAI.

- Visit our [documentation](https://docs.crewai.com)
- Reach out to us through our [GitHub repository](https://github.com/joaomdmoura/crewai)
- [Join our Discord](https://discord.com/invite/X4JWnZnxPb)
- [Chat with our docs](https://chatg.pt/DWjSBZn)

Let's create wonders together with the power and simplicity of crewAI.

```
import os
from crewai import Agent, Task, Crew
# Importing crewAI tools
from crewai_tools import (
    DirectoryReadTool,
    FileReadTool,
    SerperDevTool,
    WebsiteSearchTool
)

# Set up API keys
os.environ["SERPER_API_KEY"] = "Your Key" # serper.dev API key
os.environ["OPENAI_API_KEY"] = "Your Key"

# Instantiate tools
docs_tool = DirectoryReadTool(directory='./blog-posts')
file_tool = FileReadTool()
search_tool = SerperDevTool()
web_rag_tool = WebsiteSearchTool()

# Create agents
researcher = Agent(
    role='Market Research Analyst',
    goal='Provide up-to-date market analysis of the AI industry',
    backstory='An expert analyst with a keen eye for market trends.',
    tools=[search_tool, web_rag_tool],
    verbose=True
)

writer = Agent(
    role='Content Writer',
    goal='Craft engaging blog posts about the AI industry',
    backstory='A skilled writer with a passion for technology.',
    tools=[docs_tool, file_tool],
    verbose=True
)

# Define tasks
research = Task(
    description='Research the latest trends in the AI industry and provide a summary.',
    expected_output='A summary of the top 3 trending developments in the AI industry with a unique perspective on their significance.',
    agent=researcher
)

write = Task(
    description='Write an engaging blog post about the AI industry, based on the research analyst’s summary. Draw inspiration from the latest blog posts in the directory.',
    expected_output='A 4-paragraph blog post formatted in markdown with engaging, informative, and accessible content, avoiding complex jargon.',
    agent=writer,
    output_file='blog-posts/new_post.md'  # The final blog post will be saved here
)

# Assemble a crew with planning enabled
crew = Crew(
    agents=[researcher, writer],
    tasks=[research, write],
    verbose=True,
    planning=True,  # Enable planning feature
)

# Execute tasks
crew.kickoff()
```

### Tools

BrowserbaseLoadTool A tool for interacting with and extracting data from web browsers.
CodeDocsSearchTool A RAG tool optimized for searching through code documentation and related technical documents.
CodeInterpreterTool A tool for interpreting python code.
ComposioTool Enables use of Composio tools.
CSVSearchTool A RAG tool designed for searching within CSV files, tailored to handle structured data.
DALL-E Tool A tool for generating images using the DALL-E API.
DirectorySearchTool A RAG tool for searching within directories, useful for navigating through file systems.
DOCXSearchTool A RAG tool aimed at searching within DOCX documents, ideal for processing Word files.
DirectoryReadTool Facilitates reading and processing of directory structures and their contents.
EXASearchTool A tool designed for performing exhaustive searches across various data sources.
FileReadTool Enables reading and extracting data from files, supporting various file formats.
FirecrawlSearchTool A tool to search webpages using Firecrawl and return the results.
FirecrawlCrawlWebsiteTool A tool for crawling webpages using Firecrawl.
FirecrawlScrapeWebsiteTool A tool for scraping webpages URL using Firecrawl and returning its contents.
GithubSearchTool A RAG tool for searching within GitHub repositories, useful for code and documentation search.
SerperDevTool A specialized tool for development purposes, with specific functionalities under development.
TXTSearchTool A RAG tool focused on searching within text (.txt) files, suitable for unstructured data.
JSONSearchTool A RAG tool designed for searching within JSON files, catering to structured data handling.
LlamaIndexTool Enables the use of LlamaIndex tools.
MDXSearchTool A RAG tool tailored for searching within Markdown (MDX) files, useful for documentation.
PDFSearchTool A RAG tool aimed at searching within PDF documents, ideal for processing scanned documents.
PGSearchTool A RAG tool optimized for searching within PostgreSQL databases, suitable for database queries.
Vision Tool A tool for generating images using the DALL-E API.
RagTool A general-purpose RAG tool capable of handling various data sources and types.
ScrapeElementFromWebsiteTool Enables scraping specific elements from websites, useful for targeted data extraction.
ScrapeWebsiteTool Facilitates scraping entire websites, ideal for comprehensive data collection.
WebsiteSearchTool A RAG tool for searching website content, optimized for web data extraction.
XMLSearchTool A RAG tool designed for searching within XML files, suitable for structured data formats.
YoutubeChannelSearchTool A RAG tool for searching within YouTube channels, useful for video content analysis.
YoutubeVideoSearchTool A RAG tool aimed at searching within YouTube videos, ideal for video data extraction.
