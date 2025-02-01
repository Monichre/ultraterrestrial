# IMPORTANT: DEMO ONLY
# ===============================================================================================

from xata.client import XataClient

# IMPORTANT: THIS IS A DEMO
xata = XataClient(
    api_key="xau_LKJxzxjzXasEUXxjmhCBACdTCvi5Ed2v1",
    db_url="https://UltraTerrestrial-kgubvq.us-east-1.xata.sh/db/ultraterrestrial"
)


# Events Demo Inssertion
data = xata.records().insert("events", {
    "name": "longer text",
    "description": "longer text",
    "location": "longer text",
    "latitude": 2.5,
    "longitude": 2.5,
    "date": "2000-01-01T00:00:00Z",
    "photos": [
        {
            "base64Content": "SGVsbG8gV29ybGQ=",
            "enablePublicUrl": False,
            "mediaType": "application/octet-stream",
            "name": "upload.txt",
            "signedUrlTimeout": 300
        }
    ],
    "metadata": "{\"foo\":\"bar\"}",
    "title": "longer text",
    "summary": "longer text",
    "category": [
        "string"
    ]
})
print(data)


# Personnel Demo
data = xata.records().insert("personnel", {
    "bio": "longer text",
    "role": "longer text",
    "facebook": "longer text",
    "twitter": "longer text",
    "website": "longer text",
    "instagram": "longer text",
    "photo": [
        {
            "base64Content": "SGVsbG8gV29ybGQ=",
            "enablePublicUrl": False,
            "mediaType": "application/octet-stream",
            "name": "upload.txt",
            "signedUrlTimeout": 300
        }
    ],
    "rank": 3,
    "credibility": 3,
    "popularity": 3,
    "name": "longer text",
    "authority": 3
})
print(data)





data = xata.records().insert("testimonies", {
    "claim": "longer text",
    "event": "rec_xyz",
    "summary": "longer text",
    "witness": "rec_xyz",
    "documentation": [
        {
            "base64Content": "SGVsbG8gV29ybGQ=",
            "enablePublicUrl": False,
            "mediaType": "application/octet-stream",
            "name": "upload.txt",
            "signedUrlTimeout": 300
        }
    ],
    "date": "2000-01-01T00:00:00Z",
    "organization": "rec_xyz",
    "source": "longer text",
    "media": [
        {
            "base64Content": "SGVsbG8gV29ybGQ=",
            "enablePublicUrl": False,
            "mediaType": "application/octet-stream",
            "name": "upload.txt",
            "signedUrlTimeout": 300
        }
    ],
    "context": "longer text"
})
print(data)
