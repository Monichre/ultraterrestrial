--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: artifacts; Type: TABLE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE TABLE public.artifacts (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    photos text[],
    date text,
    source text,
    origin text,
    images text[],
    xata_id text
);


ALTER TABLE public.artifacts OWNER TO ultraterrestrial_owner;

--
-- Name: artifacts_id_seq; Type: SEQUENCE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE SEQUENCE public.artifacts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.artifacts_id_seq OWNER TO ultraterrestrial_owner;

--
-- Name: artifacts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ultraterrestrial_owner
--

ALTER SEQUENCE public.artifacts_id_seq OWNED BY public.artifacts.id;


--
-- Name: documents; Type: TABLE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE TABLE public.documents (
    id integer NOT NULL,
    file text[],
    content text,
    title text NOT NULL,
    date timestamp without time zone,
    author_id integer,
    organization_id integer,
    url text
);


ALTER TABLE public.documents OWNER TO ultraterrestrial_owner;

--
-- Name: documents_id_seq; Type: SEQUENCE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE SEQUENCE public.documents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.documents_id_seq OWNER TO ultraterrestrial_owner;

--
-- Name: documents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ultraterrestrial_owner
--

ALTER SEQUENCE public.documents_id_seq OWNED BY public.documents.id;


--
-- Name: event_subject_matter_experts; Type: TABLE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE TABLE public.event_subject_matter_experts (
    id integer NOT NULL,
    event_id integer,
    subject_matter_expert_id integer
);


ALTER TABLE public.event_subject_matter_experts OWNER TO ultraterrestrial_owner;

--
-- Name: event_subject_matter_experts_id_seq; Type: SEQUENCE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE SEQUENCE public.event_subject_matter_experts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.event_subject_matter_experts_id_seq OWNER TO ultraterrestrial_owner;

--
-- Name: event_subject_matter_experts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ultraterrestrial_owner
--

ALTER SEQUENCE public.event_subject_matter_experts_id_seq OWNED BY public.event_subject_matter_experts.id;


--
-- Name: event_topic_subject_matter_experts; Type: TABLE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE TABLE public.event_topic_subject_matter_experts (
    id integer NOT NULL,
    event_id integer,
    topic_id integer,
    subject_matter_expert_id integer
);


ALTER TABLE public.event_topic_subject_matter_experts OWNER TO ultraterrestrial_owner;

--
-- Name: event_topic_subject_matter_experts_id_seq; Type: SEQUENCE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE SEQUENCE public.event_topic_subject_matter_experts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.event_topic_subject_matter_experts_id_seq OWNER TO ultraterrestrial_owner;

--
-- Name: event_topic_subject_matter_experts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ultraterrestrial_owner
--

ALTER SEQUENCE public.event_topic_subject_matter_experts_id_seq OWNED BY public.event_topic_subject_matter_experts.id;


--
-- Name: events; Type: TABLE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE TABLE public.events (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    location text,
    latitude double precision,
    longitude double precision,
    date timestamp without time zone,
    photos text[],
    metadata json DEFAULT '{}'::json,
    title text NOT NULL,
    summary text
);


ALTER TABLE public.events OWNER TO ultraterrestrial_owner;

--
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.events_id_seq OWNER TO ultraterrestrial_owner;

--
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ultraterrestrial_owner
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- Name: mindmaps; Type: TABLE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE TABLE public.mindmaps (
    id integer NOT NULL,
    json json DEFAULT '{}'::json,
    user_id integer,
    file text
);


ALTER TABLE public.mindmaps OWNER TO ultraterrestrial_owner;

--
-- Name: mindmaps_id_seq; Type: SEQUENCE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE SEQUENCE public.mindmaps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mindmaps_id_seq OWNER TO ultraterrestrial_owner;

--
-- Name: mindmaps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ultraterrestrial_owner
--

ALTER SEQUENCE public.mindmaps_id_seq OWNED BY public.mindmaps.id;


--
-- Name: organization_members; Type: TABLE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE TABLE public.organization_members (
    id integer NOT NULL,
    member_id integer,
    organization_id integer
);


ALTER TABLE public.organization_members OWNER TO ultraterrestrial_owner;

