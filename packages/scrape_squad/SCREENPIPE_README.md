# ScreenPipe Integration Setup

## Configuration
The following components have been set up:

1. MCP Servers Configuration in claude_desktop_config.json
2. Filesystem server for desktop access
3. Cloudflare MCP server integration

## Usage
To use ScreenPipe functionality in your code:

```python
from screenpipe_utils import search_screenpipe

# Search recent screen content
results = search_screenpipe("your query", limit=5)

# Search with time range
results = search_screenpipe(
    "your query",
    limit=5,
    start_time="2024-01-01T00:00:00Z",
    end_time="2024-12-31T23:59:59Z"
)
```

## Required Packages
- @modelcontextprotocol/server-filesystem
- @cloudflare/mcp-server-cloudflare

## Note
The actual ScreenPipe API integration needs to be implemented based on the provided specification and API documentation.
