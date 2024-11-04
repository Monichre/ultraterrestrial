create table key_figures
(
    id          serial
        primary key,
    xata_id     varchar
        unique,
    name        varchar,
    bio         text,
    role        varchar,
    facebook    varchar,
    twitter     varchar,
    website     varchar,
    instagram   varchar,
    rank        integer,
    photo       jsonb,
    credibility integer,
    popularity  integer,
    authority   integer,
    created_at  timestamp,
    updated_at  timestamp,
    version     integer
);

alter table key_figures
    owner to postgres;

grant delete, insert, references, select, trigger, truncate, update on key_figures to anon;

grant delete, insert, references, select, trigger, truncate, update on key_figures to authenticated;

grant delete, insert, references, select, trigger, truncate, update on key_figures to service_role;