--
-- Name: organization_members_id_seq; Type: SEQUENCE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE SEQUENCE public.organization_members_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.organization_members_id_seq OWNER TO ultraterrestrial_owner;

--
-- Name: organization_members_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ultraterrestrial_owner
--

ALTER SEQUENCE public.organization_members_id_seq OWNED BY public.organization_members.id;


--
-- Name: organizations; Type: TABLE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE TABLE public.organizations (
    id integer NOT NULL,
    name text NOT NULL,
    specialization text,
    description text,
    photo text,
    image text,
    title text NOT NULL
);


ALTER TABLE public.organizations OWNER TO ultraterrestrial_owner;

--
-- Name: organizations_id_seq; Type: SEQUENCE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE SEQUENCE public.organizations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.organizations_id_seq OWNER TO ultraterrestrial_owner;

--
-- Name: organizations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ultraterrestrial_owner
--

ALTER SEQUENCE public.organizations_id_seq OWNED BY public.organizations.id;


--
-- Name: personnel; Type: TABLE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE TABLE public.personnel (
    id integer NOT NULL,
    bio text,
    role text,
    facebook text,
    twitter text,
    website text,
    instagram text,
    photo text[],
    rank integer,
    credibility integer,
    popularity integer,
    name text NOT NULL,
    authority integer
);


ALTER TABLE public.personnel OWNER TO ultraterrestrial_owner;

--
-- Name: personnel_id_seq; Type: SEQUENCE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE SEQUENCE public.personnel_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.personnel_id_seq OWNER TO ultraterrestrial_owner;

--
-- Name: personnel_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ultraterrestrial_owner
--

ALTER SEQUENCE public.personnel_id_seq OWNED BY public.personnel.id;


--
-- Name: sightings; Type: TABLE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE TABLE public.sightings (
    id integer NOT NULL,
    date timestamp without time zone,
    description text,
    media_link text,
    city text,
    state text,
    country text,
    shape text,
    duration_seconds text,
    duration_hours_min text,
    comments text,
    date_posted timestamp without time zone,
    latitude double precision,
    longitude double precision
);


ALTER TABLE public.sightings OWNER TO ultraterrestrial_owner;

--
-- Name: sightings_id_seq; Type: SEQUENCE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE SEQUENCE public.sightings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sightings_id_seq OWNER TO ultraterrestrial_owner;

--
-- Name: sightings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ultraterrestrial_owner
--

ALTER SEQUENCE public.sightings_id_seq OWNED BY public.sightings.id;


--
-- Name: tags; Type: TABLE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE TABLE public.tags (
    id integer NOT NULL
);


ALTER TABLE public.tags OWNER TO ultraterrestrial_owner;

--
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE SEQUENCE public.tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tags_id_seq OWNER TO ultraterrestrial_owner;

--
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ultraterrestrial_owner
--

ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;


--
-- Name: testimonies; Type: TABLE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE TABLE public.testimonies (
    id integer NOT NULL,
    claim text,
    event_id integer,
    summary text,
    witness_id integer,
    documentation text[],
    date timestamp without time zone,
    organization_id integer
);


ALTER TABLE public.testimonies OWNER TO ultraterrestrial_owner;

--
-- Name: testimonies_id_seq; Type: SEQUENCE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE SEQUENCE public.testimonies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.testimonies_id_seq OWNER TO ultraterrestrial_owner;

--
-- Name: testimonies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ultraterrestrial_owner
--

ALTER SEQUENCE public.testimonies_id_seq OWNED BY public.testimonies.id;


--
-- Name: theories; Type: TABLE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE TABLE public.theories (
    id integer NOT NULL
);


ALTER TABLE public.theories OWNER TO ultraterrestrial_owner;

--
-- Name: theories_id_seq; Type: SEQUENCE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE SEQUENCE public.theories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.theories_id_seq OWNER TO ultraterrestrial_owner;

--
-- Name: theories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ultraterrestrial_owner
--

ALTER SEQUENCE public.theories_id_seq OWNED BY public.theories.id;


