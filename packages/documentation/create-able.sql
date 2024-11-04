create table public.users
(
    id                serial
        primary key,
    email             text not null
        unique,
    name              text not null,
    photo             text,
    profile_image_url text,
    external_id       text
);



create table public.personnel
(
    id          serial
        primary key,
    bio         text,
    role        text,
    facebook    text,
    twitter     text,
    website     text,
    instagram   text,
    photo       text[],
    rank        integer,
    credibility integer,
    popularity  integer,
    name        text not null
        unique,
    authority   integer
);



create table public.organizations
(
    id             serial
        primary key,
    name           text not null,
    specialization text,
    description    text,
    photo          text,
    image          text,
    title          text not null
        unique
);



create table public.topics
(
    id      serial
        primary key,
    name    text not null,
    summary text,
    photo   text,
    photos  text[],
    title   text not null
        unique
);



create table public.events
(
    id          serial
        primary key,
    name        text not null,
    description text,
    location    text,
    latitude    double precision,
    longitude   double precision,
    date        timestamp,
    photos      text[],
    metadata    json default '{}'::json,
    title       text not null
        unique,
    summary     text
);



create table public.documents
(
    id              serial
        primary key,
    file            text[],
    content         text,
    title           text not null,
    date            timestamp,
    author_id       integer
                         references public.personnel
                             on delete set null,
    organization_id integer
                         references public.organizations
                             on delete set null,
    url             text
);



create table public.testimonies
(
    id              serial
        primary key,
    claim           text,
    event_id        integer
        references public.events
            on delete set null,
    summary         text,
    witness_id      integer
        references public.personnel
            on delete set null,
    documentation   text[],
    date            timestamp,
    organization_id integer
        references public.organizations
            on delete set null
);



create table public.event_subject_matter_experts
(
    id                       serial
        primary key,
    event_id                 integer
        references public.events
            on delete cascade,
    subject_matter_expert_id integer
        references public.personnel
            on delete cascade
);



create table public.topic_subject_matter_experts
(
    id                       serial
        primary key,
    topic_id                 integer
        references public.topics
            on delete cascade,
    subject_matter_expert_id integer
        references public.personnel
            on delete cascade
);



create table public.organization_members
(
    id              serial
        primary key,
    member_id       integer
        references public.personnel
            on delete cascade,
    organization_id integer
        references public.organizations
            on delete cascade
);



create table public.topics_testimonies
(
    id           serial
        primary key,
    topic_id     integer
        references public.topics
            on delete cascade,
    testimony_id integer
        references public.testimonies
            on delete cascade
);



create table public.event_topic_subject_matter_experts
(
    id                       serial
        primary key,
    event_id                 integer
        references public.events
            on delete cascade,
    topic_id                 integer
        references public.topics
            on delete cascade,
    subject_matter_expert_id integer
        constraint event_topic_subject_matter_expert_subject_matter_expert_id_fkey
            references public.personnel
            on delete cascade
);



create table public.sightings
(
    id                 serial
        primary key,
    date               timestamp,
    description        text,
    media_link         text,
    city               text,
    state              text,
    country            text,
    shape              text,
    duration_seconds   text,
    duration_hours_min text,
    comments           text,
    date_posted        timestamp,
    latitude           double precision,
    longitude          double precision
);



create table public.user_theories
(
    id       serial
        primary key,
    user_id  integer
        references public.users
            on delete cascade,
    name     text not null,
    content  text,
    synopsis text,
    diagrams text[],
    unique (user_id, name)
);



create table public.user_saved_events
(
    id         serial
        primary key,
    user_id    integer
        references public.users
            on delete cascade,
    event_id   integer
        references public.events
            on delete cascade,
    theory_id  integer
        references public.user_theories
            on delete set null,
    note       text,
    note_title text
);



create table public.user_saved_topics
(
    id         serial
        primary key,
    user_id    integer
        references public.users
            on delete cascade,
    topic_id   integer
        references public.topics
            on delete cascade,
    theory_id  integer
        references public.user_theories
            on delete set null,
    note       text,
    note_title text
);



create table public.user_saved_key_figure
(
    id            serial
        primary key,
    user_id       integer
        references public.users
            on delete cascade,
    key_figure_id integer
        references public.personnel
            on delete cascade,
    theory_id     integer
        references public.user_theories
            on delete set null,
    note          text,
    note_title    text
);



create table public.user_saved_testimonies
(
    id           serial
        primary key,
    user_id      integer
        references public.users
            on delete cascade,
    testimony_id integer
        references public.testimonies
            on delete cascade,
    theory_id    integer
        references public.user_theories
            on delete set null,
    note         text,
    note_title   text
);



create table public.user_saved_documents
(
    id          serial
        primary key,
    user_id     integer
        references public.users
            on delete cascade,
    document_id integer
        references public.documents
            on delete cascade,
    theory_id   integer
        references public.user_theories
            on delete set null,
    note        text,
    note_title  text
);



create table public.user_saved_organizations
(
    id              serial
        primary key,
    user_id         integer
        references public.users
            on delete cascade,
    organization_id integer
        references public.organizations
            on delete cascade,
    theory_id       integer
        references public.user_theories
            on delete set null,
    note            text,
    note_title      text
);



create table public.user_saved_sightings
(
    id          serial
        primary key,
    user_id     integer
        references public.users
            on delete cascade,
    sighting_id integer
        references public.sightings
            on delete cascade,
    theory_id   integer
        references public.user_theories
            on delete set null,
    note        text,
    note_title  text
);



create table public.mindmaps
(
    id      serial
        primary key,
    json    json default '{}'::json,
    user_id integer
        references public.users
            on delete cascade,
    file    text
);



create table public.artifacts
(
    id          serial
        primary key,
    name        text not null
        unique,
    description text,
    photos      text[],
    date        text,
    source      text,
    origin      text,
    images      text[]
);



create table public.tags
(
    id serial
        primary key
);



create table public.theories
(
    id serial
        primary key
);



