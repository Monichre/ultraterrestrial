from xata.client import XataClient
xata = XataClient()

data = xata.records().insert("documents", {
    "file": [
        {
            "base64Content": "SGVsbG8gV29ybGQ=",
            "enablePublicUrl": False,
            "mediaType": "application/octet-stream",
            "name": "upload.txt",
            "signedUrlTimeout": 300
        }
    ],
    "summary": "longer text",
    "embedding": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9
    ],
    "title": "longer text",
    "date": "2000-01-01T00:00:00Z",
    "author": "rec_xyz",
    "organization": "rec_xyz",
    "url": "longer text",
    "metadata": "{\"foo\":\"bar\"}",
    "images": [
        {
            "base64Content": "SGVsbG8gV29ybGQ=",
            "enablePublicUrl": False,
            "mediaType": "application/octet-stream",
            "name": "upload.txt",
            "signedUrlTimeout": 300
        }
    ]
})
print(data)
