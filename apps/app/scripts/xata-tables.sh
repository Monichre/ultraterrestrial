#!/bin/bash

# Define the array of table names
table_names=(
    "event-subject-matter-experts"
    "event-topic-subject-matter-experts"
    "artifacts"
    "documents"
    "events"
    "organization-members"
    "organizations"
    "personnel"
    "tags"
    "testimonies"
    "theories"
    "topic-subject-matter-experts"
    "topics"
    "topics-testimonies"
    "user-saved-documents"
    "user-saved-events"
    "user-saved-key-figure"
    "user-saved-organizations"
    "user-saved-sightings"
    "user-saved-testimonies"
    "user-saved-topics"
    "user-theories"
    "users"
    "artifacts"
    ""
)
today=$(date +%Y-%m-%d)
# Create the directory if it doesn't exist
mkdir -p "./docs/models/${today}/json"
folder="./docs/models/${today}/json"

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
done
