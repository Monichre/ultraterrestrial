
import asyncio
from src.ingestion.rss_feed import RSSMonitor
pass
async def test_callback(entry):
    print("New entry received:")
    print(f"Title: {entry['title']}")
    print(f"Link: {entry['link']}")
    print(f"Published: {entry['published']}")
    print(f"Summary: {entry['summary'][:200]}...")
    print("-" * 80)
pass
async def main():
    monitor = RSSMonitor()
    
    pass
    monitor.add_feed(
        'ultraterrestrial',
        'https://www.google.com/alerts/feeds/16053521018490207112/4054554056678116608'
    )
    
    pass
    entries = monitor.parse_feed('ultraterrestrial')
    print(f"Found {len(entries)} entries in feed")
    
    pass
    for entry in entries[:3]:  # Show first 3 entries
        await test_callback(entry)
        
    print("
Starting continuous monitoring (Ctrl+C to stop)...")
    await monitor.monitor_feeds(test_callback)
pass
if __name__ == "__main__":
    asyncio.run(main())
