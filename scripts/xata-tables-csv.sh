#!/bin/bash

# Define the array of table names
table_names=(
    "event-subject-matter-experts"
    "event-topic-subject-matter-experts"
    "events"
    "organization-members"
    "organizations"
    "personnel"
    "testimonies"
    "topic-subject-matter-experts"
    "topics"
    "topics-testimonies"
    "locations"
    "documents"
)

today=$(date +%Y-%m-%d)
# Create the directory if it doesn't exist
mkdir -p "./docs/models/${today}/csv"
folder="./docs/models/${today}/csv"

# Loop through the array of table names
for table in "${table_names[@]}"; do
    # Execute the cURL request and redirect output to a file named after the table
    curl -X POST https://ultraterrestrial-kgubvq.us-east-1.xata.sh/db/ultraterrestrial:main/sql \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer ${XATA_API_KEY}" \
    -d "{
        \"statement\": \"select * from \\\"${table}\\\";\",
        \"consistency\": \"strong\",
        \"responseType\": \"json\"
    }" > "${folder}/${table}.json"
    
    # Convert JSON to CSV
    jq -r '[
        (.[0] | keys_unsorted) as $keys |
        $keys,
        (.[] | [.[$keys[]]])
    ] | @csv' "${folder}/${table}.json" > "${folder}/${table}.csv"
done

# Clean up JSON files if not needed
rm -f "${folder}"/*.json

echo "CSV files are saved in ${folder}"