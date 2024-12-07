from tavily import TavilyClient
tavily_client = TavilyClient(api_key="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")
response = tavily_client.search("Who is Leo Messi?")
print(response)