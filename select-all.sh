#!/bin/bash

tables=$(psql -d ultraterrestrial -t -A -F"," -c "SELECT table_name FROM information_schema.tables WHERE table_schema='public';")

# Loop over each table and export to a CSV file
for table in $tables
do
    echo "Exporting $table to $table.csv"
    psql -d ultraterrestrial -t -A -F"," -c "SELECT * FROM $table;" > "${table}.csv"
done


