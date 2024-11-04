create table artifacts
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
    images      text[],
    xata_id     text
        unique
);

alter table artifacts
    owner to postgres;

grant delete, insert, references, select, trigger, truncate, update on artifacts to anon;

grant delete, insert, references, select, trigger, truncate, update on artifacts to authenticated;

grant delete, insert, references, select, trigger, truncate, update on artifacts to service_role;

