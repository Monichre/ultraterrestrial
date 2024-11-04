#!/bin/bash

# Variables
CSV_DIR=$1 # Directory containing CSV files
DB_USER=${2:-postgres}
DB_NAME=${3:-postgres} 
DB_PASSWORD=${4:-postgres}

# Check if directory argument was provided
if [ -z "$CSV_DIR" ]; then
    echo "Please provide the directory path containing CSV files"
    echo "Usage: $0 <csv_directory> [db_user] [db_name] [db_password]"
    exit 1
fi

# Check if directory exists
if [ ! -d "$CSV_DIR" ]; then
    echo "Directory $CSV_DIR does not exist"
    exit 1
fi

# Export password for psql commands
export PGPASSWORD=$DB_PASSWORD

# Process each CSV file in the directory
for CSV_FILE in "$CSV_DIR"/*.csv; do
    if [ -f "$CSV_FILE" ]; then
        # Get table name from filename without extension
        TABLE_NAME=$(basename "$CSV_FILE" .csv)
        echo "Processing $TABLE_NAME..."

        # Get headers from CSV file and transform into SQL columns
        HEADERS=$(head -n 1 "$CSV_FILE")
        SQL_COLUMNS=$(echo "$HEADERS" | sed 's/,/ VARCHAR(255),/g') VARCHAR(255)

        # Create SQL commands
        SQL_COMMANDS="
            DROP TABLE IF EXISTS $TABLE_NAME;
            CREATE TABLE $TABLE_NAME ($SQL_COLUMNS);
            \copy $TABLE_NAME FROM '$CSV_FILE' DELIMITER ',' CSV HEADER;
        "

        # Execute SQL commands
        if psql -U "$DB_USER" -d "$DB_NAME" -c "$SQL_COMMANDS"; then
            echo "Successfully created and populated table $TABLE_NAME"
        else
            echo "Error processing $TABLE_NAME"
        fi
    fi
done

echo "All CSV files processed"