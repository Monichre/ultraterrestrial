# #!/bin/bash

# # Get the table name from the command line argument
# table=$1

# # Execute the cURL request and redirect output to a file named after the table
# curl -X POST https://ultraterrestrial-kgubvq.us-east-1.xata.sh/db/ultraterrestrial:main/sql \
# -H "Content-Type: application/json" \
# -H "Authorization: Bearer ${XATA_API_KEY}" \
# -d "{
#     \"statement\": \"select * from \\\"${table}\\\";\",
#     \"consistency\": \"strong\",
#     \"responseType\": \"json\"
# }" > "./docs/${table}.json"

# SELECT * FROM "topics";

# SELECT * FROM "personnel";
# SELECT * FROM "events";
# SELECT * FROM "organizations";

# -- SELECT * FROM "event-subject-matter-experts";
# -- SELECT * FROM "topic-subject-matter-experts";
# SELECT * FROM "organization-members";
# SELECT * FROM "testimonies";
# SELECT * FROM "topics-testimonies";
# SELECT * FROM "documents";
# -- SELECT * FROM "locations";
# SELECT * FROM "event-topic-subject-matter-experts";
# SELECT * FROM "users";
# SELECT * FROM "user-saved-events";
# SELECT * FROM "user-saved-topics";
# SELECT * FROM "user-saved-key-figure";
# SELECT * FROM "user-saved-testimonies";
# SELECT * FROM "user-saved-documents";
# SELECT * FROM "user-theories";
# SELECT * FROM "user-saved-organizations";
# SELECT * FROM "user-saved-sightings";
# SELECT * FROM "artifacts";
