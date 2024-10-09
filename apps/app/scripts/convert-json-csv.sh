# #!/bin/bash

# # Directory containing the JSON files
# json_folder="./docs/models/$(date +%Y-%m-%d)/csv"

# # Output directory for the CSV files
# csv_folder="$json_folder"

# # Ensure the JSON folder exists
# if [ ! -d "$json_folder" ]; then
#     echo "JSON folder does not exist: $json_folder"
#     exit 1
# fi

# # Loop through each JSON file in the folder
# for json_file in "$json_folder"/*.json; do
#     # Check if the file exists
#     if [ ! -f "$json_file" ]; then
#         echo "No JSON files found in $json_folder"
#         exit 1
#     fi
# a
#     # Get the base name of the file (e.g., "topics.json" -> "topics")
#     base_name=$(basename "$json_file" .json)

#     echo "Processing file $json_file"

#     # Define the output CSV file path
#     output_csv="${csv_folder}/${base_name}.csv"

#     # Remove the CSV file if it exists
#     if [ -f "$output_csv" ]; then
#         rm "$output_csv"
#     fi

#     # Convert JSON to CSV
#     jq -r '
#         # Get field names from the first record
#         .records[0] | keys_unsorted as $fields |
#         $fields | @csv,
#         # Then process all records
#         .records[] | [ $fields[] as $f |
#             (.[$f] // "" |
#                 # Handle nested arrays and objects
#                 if type == "array" or type == "object" then
#                     @json
#                 else
#                     tostring
#                 end
#             )
#         ] | @csv
#     ' "$json_file" >"$output_csv"

#     if [ $? -ne 0 ]; then
#         echo "Error converting $json_file to CSV"
#         continue
#     fi

#     echo "CSV file created: $output_csv"
# done

# echo "All JSON files have been processed."

convert_records_to_csv() {
    local json_folder="./docs/models/2024-10-08/csv"
    local csv_folder="$json_folder"

    # Check if json_folder exists
    if [ ! -d "$json_folder" ]; then
        echo "JSON folder '$json_folder' does not exist."
        return 1
    fi

    # Loop through each JSON file in the json_folder
    for json_file in "$json_folder"/*.json; do
        # Check if any JSON files are present
        if [ ! -e "$json_file" ]; then
            echo "No JSON files found in $json_folder"
            continue
        fi

        # Get the base name of the file (e.g., 'testimonies.json' -> 'testimonies')
        base_name=$(basename "$json_file" .json)
        echo "Processing file $json_file"

        # Define the output CSV file path
        output_csv="${csv_folder}/${base_name}.csv"

        # Extract the 'records' array and convert to CSV
        jq -r '
            if (.records | length) > 0 then
                [ .records[0] | keys_unsorted ] as $fields |
                $fields | @csv,
                .records[] | [
                    $fields[] as $f |
                    ( .[$f] // "" |
                        if type == "object" or type == "array" then
                            @json
                        elif type == "string" then
                            gsub("[\r\n]"; " ")
                        else
                            tostring
                        end
                    )
                ] | @csv
            else
                empty
            end
        ' "$json_file" >"$output_csv"

        # Check if jq command was successful
        if [ $? -ne 0 ]; then
            echo "Error converting $json_file to CSV"
            continue
        fi

        echo "CSV file created: $output_csv"
    done

    echo "All JSON files have been processed."
}

# Call the function
convert_records_to_csv
