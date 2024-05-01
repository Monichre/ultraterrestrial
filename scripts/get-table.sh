#!/bin/bash

# Get the table name from the command line argument
table=$1

# Execute the cURL request and redirect output to a file named after the table
curl -X POST https://ultraterrestrial-kgubvq.us-east-1.xata.sh/db/ultraterrestrial:main/sql \
-H "Content-Type: application/json" \
-H "Authorization: Bearer ${XATA_API_KEY}" \
-d "{
    \"statement\": \"select * from \\\"${table}\\\";\",
    \"consistency\": \"strong\",
    \"responseType\": \"json\"
}" > "./docs/${table}.json"