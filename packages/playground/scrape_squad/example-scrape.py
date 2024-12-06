from firecrawl import FirecrawlApp
from pydantic import BaseModel, Field


# Use this curl Command but change the bearer token
curl -X POST https://ufopanel.com/#quotes \
  -H '
  Content-Type: application/json' \
  -H 'Authorization : Bearer YOUR_API_KEY' \
  -d '{
    "url": "https://docs.firecrawl.dev",
    "formats": ["markdown", "links", "html",  "screenshot"],
    "includeTags": [".quotes-block", "blockquote", ".thumb", "p", ".author", ".source"],
    "excludeTags": ["#ad", "#footer"],
    "onlyMainContent": false,
    "waitFor": 1000,
    "timeout": 15000
  }'

# Initialize the FirecrawlApp with your API key
# app = FirecrawlApp(api_key='your_api_key')

# class ExtractSchema(BaseModel):
#     quote: str
#     author: str
#     source: str
#     thumbImage: str

# data = app.scrape_url('https://ufopanel.com/#quotes', {
#     'formats': ['extract', "markdown", "screenshot"],
#     'extract': {
#         'schema': ExtractSchema.model_json_schema(),
#     }
# })
# print(data["extract"])
