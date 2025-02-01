# Instructions

This was your outline for the join tables segement of our workflow:

# Join Table Implementation Approach

## 1. Identify Existing Tables and Relationships

- event-subject-matter-experts
- event-topic-subject-matter-experts  
- topic-subject-matter-experts
- topics-testimonies
- testimonies

## 2. Implementation Steps

### Step 1: Data Validation

Reference schema at `/Users/liamellis/Desktop/ultraterrestrial/apps/app/docs/ultraterrestial-schema.json`

Tasks:

- Verify all required IDs exist in source tables
- Validate relationship integrity
- Check for duplicate relationships

### Step 2: Relationship Extraction

Tasks:

- Extract event-topic relationships from network
- Extract testimony-expert relationships from testimony data
- Extract topic-expert relationships from analysis
- Map cross-category relationships

### Step 3: Metadata Enhancement  

Tasks:

- Calculate confidence scores
- Determine expertise levels
- Verify relationship types
- Add temporal metadata

### Step 4: Record Creation

Tasks:

- Generate join table records
- Validate record structure
- Add metadata and scores
- Prepare for batch insertion

### Step 5: Data Insertion

Tasks:

- Create join tables in Xata
- Batch insert records
- Verify insertion success
- Update relationship counts

## 3. Validation Criteria

### Relationship Integrity

- All referenced IDs must exist
- No duplicate relationships
- Valid metadata values

### Data Quality

- Complete required fields
- Valid score ranges
- Consistent relationship types

### Temporal Consistency

- Valid date ranges
- Chronological integrity
- Historical accuracy

## Implementation Notes

Approach outline saved to `join_table_approach.json`

### Next Steps Options

1. Begin implementing any specific step
2. Create detailed plan for particular join table
3. Generate sample records for validation
4. Create actual Xata table schemas

### Key Benefits

- Data integrity across relationships
- Proper metadata and scoring
- Temporal consistency
- Clear relationship types
- Validation at each step

### Implementation Strategy

Will be done in phases with validation at each step to:

- Catch issues early
- Maintain data quality
- Ensure proper relationships
- Create accurate metadata

### Sample Code in Xata Python SDK for inserting records into the tables

```
from xata.client import XataClient
xata = XataClient()

data = xata.records().insert("topic-subject-matter-experts", {
    "topic": "rec_xyz",
    "subject-matter-expert": "rec_xyz"
})
print(data)
```
  
---

```
# 2
from xata.client import XataClient
xata = XataClient()

data = xata.records().insert("event-subject-matter-experts", {
    "event": "rec_xyz",
    "subject-matter-expert": "rec_xyz"
})
```

---

```
from xata.client import XataClient
xata = XataClient()

data = xata.records().insert("event-topic-subject-matter-experts", {
    "event": "rec_xyz",
    "topic": "rec_xyz",
    "subject-matter-expert": "rec_xyz"
})
print(data)
```

---

```
from xata.client import XataClient
xata = XataClient()

data = xata.records().insert("topics-testimonies", {
    "topic": "rec_xyz",
    "testimony": "rec_xyz"
})
print(data)
```

---

```
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
```
