#!/bin/bash

curl --request PATCH \
  --url 'https://ultraterrestrial-kgubvq.us-east-1.xata.sh/db/ultraterrestrial:main/tables/events/bulk' \
  --header 'Authorization: Bearer <XATA_API_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{ 
  "records": [
    {
      "email": "laurence@example.com",
      "name": "Laurence Fishburne",
      "team": "rec_cd8s4kbo8dsvsjilo1ug"
    },
    {
      "email": "hugo@example.com",
      "name": "Hugo Weaving",
      "team": "rec_cd8s4kbo8dsvsjilo1ug"
    },
    {
      "email": "joe@example.com",
      "name": "Joe Pantoliano",
      "team": "rec_cd8s4kbo8dsvsjilo1ug"
    }
  ]
  }'

# Bulk endpoint example: --url 'https://ultraterrestrial-kgubvq.us-east-1.xata.sh/db/ultraterrestrial:main/tables/events/bulk'
# Single Record Example: --url 'https://ultraterrestrial-kgubvq.us-east-1.xata.sh/db/ultraterrestrial:main/tables/events/data'