--
-- Name: topic_subject_matter_experts; Type: TABLE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE TABLE public.topic_subject_matter_experts (
    id integer NOT NULL,
    topic_id integer,
    subject_matter_expert_id integer
);


ALTER TABLE public.topic_subject_matter_experts OWNER TO ultraterrestrial_owner;

--
-- Name: topic_subject_matter_experts_id_seq; Type: SEQUENCE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE SEQUENCE public.topic_subject_matter_experts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.topic_subject_matter_experts_id_seq OWNER TO ultraterrestrial_owner;

--
-- Name: topic_subject_matter_experts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ultraterrestrial_owner
--

ALTER SEQUENCE public.topic_subject_matter_experts_id_seq OWNED BY public.topic_subject_matter_experts.id;


--
-- Name: topics; Type: TABLE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE TABLE public.topics (
    id integer NOT NULL,
    name text NOT NULL,
    summary text,
    photo text,
    photos text[],
    title text NOT NULL
);


ALTER TABLE public.topics OWNER TO ultraterrestrial_owner;

--
-- Name: topics_id_seq; Type: SEQUENCE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE SEQUENCE public.topics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.topics_id_seq OWNER TO ultraterrestrial_owner;

--
-- Name: topics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ultraterrestrial_owner
--

ALTER SEQUENCE public.topics_id_seq OWNED BY public.topics.id;


--
-- Name: topics_testimonies; Type: TABLE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE TABLE public.topics_testimonies (
    id integer NOT NULL,
    topic_id integer,
    testimony_id integer
);


ALTER TABLE public.topics_testimonies OWNER TO ultraterrestrial_owner;

--
-- Name: topics_testimonies_id_seq; Type: SEQUENCE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE SEQUENCE public.topics_testimonies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.topics_testimonies_id_seq OWNER TO ultraterrestrial_owner;

--
-- Name: topics_testimonies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ultraterrestrial_owner
--

ALTER SEQUENCE public.topics_testimonies_id_seq OWNED BY public.topics_testimonies.id;


--
-- Name: user_saved_documents; Type: TABLE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE TABLE public.user_saved_documents (
    id integer NOT NULL,
    user_id integer,
    document_id integer,
    theory_id integer,
    note text,
    note_title text
);


ALTER TABLE public.user_saved_documents OWNER TO ultraterrestrial_owner;

--
-- Name: user_saved_documents_id_seq; Type: SEQUENCE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE SEQUENCE public.user_saved_documents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_saved_documents_id_seq OWNER TO ultraterrestrial_owner;

--
-- Name: user_saved_documents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ultraterrestrial_owner
--

ALTER SEQUENCE public.user_saved_documents_id_seq OWNED BY public.user_saved_documents.id;


--
-- Name: user_saved_events; Type: TABLE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE TABLE public.user_saved_events (
    id integer NOT NULL,
    user_id integer,
    event_id integer,
    theory_id integer,
    note text,
    note_title text
);


ALTER TABLE public.user_saved_events OWNER TO ultraterrestrial_owner;

--
-- Name: user_saved_events_id_seq; Type: SEQUENCE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE SEQUENCE public.user_saved_events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_saved_events_id_seq OWNER TO ultraterrestrial_owner;

--
-- Name: user_saved_events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ultraterrestrial_owner
--

ALTER SEQUENCE public.user_saved_events_id_seq OWNED BY public.user_saved_events.id;


--
-- Name: user_saved_key_figure; Type: TABLE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE TABLE public.user_saved_key_figure (
    id integer NOT NULL,
    user_id integer,
    key_figure_id integer,
    theory_id integer,
    note text,
    note_title text
);


ALTER TABLE public.user_saved_key_figure OWNER TO ultraterrestrial_owner;

--
-- Name: user_saved_key_figure_id_seq; Type: SEQUENCE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE SEQUENCE public.user_saved_key_figure_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_saved_key_figure_id_seq OWNER TO ultraterrestrial_owner;

--
-- Name: user_saved_key_figure_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ultraterrestrial_owner
--

ALTER SEQUENCE public.user_saved_key_figure_id_seq OWNED BY public.user_saved_key_figure.id;


