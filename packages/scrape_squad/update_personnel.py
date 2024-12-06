from xata.client import XataClient
import json
from typing import Dict, List, Optional
import os
from dotenv import load_dotenv

# Initialize Xata client
xata = XataClient(
    api_key="xau_LKJxzxjzXasEUXxjmhCBACdTCvi5Ed2v1",
    db_url="https://UltraTerrestrial-kgubvq.us-east-1.xata.sh/db/ultraterrestrial"
)

def check_existing_record(name: str) -> Optional[Dict]:
    """
    Search for a record by name and return it if found
    """
    try:
        search_result = xata.search().search_records(
            "personnel",
            {
                "query": name,
                "fuzziness": 0,  # Exact match
                "target": ["name"]
            }
        )
        
        # Check if we have any matches
        if search_result.get("records", []):
            return search_result["records"][0]
        return None
        
    except Exception as e:
        print(f"Error searching for {name}: {str(e)}")
        return None

def process_record(record: Dict) -> Dict:
    """
    Process a single record - check if it exists and return appropriate action
    """
    existing_record = check_existing_record(record["name"])
    
    if existing_record:
        return {
            "name": record["name"],
            "status": "exists",
            "existing_id": existing_record.get("id"),
            "record": record
        }
    else:
        return {
            "name": record["name"],
            "status": "new",
            "record": record
        }

def main():
    # Load the formatted records
    with open("xata_formatted_records.json", "r") as f:
        formatted_records = json.load(f)
    
    # Process records and organize them
    new_records = []
    existing_records = []
    
    print("Processing records...")
    for record in formatted_records:
        result = process_record(record)
        print(f"Processing {result['name']}: {result['status']}")
        
        if result["status"] == "new":
            new_records.append(result["record"])
        else:
            existing_records.append(result)
    
    # Print summary
    print(f"
Processing complete!")
    print(f"New records to insert: {len(new_records)}")
    print(f"Existing records found: {len(existing_records)}")
    
    # Save results for review
    with open("new_records.json", "w") as f:
        json.dump(new_records, f, indent=2)
    
    with open("existing_records.json", "w") as f:
        json.dump(existing_records, f, indent=2)
    
    return new_records, existing_records

if __name__ == "__main__":
    new_records, existing_records = main()
