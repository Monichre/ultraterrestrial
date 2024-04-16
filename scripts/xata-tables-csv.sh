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
)

for table in "${table_names[@]}"; do
    jq -r '.[] | [ .name, .age, .email] | @csv' "${table}.json" > "${table}.csv"
done