--
-- Name: user_saved_organizations; Type: TABLE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE TABLE public.user_saved_organizations (
    id integer NOT NULL,
    user_id integer,
    organization_id integer,
    theory_id integer,
    note text,
    note_title text
);


ALTER TABLE public.user_saved_organizations OWNER TO ultraterrestrial_owner;

--
-- Name: user_saved_organizations_id_seq; Type: SEQUENCE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE SEQUENCE public.user_saved_organizations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_saved_organizations_id_seq OWNER TO ultraterrestrial_owner;

--
-- Name: user_saved_organizations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ultraterrestrial_owner
--

ALTER SEQUENCE public.user_saved_organizations_id_seq OWNED BY public.user_saved_organizations.id;


--
-- Name: user_saved_sightings; Type: TABLE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE TABLE public.user_saved_sightings (
    id integer NOT NULL,
    user_id integer,
    sighting_id integer,
    theory_id integer,
    note text,
    note_title text
);


ALTER TABLE public.user_saved_sightings OWNER TO ultraterrestrial_owner;

--
-- Name: user_saved_sightings_id_seq; Type: SEQUENCE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE SEQUENCE public.user_saved_sightings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_saved_sightings_id_seq OWNER TO ultraterrestrial_owner;

--
-- Name: user_saved_sightings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ultraterrestrial_owner
--

ALTER SEQUENCE public.user_saved_sightings_id_seq OWNED BY public.user_saved_sightings.id;


--
-- Name: user_saved_testimonies; Type: TABLE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE TABLE public.user_saved_testimonies (
    id integer NOT NULL,
    user_id integer,
    testimony_id integer,
    theory_id integer,
    note text,
    note_title text
);


ALTER TABLE public.user_saved_testimonies OWNER TO ultraterrestrial_owner;

--
-- Name: user_saved_testimonies_id_seq; Type: SEQUENCE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE SEQUENCE public.user_saved_testimonies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_saved_testimonies_id_seq OWNER TO ultraterrestrial_owner;

--
-- Name: user_saved_testimonies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ultraterrestrial_owner
--

ALTER SEQUENCE public.user_saved_testimonies_id_seq OWNED BY public.user_saved_testimonies.id;


--
-- Name: user_saved_topics; Type: TABLE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE TABLE public.user_saved_topics (
    id integer NOT NULL,
    user_id integer,
    topic_id integer,
    theory_id integer,
    note text,
    note_title text
);


ALTER TABLE public.user_saved_topics OWNER TO ultraterrestrial_owner;

--
-- Name: user_saved_topics_id_seq; Type: SEQUENCE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE SEQUENCE public.user_saved_topics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_saved_topics_id_seq OWNER TO ultraterrestrial_owner;

--
-- Name: user_saved_topics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ultraterrestrial_owner
--

ALTER SEQUENCE public.user_saved_topics_id_seq OWNED BY public.user_saved_topics.id;


--
-- Name: user_theories; Type: TABLE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE TABLE public.user_theories (
    id integer NOT NULL,
    user_id integer,
    name text NOT NULL,
    content text,
    synopsis text,
    diagrams text[]
);


ALTER TABLE public.user_theories OWNER TO ultraterrestrial_owner;

--
-- Name: user_theories_id_seq; Type: SEQUENCE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE SEQUENCE public.user_theories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_theories_id_seq OWNER TO ultraterrestrial_owner;

--
-- Name: user_theories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ultraterrestrial_owner
--

ALTER SEQUENCE public.user_theories_id_seq OWNED BY public.user_theories.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email text NOT NULL,
    name text NOT NULL,
    photo text,
    profile_image_url text,
    external_id text
);


ALTER TABLE public.users OWNER TO ultraterrestrial_owner;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: ultraterrestrial_owner
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO ultraterrestrial_owner;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ultraterrestrial_owner
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: artifacts id; Type: DEFAULT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.artifacts ALTER COLUMN id SET DEFAULT nextval('public.artifacts_id_seq'::regclass);


--
-- Name: documents id; Type: DEFAULT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.documents ALTER COLUMN id SET DEFAULT nextval('public.documents_id_seq'::regclass);


