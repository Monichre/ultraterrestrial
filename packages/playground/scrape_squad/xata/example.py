
# from xata.client import XataClient
# xata = XataClient()

# Insert a record into the personnel table
"""
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
"""

# Bulk insert records into the personnel table
"""
data = xata.records().bulk_insert("personnel", [
    {
        "bio": "longer text",
    }
])
from xata.client import XataClient

xata = XataClient(api_key="REDACTED_API_KEY", db_name="my_db", branch_name="feature-042")

new_key_figrues = [
  {"name": "Richard Dolan", "job": "Author & Ufologist. Researcher, historian, ufologist, and author of multiple books regarding UAPs."},
  {"name": "Nick Pope", "job": "Former British Ministry of Defense UFO Desk Officer. Author of multiple books regarding UAPs."},
  {"name": "J. Allen Hynek", "job": "Author & Astronomer. Researcher, astronomer, and author of multiple books regarding UAPs."},
  {"name": "Jacques Vallee", "job": "Author & Astronomer. Researcher, astronomer, and author of multiple books regarding UAPs."},
]
resp = xata.records().bulk_insert("key_figures", {"personnel": new_key_figrues})
assert resp.is_success()
"""

# Query 5 Personnel Example:
"""
from xata.client import XataClient
xata = XataClient()

data = xata.data().query("personnel", {
    "columns": [
        "bio",
        "role",
        "facebook",
        "twitter",
        "website",
        "instagram",
        "rank",
        "credibility",
        "popularity",
        "name",
        "authority"
    ],
    "sort": {
        "xata.createdAt": "desc"
    },
    "page": {
        "size": 15
    }
})
print(data)
"""