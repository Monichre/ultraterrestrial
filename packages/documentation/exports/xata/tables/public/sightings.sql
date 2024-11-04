create table sightings
(
    date               timestamp with time zone,
    description        text,
    media_link         text,
    city               varchar,
    state              varchar,
    country            varchar,
    shape              varchar,
    duration_seconds   varchar,
    duration_hours_min varchar,
    comments           text,
    date_posted        date,
    latitude           numeric,
    longitude          numeric
);

alter table sightings
    owner to postgres;

grant delete, insert, references, select, trigger, truncate, update on sightings to anon;

grant delete, insert, references, select, trigger, truncate, update on sightings to authenticated;

grant delete, insert, references, select, trigger, truncate, update on sightings to service_role;

