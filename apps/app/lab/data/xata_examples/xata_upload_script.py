import json
import time
from xata.client import XataClient
from datetime import datetime

# Initialize Xata client
xata = XataClient(
    api_key="xau_LKJxzxjzXasEUXxjmhCBACdTCvi5Ed2v1",
    db_url="https://UltraTerrestrial-kgubvq.us-east-1.xata.sh/db/ultraterrestrial"
)


def convert_photo_to_xata_format(photo_data):
    """Convert XataFile.fromBase64() format to Xata's expected format"""
    if not photo_data.startswith('XataFile.fromBase64("'):
        return None

    base64_content = photo_data.replace(
        'XataFile.fromBase64("', '').rstrip('")')

    return {
        "base64Content": base64_content,
        "enablePublicUrl": True,
        "mediaType": "application/octet-stream",  # This will be auto-detected by Xata
        "name": f"upload_{int(time.time())}.bin",
        "signedUrlTimeout": 300
    }


def process_entry_for_upload(entry):
    """Process a single entry to match Xata's expected format"""
    processed = entry.copy()

    # Convert photos if they exist
    if 'photos' in processed and processed['photos']:
        processed['photos'] = [
            convert_photo_to_xata_format(photo)
            for photo in processed['photos']
            if photo  # Filter out None/empty values
        ]
        # Remove photos array if empty
        if not processed['photos']:
            del processed['photos']

    # Ensure metadata is a string
    if 'metadata' in processed:
        if isinstance(processed['metadata'], dict):
            processed['metadata'] = json.dumps(processed['metadata'])

    return processed


def upload_batch(entries, batch_size=50):
    """Upload entries in batches with error handling and progress tracking"""
    total_entries = len(entries)
    successful = 0
    failed = []

    for i in range(0, total_entries, batch_size):
        batch = entries[i:i + batch_size]
        print(f"\nProcessing batch {
              i//batch_size + 1} ({i+1} to {min(i+batch_size, total_entries)} of {total_entries})")

        for entry in batch:
            try:
                processed_entry = process_entry_for_upload(entry)
                response = xata.records().insert("events", processed_entry)
                successful += 1
                print(f"Successfully uploaded entry {successful}")

                time.sleep(0.1)

            except Exception as e:
                failed.append({
                    'entry': entry.get('name', 'Unknown'),
                    'error': str(e)
                })
                print(f"Failed to upload entry: {
                      entry.get('name', 'Unknown')}")
                print(f"Error: {str(e)}")

        print(f"Progress: {
              successful}/{total_entries} entries uploaded successfully")
        if failed:
            print(f"Failed entries so far: {len(failed)}")

    return successful, failed


with open('/Users/liamellis/Desktop/ultraterrestrial/apps/app/docs/events/xata_ready_timeline.json', 'r') as file:
    data = json.load(file)

print(f"Loaded {len(data)} entries for upload")

start_time = time.time()
successful, failed = upload_batch(data)

print("\nUpload Complete!")
print(f"Time taken: {time.time() - start_time:.2f} seconds")
print(f"Successfully uploaded: {successful}")
print(f"Failed uploads: {len(failed)}")

if failed:

    with open('failed_uploads.json', 'w') as f:
        json.dump(failed, f, indent=2)
    print("Failed entries have been saved to 'failed_uploads.json'")
