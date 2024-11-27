# XATA_DATABASE_URL=https://UltraTerrestrial-kgubvq.us-east-1.xata.sh/db/ultraterrestrial
# XATA_API_KEY=xau_LKJxzxjzXasEUXxjmhCBACdTCvi5Ed2v1

from xata.client import XataClient
xata = XataClient()

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