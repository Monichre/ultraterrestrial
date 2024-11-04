#!/bin/bash

source .env

// POST https://{workspace}.{region}.xata.sh/db/{db}:{branch}/tables/{table}/data

{
  "email": "keanu@example.com",
  "name": "Keanu Reeves"
}
# Get table name from first argument
TABLE=$1
shift

# Get data fields from remaining arguments
DATA=""
while [[ $# -gt 0 ]]; do
  key="$1"
  value="$2"
  
  # Add quotes around value if it's not already quoted
  if [[ ! $value =~ ^[\"\'] ]]; then
    value="\"$value\""
  fi
  
  # Add comma if not first field
  if [ ! -z "$DATA" ]; then
    DATA="$DATA,"
  fi
  
  DATA="$DATA\"$key\":$value"
  
  shift 2
done

# Construct full data JSON
DATA="{$DATA}"

# Make API request
curl --request POST \
  --url "https://ultraterrestrial-kgubvq.us-east-1.xata.sh/db/ultraterrestrial:main/tables/$TABLE/data?columns=id" \
  --header "Authorization: Bearer $XATA_API_KEY" \
  --header 'Content-Type: application/json' \
  --data "$DATA"

# Example usage:
# ./create-record.sh events name "Test Event" description "Test Description" date "2024-01-01T00:00:00Z"
