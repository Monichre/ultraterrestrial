create table events
(
    id          serial
        primary key,
    xata_id     varchar
        unique,
    name        varchar,
    location    varchar,
    date        date,
    latitude    real,
    longitude   real,
    description text,
    photos      jsonb
);

alter table events
    owner to postgres;

grant delete, insert, references, select, trigger, truncate, update on events to anon;

grant delete, insert, references, select, trigger, truncate, update on events to authenticated;

grant delete, insert, references, select, trigger, truncate, update on events to service_role;