--
-- Name: event_subject_matter_experts id; Type: DEFAULT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.event_subject_matter_experts ALTER COLUMN id SET DEFAULT nextval('public.event_subject_matter_experts_id_seq'::regclass);


--
-- Name: event_topic_subject_matter_experts id; Type: DEFAULT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.event_topic_subject_matter_experts ALTER COLUMN id SET DEFAULT nextval('public.event_topic_subject_matter_experts_id_seq'::regclass);


--
-- Name: events id; Type: DEFAULT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- Name: mindmaps id; Type: DEFAULT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.mindmaps ALTER COLUMN id SET DEFAULT nextval('public.mindmaps_id_seq'::regclass);


--
-- Name: organization_members id; Type: DEFAULT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.organization_members ALTER COLUMN id SET DEFAULT nextval('public.organization_members_id_seq'::regclass);


--
-- Name: organizations id; Type: DEFAULT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.organizations ALTER COLUMN id SET DEFAULT nextval('public.organizations_id_seq'::regclass);


--
-- Name: personnel id; Type: DEFAULT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.personnel ALTER COLUMN id SET DEFAULT nextval('public.personnel_id_seq'::regclass);


--
-- Name: sightings id; Type: DEFAULT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.sightings ALTER COLUMN id SET DEFAULT nextval('public.sightings_id_seq'::regclass);


--
-- Name: tags id; Type: DEFAULT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);


--
-- Name: testimonies id; Type: DEFAULT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.testimonies ALTER COLUMN id SET DEFAULT nextval('public.testimonies_id_seq'::regclass);


--
-- Name: theories id; Type: DEFAULT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.theories ALTER COLUMN id SET DEFAULT nextval('public.theories_id_seq'::regclass);


--
-- Name: topic_subject_matter_experts id; Type: DEFAULT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.topic_subject_matter_experts ALTER COLUMN id SET DEFAULT nextval('public.topic_subject_matter_experts_id_seq'::regclass);


--
-- Name: topics id; Type: DEFAULT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.topics ALTER COLUMN id SET DEFAULT nextval('public.topics_id_seq'::regclass);


--
-- Name: topics_testimonies id; Type: DEFAULT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.topics_testimonies ALTER COLUMN id SET DEFAULT nextval('public.topics_testimonies_id_seq'::regclass);


--
-- Name: user_saved_documents id; Type: DEFAULT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_saved_documents ALTER COLUMN id SET DEFAULT nextval('public.user_saved_documents_id_seq'::regclass);


--
-- Name: user_saved_events id; Type: DEFAULT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_saved_events ALTER COLUMN id SET DEFAULT nextval('public.user_saved_events_id_seq'::regclass);


--
-- Name: user_saved_key_figure id; Type: DEFAULT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_saved_key_figure ALTER COLUMN id SET DEFAULT nextval('public.user_saved_key_figure_id_seq'::regclass);


--
-- Name: user_saved_organizations id; Type: DEFAULT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_saved_organizations ALTER COLUMN id SET DEFAULT nextval('public.user_saved_organizations_id_seq'::regclass);


--
-- Name: user_saved_sightings id; Type: DEFAULT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_saved_sightings ALTER COLUMN id SET DEFAULT nextval('public.user_saved_sightings_id_seq'::regclass);


--
-- Name: user_saved_testimonies id; Type: DEFAULT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_saved_testimonies ALTER COLUMN id SET DEFAULT nextval('public.user_saved_testimonies_id_seq'::regclass);


--
-- Name: user_saved_topics id; Type: DEFAULT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_saved_topics ALTER COLUMN id SET DEFAULT nextval('public.user_saved_topics_id_seq'::regclass);


