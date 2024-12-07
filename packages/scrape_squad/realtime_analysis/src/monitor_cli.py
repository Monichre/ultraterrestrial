
import asyncio
import argparse
from src.analysis.military_monitor import MilitaryBaseMonitor
import plotly.io as pio

async def main():
    parser = argparse.ArgumentParser(description='Monitor UFO/UAP sightings near military bases')
    parser.add_argument('--output', choices=['json', 'html', 'report'], default='report',
                      help='Output format (default: report)')
    parser.add_argument('--days', type=int, default=7,
                      help='Number of days to look back (default: 7)')
    args = parser.parse_args()
    
    monitor = MilitaryBaseMonitor()
    
    # Get recent sightings
    print("Fetching recent sightings...")
    sightings = await monitor.get_recent_sightings()
    print(f"Found {len(sightings)} relevant sightings")
    
    if args.output == 'json':
        import json
        print(json.dumps(sightings, default=str, indent=2))
    
    elif args.output == 'html':
        print("Generating visualizations...")
        # Create visualizations
        timeline = monitor.create_timeline_visualization(sightings)
        heatmap = monitor.create_location_heatmap(sightings)
        
        # Save as HTML
        timeline.write_html("timeline_visualization.html")
        if heatmap:
            heatmap.write_html("location_heatmap.html")
        print("Visualizations saved as HTML files")
    
    else:  # report
        report = monitor.generate_summary_report(sightings)
        print(report)

if __name__ == "__main__":
    asyncio.run(main())
