from xata.client import XataClient
xata = XataClient()

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