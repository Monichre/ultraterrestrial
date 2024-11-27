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

Here are the curl requests formatted for each table you listed. Each request retrieves 1000 entries per page.

curl --request POST \
  --url https://ultraterrestrial-kgubvq.us-east-1.xata.sh/db/ultraterrestrial:main/tables/topics/query \
  --header 'Authorization: Bearer xau_LKJxzxjzXasEUXxjmhCBACdTCvi5Ed2v1' \
  --header 'Content-Type: application/json' \
  --data '{"page":{"size":1000}}'

curl --request POST \
  --url https://ultraterrestrial-kgubvq.us-east-1.xata.sh/db/ultraterrestrial:main/tables/personnel/query \
  --header 'Authorization: Bearer xau_LKJxzxjzXasEUXxjmhCBACdTCvi5Ed2v1' \
  --header 'Content-Type: application/json' \
  --data '{"page":{"size":1000}}'

curl --request POST \
  --url https://ultraterrestrial-kgubvq.us-east-1.xata.sh/db/ultraterrestrial:main/tables/events/query \
  --header 'Authorization: Bearer xau_LKJxzxjzXasEUXxjmhCBACdTCvi5Ed2v1' \
  --header 'Content-Type: application/json' \
  --data '{"page":{"size":1000}}'

curl --request POST \
  --url https://ultraterrestrial-kgubvq.us-east-1.xata.sh/db/ultraterrestrial:main/tables/organizations/query \
  --header 'Authorization: Bearer xau_LKJxzxjzXasEUXxjmhCBACdTCvi5Ed2v1' \
  --header 'Content-Type: application/json' \
  --data '{"page":{"size":1000}}'

curl --request POST \
  --url https://ultraterrestrial-kgubvq.us-east-1.xata.sh/db/ultraterrestrial:main/tables/sightings/query \
  --header 'Authorization: Bearer xau_LKJxzxjzXasEUXxjmhCBACdTCvi5Ed2v1' \
  --header 'Content-Type: application/json' \
  --data '{"page":{"size":1000}}'

curl --request POST \
  --url https://ultraterrestrial-kgubvq.us-east-1.xata.sh/db/ultraterrestrial:main/tables/event-subject-matter-experts/query \
  --header 'Authorization: Bearer xau_LKJxzxjzXasEUXxjmhCBACdTCvi5Ed2v1' \
  --header 'Content-Type: application/json' \
  --data '{"page":{"size":1000}}'

curl --request POST \
  --url https://ultraterrestrial-kgubvq.us-east-1.xata.sh/db/ultraterrestrial:main/tables/topic-subject-matter-experts/query \
  --header 'Authorization: Bearer xau_LKJxzxjzXasEUXxjmhCBACdTCvi5Ed2v1' \
  --header 'Content-Type: application/json' \
  --data '{"page":{"size":1000}}'

curl --request POST \
  --url https://ultraterrestrial-kgubvq.us-east-1.xata.sh/db/ultraterrestrial:main/tables/organization-members/query \
  --header 'Authorization: Bearer xau_LKJxzxjzXasEUXxjmhCBACdTCvi5Ed2v1' \
  --header 'Content-Type: application/json' \
  --data '{"page":{"size":1000}}'

curl --request POST \
  --url https://ultraterrestrial-kgubvq.us-east-1.xata.sh/db/ultraterrestrial:main/tables/testimonies/query \
  --header 'Authorization: Bearer xau_LKJxzxjzXasEUXxjmhCBACdTCvi5Ed2v1' \
  --header 'Content-Type: application/json' \
  --data '{"page":{"size":1000}}'

curl --request POST \
  --url https://ultraterrestrial-kgubvq.us-east-1.xata.sh/db/ultraterrestrial:main/tables/topics-testimonies/query \
  --header 'Authorization: Bearer xau_LKJxzxjzXasEUXxjmhCBACdTCvi5Ed2v1' \
  --header 'Content-Type: application/json' \
  --data '{"page":{"size":1000}}'

