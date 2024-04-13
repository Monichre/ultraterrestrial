// Generated by Xata Codegen 0.29.4. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "topics",
    columns: [
      { name: "name", type: "string" },
      { name: "summary", type: "text" },
    ],
    revLinks: [
      { column: "topics", table: "events" },
      { column: "topic", table: "testimonies" },
      { column: "topic", table: "topic-subject-matter-experts" },
    ],
  },
  {
    name: "personnel",
    columns: [
      { name: "name", type: "string" },
      { name: "bio", type: "text" },
      { name: "role", type: "string" },
      { name: "photo", type: "text" },
      { name: "facebook", type: "string" },
      { name: "twitter", type: "string" },
      { name: "website", type: "string" },
      { name: "instagram", type: "string" },
    ],
    revLinks: [
      { column: "personnel", table: "events" },
      { column: "witness", table: "testimonies" },
      {
        column: "subject-matter-expert",
        table: "event-subject-matter-experts",
      },
      {
        column: "subject-matter-expert",
        table: "topic-subject-matter-experts",
      },
      { column: "member", table: "organization-members" },
    ],
  },
  {
    name: "events",
    columns: [
      { name: "name", type: "text" },
      { name: "description", type: "text" },
      { name: "date", type: "string" },
      { name: "location", type: "string" },
      { name: "latitude", type: "float" },
      { name: "longitude", type: "float" },
      {
        name: "personnel",
        type: "link",
        link: { table: "personnel" },
        unique: true,
      },
      { name: "topics", type: "link", link: { table: "topics" }, unique: true },
    ],
    revLinks: [
      { column: "event", table: "testimonies" },
      { column: "event", table: "event-subject-matter-experts" },
    ],
  },
  {
    name: "organizations",
    columns: [
      { name: "name", type: "string" },
      { name: "specialization", type: "string" },
      { name: "description", type: "text" },
      { name: "photo", type: "text" },
    ],
    revLinks: [{ column: "organization", table: "organization-members" }],
  },
  {
    name: "sightings",
    columns: [
      { name: "date", type: "datetime" },
      { name: "description", type: "string" },
      { name: "media_link", type: "string" },
      { name: "city", type: "string" },
      { name: "state", type: "string" },
      { name: "country", type: "string" },
      { name: "shape", type: "string" },
      { name: "duration_seconds", type: "string" },
      { name: "duration_hours_min", type: "string" },
      { name: "comments", type: "string" },
      { name: "date_posted", type: "datetime" },
      { name: "latitude", type: "float" },
      { name: "longitude", type: "float" },
    ],
  },
  {
    name: "testimonies",
    columns: [
      { name: "witness", type: "link", link: { table: "personnel" } },
      { name: "claim", type: "text" },
      { name: "date", type: "datetime" },
      { name: "topic", type: "link", link: { table: "topics" }, unique: true },
      { name: "event", type: "link", link: { table: "events" }, unique: true },
      { name: "documentation", type: "file[]" },
    ],
  },
  {
    name: "event-subject-matter-experts",
    columns: [
      { name: "event", type: "link", link: { table: "events" } },
      {
        name: "subject-matter-expert",
        type: "link",
        link: { table: "personnel" },
      },
    ],
  },
  {
    name: "topic-subject-matter-experts",
    columns: [
      { name: "topic", type: "link", link: { table: "topics" } },
      {
        name: "subject-matter-expert",
        type: "link",
        link: { table: "personnel" },
      },
    ],
  },
  {
    name: "organization-members",
    columns: [
      { name: "member", type: "link", link: { table: "personnel" } },
      { name: "organization", type: "link", link: { table: "organizations" } },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Topics = InferredTypes["topics"];
export type TopicsRecord = Topics & XataRecord;

export type Personnel = InferredTypes["personnel"];
export type PersonnelRecord = Personnel & XataRecord;

export type Events = InferredTypes["events"];
export type EventsRecord = Events & XataRecord;

export type Organizations = InferredTypes["organizations"];
export type OrganizationsRecord = Organizations & XataRecord;

export type Sightings = InferredTypes["sightings"];
export type SightingsRecord = Sightings & XataRecord;

export type Testimonies = InferredTypes["testimonies"];
export type TestimoniesRecord = Testimonies & XataRecord;

export type EventSubjectMatterExperts =
  InferredTypes["event-subject-matter-experts"];
export type EventSubjectMatterExpertsRecord = EventSubjectMatterExperts &
  XataRecord;

export type TopicSubjectMatterExperts =
  InferredTypes["topic-subject-matter-experts"];
export type TopicSubjectMatterExpertsRecord = TopicSubjectMatterExperts &
  XataRecord;

export type OrganizationMembers = InferredTypes["organization-members"];
export type OrganizationMembersRecord = OrganizationMembers & XataRecord;

export type DatabaseSchema = {
  topics: TopicsRecord;
  personnel: PersonnelRecord;
  events: EventsRecord;
  organizations: OrganizationsRecord;
  sightings: SightingsRecord;
  testimonies: TestimoniesRecord;
  "event-subject-matter-experts": EventSubjectMatterExpertsRecord;
  "topic-subject-matter-experts": TopicSubjectMatterExpertsRecord;
  "organization-members": OrganizationMembersRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://Liam-Ellis-s-workspace-kgubvq.us-east-1.xata.sh/db/ultraterrestrial",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};