--
-- Name: user_theories id; Type: DEFAULT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_theories ALTER COLUMN id SET DEFAULT nextval('public.user_theories_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: artifacts artifacts_name_key; Type: CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.artifacts
    ADD CONSTRAINT artifacts_name_key UNIQUE (name);


--
-- Name: artifacts artifacts_pkey; Type: CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.artifacts
    ADD CONSTRAINT artifacts_pkey PRIMARY KEY (id);


--
-- Name: documents documents_pkey; Type: CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_pkey PRIMARY KEY (id);


--
-- Name: event_subject_matter_experts event_subject_matter_experts_pkey; Type: CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.event_subject_matter_experts
    ADD CONSTRAINT event_subject_matter_experts_pkey PRIMARY KEY (id);


--
-- Name: event_topic_subject_matter_experts event_topic_subject_matter_experts_pkey; Type: CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.event_topic_subject_matter_experts
    ADD CONSTRAINT event_topic_subject_matter_experts_pkey PRIMARY KEY (id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: events events_title_key; Type: CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_title_key UNIQUE (title);


--
-- Name: mindmaps mindmaps_pkey; Type: CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.mindmaps
    ADD CONSTRAINT mindmaps_pkey PRIMARY KEY (id);


--
-- Name: organization_members organization_members_pkey; Type: CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.organization_members
    ADD CONSTRAINT organization_members_pkey PRIMARY KEY (id);


--
-- Name: organizations organizations_pkey; Type: CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_pkey PRIMARY KEY (id);


--
-- Name: organizations organizations_title_key; Type: CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_title_key UNIQUE (title);


--
-- Name: personnel personnel_name_key; Type: CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.personnel
    ADD CONSTRAINT personnel_name_key UNIQUE (name);


--
-- Name: personnel personnel_pkey; Type: CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.personnel
    ADD CONSTRAINT personnel_pkey PRIMARY KEY (id);


--
-- Name: sightings sightings_pkey; Type: CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.sightings
    ADD CONSTRAINT sightings_pkey PRIMARY KEY (id);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: testimonies testimonies_pkey; Type: CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.testimonies
    ADD CONSTRAINT testimonies_pkey PRIMARY KEY (id);


--
-- Name: theories theories_pkey; Type: CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.theories
    ADD CONSTRAINT theories_pkey PRIMARY KEY (id);


--
-- Name: topic_subject_matter_experts topic_subject_matter_experts_pkey; Type: CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.topic_subject_matter_experts
    ADD CONSTRAINT topic_subject_matter_experts_pkey PRIMARY KEY (id);


--
-- Name: topics topics_pkey; Type: CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.topics
    ADD CONSTRAINT topics_pkey PRIMARY KEY (id);


--
-- Name: topics_testimonies topics_testimonies_pkey; Type: CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.topics_testimonies
    ADD CONSTRAINT topics_testimonies_pkey PRIMARY KEY (id);


--
-- Name: topics topics_title_key; Type: CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.topics
    ADD CONSTRAINT topics_title_key UNIQUE (title);


--
-- Name: user_saved_documents user_saved_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_saved_documents
    ADD CONSTRAINT user_saved_documents_pkey PRIMARY KEY (id);


--
-- Name: user_saved_events user_saved_events_pkey; Type: CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_saved_events
    ADD CONSTRAINT user_saved_events_pkey PRIMARY KEY (id);


--
-- Name: user_saved_key_figure user_saved_key_figure_pkey; Type: CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_saved_key_figure
    ADD CONSTRAINT user_saved_key_figure_pkey PRIMARY KEY (id);


--
-- Name: user_saved_organizations user_saved_organizations_pkey; Type: CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_saved_organizations
    ADD CONSTRAINT user_saved_organizations_pkey PRIMARY KEY (id);


--
-- Name: user_saved_sightings user_saved_sightings_pkey; Type: CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_saved_sightings
    ADD CONSTRAINT user_saved_sightings_pkey PRIMARY KEY (id);


--
-- Name: user_saved_testimonies user_saved_testimonies_pkey; Type: CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_saved_testimonies
    ADD CONSTRAINT user_saved_testimonies_pkey PRIMARY KEY (id);


--
-- Name: user_saved_topics user_saved_topics_pkey; Type: CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_saved_topics
    ADD CONSTRAINT user_saved_topics_pkey PRIMARY KEY (id);


--
-- Name: user_theories user_theories_pkey; Type: CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_theories
    ADD CONSTRAINT user_theories_pkey PRIMARY KEY (id);


--
-- Name: user_theories user_theories_user_id_name_key; Type: CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_theories
    ADD CONSTRAINT user_theories_user_id_name_key UNIQUE (user_id, name);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: documents documents_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.personnel(id) ON DELETE SET NULL;


--
-- Name: documents documents_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON DELETE SET NULL;


--
-- Name: event_subject_matter_experts event_subject_matter_experts_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.event_subject_matter_experts
    ADD CONSTRAINT event_subject_matter_experts_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE;


--
-- Name: event_subject_matter_experts event_subject_matter_experts_subject_matter_expert_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.event_subject_matter_experts
    ADD CONSTRAINT event_subject_matter_experts_subject_matter_expert_id_fkey FOREIGN KEY (subject_matter_expert_id) REFERENCES public.personnel(id) ON DELETE CASCADE;


--
-- Name: event_topic_subject_matter_experts event_topic_subject_matter_expert_subject_matter_expert_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.event_topic_subject_matter_experts
    ADD CONSTRAINT event_topic_subject_matter_expert_subject_matter_expert_id_fkey FOREIGN KEY (subject_matter_expert_id) REFERENCES public.personnel(id) ON DELETE CASCADE;


--
-- Name: event_topic_subject_matter_experts event_topic_subject_matter_experts_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.event_topic_subject_matter_experts
    ADD CONSTRAINT event_topic_subject_matter_experts_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE;


--
-- Name: event_topic_subject_matter_experts event_topic_subject_matter_experts_topic_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.event_topic_subject_matter_experts
    ADD CONSTRAINT event_topic_subject_matter_experts_topic_id_fkey FOREIGN KEY (topic_id) REFERENCES public.topics(id) ON DELETE CASCADE;


--
-- Name: mindmaps mindmaps_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.mindmaps
    ADD CONSTRAINT mindmaps_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: organization_members organization_members_member_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.organization_members
    ADD CONSTRAINT organization_members_member_id_fkey FOREIGN KEY (member_id) REFERENCES public.personnel(id) ON DELETE CASCADE;


--
-- Name: organization_members organization_members_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.organization_members
    ADD CONSTRAINT organization_members_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON DELETE CASCADE;


--
-- Name: testimonies testimonies_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.testimonies
    ADD CONSTRAINT testimonies_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE SET NULL;


--
-- Name: testimonies testimonies_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.testimonies
    ADD CONSTRAINT testimonies_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON DELETE SET NULL;


--
-- Name: testimonies testimonies_witness_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.testimonies
    ADD CONSTRAINT testimonies_witness_id_fkey FOREIGN KEY (witness_id) REFERENCES public.personnel(id) ON DELETE SET NULL;


--
-- Name: topic_subject_matter_experts topic_subject_matter_experts_subject_matter_expert_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.topic_subject_matter_experts
    ADD CONSTRAINT topic_subject_matter_experts_subject_matter_expert_id_fkey FOREIGN KEY (subject_matter_expert_id) REFERENCES public.personnel(id) ON DELETE CASCADE;


--
-- Name: topic_subject_matter_experts topic_subject_matter_experts_topic_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.topic_subject_matter_experts
    ADD CONSTRAINT topic_subject_matter_experts_topic_id_fkey FOREIGN KEY (topic_id) REFERENCES public.topics(id) ON DELETE CASCADE;


--
-- Name: topics_testimonies topics_testimonies_testimony_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.topics_testimonies
    ADD CONSTRAINT topics_testimonies_testimony_id_fkey FOREIGN KEY (testimony_id) REFERENCES public.testimonies(id) ON DELETE CASCADE;


--
-- Name: topics_testimonies topics_testimonies_topic_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.topics_testimonies
    ADD CONSTRAINT topics_testimonies_topic_id_fkey FOREIGN KEY (topic_id) REFERENCES public.topics(id) ON DELETE CASCADE;


--
-- Name: user_saved_documents user_saved_documents_document_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_saved_documents
    ADD CONSTRAINT user_saved_documents_document_id_fkey FOREIGN KEY (document_id) REFERENCES public.documents(id) ON DELETE CASCADE;


--
-- Name: user_saved_documents user_saved_documents_theory_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_saved_documents
    ADD CONSTRAINT user_saved_documents_theory_id_fkey FOREIGN KEY (theory_id) REFERENCES public.user_theories(id) ON DELETE SET NULL;


--
-- Name: user_saved_documents user_saved_documents_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_saved_documents
    ADD CONSTRAINT user_saved_documents_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_saved_events user_saved_events_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_saved_events
    ADD CONSTRAINT user_saved_events_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE;


--
-- Name: user_saved_events user_saved_events_theory_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_saved_events
    ADD CONSTRAINT user_saved_events_theory_id_fkey FOREIGN KEY (theory_id) REFERENCES public.user_theories(id) ON DELETE SET NULL;


--
-- Name: user_saved_events user_saved_events_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_saved_events
    ADD CONSTRAINT user_saved_events_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_saved_key_figure user_saved_key_figure_key_figure_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_saved_key_figure
    ADD CONSTRAINT user_saved_key_figure_key_figure_id_fkey FOREIGN KEY (key_figure_id) REFERENCES public.personnel(id) ON DELETE CASCADE;


--
-- Name: user_saved_key_figure user_saved_key_figure_theory_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_saved_key_figure
    ADD CONSTRAINT user_saved_key_figure_theory_id_fkey FOREIGN KEY (theory_id) REFERENCES public.user_theories(id) ON DELETE SET NULL;


--
-- Name: user_saved_key_figure user_saved_key_figure_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_saved_key_figure
    ADD CONSTRAINT user_saved_key_figure_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_saved_organizations user_saved_organizations_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_saved_organizations
    ADD CONSTRAINT user_saved_organizations_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON DELETE CASCADE;


--
-- Name: user_saved_organizations user_saved_organizations_theory_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_saved_organizations
    ADD CONSTRAINT user_saved_organizations_theory_id_fkey FOREIGN KEY (theory_id) REFERENCES public.user_theories(id) ON DELETE SET NULL;


--
-- Name: user_saved_organizations user_saved_organizations_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_saved_organizations
    ADD CONSTRAINT user_saved_organizations_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_saved_sightings user_saved_sightings_sighting_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_saved_sightings
    ADD CONSTRAINT user_saved_sightings_sighting_id_fkey FOREIGN KEY (sighting_id) REFERENCES public.sightings(id) ON DELETE CASCADE;


--
-- Name: user_saved_sightings user_saved_sightings_theory_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_saved_sightings
    ADD CONSTRAINT user_saved_sightings_theory_id_fkey FOREIGN KEY (theory_id) REFERENCES public.user_theories(id) ON DELETE SET NULL;


--
-- Name: user_saved_sightings user_saved_sightings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_saved_sightings
    ADD CONSTRAINT user_saved_sightings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_saved_testimonies user_saved_testimonies_testimony_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_saved_testimonies
    ADD CONSTRAINT user_saved_testimonies_testimony_id_fkey FOREIGN KEY (testimony_id) REFERENCES public.testimonies(id) ON DELETE CASCADE;


--
-- Name: user_saved_testimonies user_saved_testimonies_theory_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_saved_testimonies
    ADD CONSTRAINT user_saved_testimonies_theory_id_fkey FOREIGN KEY (theory_id) REFERENCES public.user_theories(id) ON DELETE SET NULL;


--
-- Name: user_saved_testimonies user_saved_testimonies_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_saved_testimonies
    ADD CONSTRAINT user_saved_testimonies_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_saved_topics user_saved_topics_theory_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_saved_topics
    ADD CONSTRAINT user_saved_topics_theory_id_fkey FOREIGN KEY (theory_id) REFERENCES public.user_theories(id) ON DELETE SET NULL;


--
-- Name: user_saved_topics user_saved_topics_topic_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_saved_topics
    ADD CONSTRAINT user_saved_topics_topic_id_fkey FOREIGN KEY (topic_id) REFERENCES public.topics(id) ON DELETE CASCADE;


--
-- Name: user_saved_topics user_saved_topics_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_saved_topics
    ADD CONSTRAINT user_saved_topics_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_theories user_theories_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ultraterrestrial_owner
--

ALTER TABLE ONLY public.user_theories
    ADD CONSTRAINT user_theories_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

