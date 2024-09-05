CREATE TABLE "topics" (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255),
  summary TEXT,
  photo VARCHAR(255),
  photos TEXT[]
);

CREATE TABLE "personnel" (
  id VARCHAR(255) PRIMARY KEY,
  bio TEXT,
  role VARCHAR(255),
  facebook VARCHAR(255),
  twitter VARCHAR(255),
  website VARCHAR(255),
  instagram VARCHAR(255),
  photo TEXT[],
  rank INT,
  credibility INT,
  popularity INT,
  name VARCHAR(255) UNIQUE
);

CREATE TABLE "events" (
  id VARCHAR(255) PRIMARY KEY,
  name TEXT,
  description TEXT,
  location VARCHAR(255),
  latitude FLOAT,
  longitude FLOAT,
  date TIMESTAMP,
  photos TEXT[]
);

CREATE TABLE "organizations" (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255),
  specialization VARCHAR(255),
  description TEXT,
  photo TEXT,
  image VARCHAR(255)
);

CREATE TABLE "sightings" (
  id VARCHAR(255) PRIMARY KEY,
  date TIMESTAMP,
  description VARCHAR(255),
  media_link VARCHAR(255),
  city VARCHAR(255),
  state VARCHAR(255),
  country VARCHAR(255),
  shape VARCHAR(255),
  duration_seconds VARCHAR(255),
  duration_hours_min VARCHAR(255),
  comments VARCHAR(255),
  date_posted TIMESTAMP,
  latitude FLOAT,
  longitude FLOAT
);


CREATE TABLE "documents" (
  id VARCHAR(255) PRIMARY KEY,
  file TEXT[],
  content TEXT,
  embedding FLOAT[],
  title VARCHAR(255)
);

CREATE TABLE "locations" (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255),
  coordinates VARCHAR(255),
  "google-maps-location-id" TEXT,
  city VARCHAR(255),
  state VARCHAR(255),
  latitude FLOAT,
  longitude FLOAT
);


CREATE TABLE "users" (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  name VARCHAR(255),
  photo VARCHAR(255),
  "profile_image_url" VARCHAR(255),
  "external_id" VARCHAR(255)
);
CREATE TABLE "artifacts" (
  id VARCHAR(255) PRIMARY KEY,
  photos TEXT[],
  name VARCHAR(255),
  description TEXT,
  date TIMESTAMP,
  author VARCHAR(255) REFERENCES personnel(id),
  metadata JSONB
);

CREATE TABLE testimonies (
  id VARCHAR(255) PRIMARY KEY,
  claim TEXT,
  event VARCHAR(255) REFERENCES events(id),
  summary TEXT,
  witness VARCHAR(255) REFERENCES personnel(id),
  documentation TEXT[],
  date TIMESTAMP,
  organization VARCHAR(255) REFERENCES organizations(id)
);




CREATE TABLE "event-subject-matter-experts" (
  id VARCHAR(255) PRIMARY KEY,
  event VARCHAR(255) REFERENCES events(id),
  "subject-matter-expert" VARCHAR(255) REFERENCES personnel(id)
);

CREATE TABLE "topic-subject-matter-experts" (
  id VARCHAR(255) PRIMARY KEY,
  topic VARCHAR(255) REFERENCES topics(id),
  "subject-matter-expert" VARCHAR(255) REFERENCES personnel(id)
);

CREATE TABLE "organization-members" (
  id VARCHAR(255) PRIMARY KEY,
  member VARCHAR(255) REFERENCES personnel(id),
  organization VARCHAR(255) REFERENCES organizations(id)
);



CREATE TABLE "topics-testimonies" (
  id VARCHAR(255) PRIMARY KEY,
  topic VARCHAR(255) REFERENCES topics(id),
  testimony VARCHAR(255) REFERENCES testimonies(id)
);



CREATE TABLE "event-topic-subject-matter-experts" (
  id VARCHAR(255) PRIMARY KEY,
  event VARCHAR(255) REFERENCES events(id),
  topic VARCHAR(255) REFERENCES topics(id),
  "subject-matter-expert" VARCHAR(255) REFERENCES personnel(id)
);



CREATE TABLE "user-saved-events" (
  id VARCHAR(255) PRIMARY KEY,
  user VARCHAR(255) REFERENCES users(id),
  event VARCHAR(255) REFERENCES events(id),
  theory VARCHAR(255) REFERENCES "user-theories"(id),
  note TEXT
);

CREATE TABLE "user-saved-topics" (
  id VARCHAR(255) PRIMARY KEY,
  user VARCHAR(255) REFERENCES users(id),
  topic VARCHAR(255) REFERENCES topics(id),
  theory VARCHAR(255) REFERENCES "user-theories"(id),
  note TEXT
);

CREATE TABLE "user-saved-key-figure" (
  id VARCHAR(255) PRIMARY KEY,
  user VARCHAR(255) REFERENCES users(id),
  "key-figure" VARCHAR(255) REFERENCES personnel(id),
  theory VARCHAR(255) REFERENCES "user-theories"(id),
  note TEXT
);

CREATE TABLE "user-saved-testimonies" (
  id VARCHAR(255) PRIMARY KEY,
  user VARCHAR(255) REFERENCES users(id),
  testimony VARCHAR(255) REFERENCES testimonies(id),
  theory VARCHAR(255) REFERENCES "user-theories"(id),
  note TEXT
);

CREATE TABLE "user-saved-documents" (
  id VARCHAR(255) PRIMARY KEY,
  user VARCHAR(255) REFERENCES users(id),
  document VARCHAR(255) REFERENCES documents(id),
  theory VARCHAR(255) REFERENCES "user-theories"(id),
  note TEXT
);

CREATE TABLE "user-theories" (
  id VARCHAR(255) PRIMARY KEY,
  user VARCHAR(255) REFERENCES users(id),
  name VARCHAR(255),
  content TEXT,
  synopsis TEXT,
  diagrams TEXT[]
);

CREATE TABLE "user-saved-organizations" (
  id VARCHAR(255) PRIMARY KEY,
  user VARCHAR(255) REFERENCES users(id),
  organization VARCHAR(255) REFERENCES organizations(id),
  theory VARCHAR(255) REFERENCES "user-theories"(id),
  note TEXT
);

CREATE TABLE "user-saved-sightings" (
  id VARCHAR(255) PRIMARY KEY,
  user VARCHAR(255) REFERENCES users(id),
  sighting VARCHAR(255) REFERENCES sightings(id),
  theory VARCHAR(255) REFERENCES "user-theories"(id),
  note TEXT
);
