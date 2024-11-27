# Database configuration
XATA_DATABASE_URL="https://UltraTerrestrial-kgubvq.us-east-1.xata.sh/db/ultraterrestrial"
XATA_API_KEY="xau_LKJxzxjzXasEUXxjmhCBACdTCvi5Ed2v1"

from xata.client import XataClient
import json
import time

# Read personnel records
with open('new_personnel_records.json', 'r') as f:
    personnel = json.load(f)

# Initialize Xata client
xata = XataClient()

print("Starting personnel record insertion...")

# Insert each record
for person in personnel:
    record = {
        "name": person["name"],
        "role": person["role"],
        "bio": "",
        "facebook": "",
        "twitter": "",
        "website": "",
        "instagram": "",
        "photo": [],
        "rank": 3,
        "credibility": 3,
        "popularity": 3,
        "authority": 3
    }
    
    try:
        print(f"\nInserting record for {person['name']}...")
        data = xata.records().insert("personnel", record)
        print(f"Successfully inserted {person['name']}")
        time.sleep(0.5)  # Small delay between insertions
        
    except Exception as e:
        print(f"Error inserting {person['name']}: {str(e)}")

print("\nInsertion process completed")