curl --request POST \
  --url https://ultraterrestrial-kgubvq.us-east-1.xata.sh/db/ultraterrestrial:main/tables/documents/query \
  --header 'Authorization: Bearer xau_LKJxzxjzXasEUXxjmhCBACdTCvi5Ed2v1' \
  --header 'Content-Type: application/json' \
  --data '{"page":{"size":1000}}'

curl --request POST \
  --url https://ultraterrestrial-kgubvq.us-east-1.xata.sh/db/ultraterrestrial:main/tables/locations/query \
  --header 'Authorization: Bearer xau_LKJxzxjzXasEUXxjmhCBACdTCvi5Ed2v1' \
  --header 'Content-Type: application/json' \
  --data '{"page":{"size":1000}}'

curl --request POST \
  --url https://ultraterrestrial-kgubvq.us-east-1.xata.sh/db/ultraterrestrial:main/tables/event-topic-subject-matter-experts/query \
  --header 'Authorization: Bearer xau_LKJxzxjzXasEUXxjmhCBACdTCvi5Ed2v1' \
  --header 'Content-Type: application/json' \
  --data '{"page":{"size":1000}}'

curl --request POST \
  --url https://ultraterrestrial-kgubvq.us-east-1.xata.sh/db/ultraterrestrial:main/tables/users/query \
  --header 'Authorization: Bearer xau_LKJxzxjzXasEUXxjmhCBACdTCvi5Ed2v1' \
  --header 'Content-Type: application/json' \
  --data '{"page":{"size":1000}}'

curl --request POST \
  --url https://ultraterrestrial-kgubvq.us-east-1.xata.sh/db/ultraterrestrial:main/tables/user-saved-events/query \
  --header 'Authorization: Bearer xau_LKJxzxjzXasEUXxjmhCBACdTCvi5Ed2v1' \
  --header 'Content-Type: application/json' \
  --data '{"page":{"size":1000}}'

curl --request POST \
  --url https://ultraterrestrial-kgubvq.us-east-1.xata.sh/db/ultraterrestrial:main/tables/user-saved-topics/query \
  --header 'Authorization: Bearer xau_LKJxzxjzXasEUXxjmhCBACdTCvi5Ed2v1' \
  --header 'Content-Type: application/json' \
  --data '{"page":{"size":1000}}'

curl --request POST \
  --url https://ultraterrestrial-kgubvq.us-east-1.xata.sh/db/ultraterrestrial:main/tables/user-saved-key-figure/query \
  --header 'Authorization: Bearer xau_LKJxzxjzXasEUXxjmhCBACdTCvi5Ed2v1' \
  --header 'Content-Type: application/json' \
  --data '{"page":{"size":1000}}'

curl --request POST \
  --url https://ultraterrestrial-kgubvq.us-east-1.xata.sh/db/ultraterrestrial:main/tables/user-saved-testimonies/query \
  --header 'Authorization: Bearer xau_LKJxzxjzXasEUXxjmhCBACdTCvi5Ed2v1' \
  --header 'Content-Type: application/json' \
  --data '{"page":{"size":1000}}'

curl --request POST \
  --url https://ultraterrestrial-kgubvq.us-east-1.xata.sh/db/ultraterrestrial:main/tables/user-saved-documents/query \
  --header 'Authorization: Bearer xau_LKJxzxjzXasEUXxjmhCBACdTCvi5Ed2v1' \
  --header 'Content-Type: application/json' \
  --data '{"page":{"size":1000}}'

curl --request POST \
  --url https://ultraterrestrial-kgubvq.us-east-1.xata.sh/db/ultraterrestrial:main/tables/user-theories/query \
  --header 'Authorization: Bearer xau_LKJxzxjzXasEUXxjmhCBACdTCvi5Ed2v1' \
  --header 'Content-Type: application/json' \
  --data '{"page":{"size":1000}}'

curl --request POST \
  --url https://ultraterrestrial-kgubvq.us-east-1.xata.sh