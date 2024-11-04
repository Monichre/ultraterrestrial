#!/bin/bash

# Define the array of table names
table_names=(
    "topics"
    "personnel"
    "events"
    "organizations"
    "event-subject-matter-experts"
    "topic-subject-matter-experts"
    "organization-members"
    "testimonies"
    "topics-testimonies"
    "documents"
    "event-topic-subject-matter-experts"
    "artifacts"
)

today=$(date +%Y-%m-%d)
# Create the directory if it doesn't exist
mkdir -p "./docs/models/${today}/csv"
folder="./docs/models/${today}/csv"

# Loop through the array of table names
for table in "${table_names[@]}"; do
    echo "Processing table ${table}"

    output_csv="${folder}/${table}.csv"

    # # Remove the CSV file if it exists
    # if [ -f "$output_csv" ]; then
    #     rm "$output_csv"
    # fi

    echo "Fetching all records for table ${table}"

    # Prepare the SQL statement without LIMIT and OFFSET
    sql_statement="SELECT * FROM \\\"${table}\\\";"

    # Prepare the JSON file name
    json_file="${folder}/${table}.json"

    # Execute the cURL request and redirect output to the JSON file
    curl -s -X POST https://ultraterrestrial-kgubvq.us-east-1.xata.sh/db/ultraterrestrial:main/sql \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer ${XATA_API_KEY}" \
        -d "{
        \"statement\": \"${sql_statement}\",
        \"consistency\": \"strong\",
        \"responseType\": \"json\"
    }" >"${json_file}"

    echo "JSON file created: ${json_file}"

    # Check if any records were returned
    num_records=$(jq '.records | length' "${json_file}")

    echo "Number of records fetched: ${num_records}"

    # if [ "$num_records" -eq 0 ]; then
    #     echo "No records found for table ${table}"
    #     rm -f "${json_file}"
    #     continue
    # fi

    # Convert JSON to CSV
    jq -r '
        [ .columns[].name ] as $fields |
        # Exclude the "xata" field if desired
        ($fields | map(select(. != "xata"))) as $filtered_fields |
        $filtered_fields | @csv,
        .records[] | (
            [ $filtered_fields[] as $f |
                (.[$f] |
                    # Convert objects and arrays to JSON strings
                    if type == "object" or type == "array" then
                        @json
                    # Replace newlines and carriage returns in strings
                    elif type == "string" then
                        gsub("[\r\n]"; " ")
                    else
                        .
                    end
                )
            ] | @csv
        )
    ' "${json_file}" >"${output_csv}"

    # Remove the JSON file if not needed
    # rm -f "${json_file}"

done

echo "CSV files are saved in ${folder}"
