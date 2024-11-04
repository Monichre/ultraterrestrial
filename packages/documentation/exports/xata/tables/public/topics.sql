create table topics
(
    id         serial
        primary key,
    xata_id    varchar
        unique,
    name       varchar,
    summary    text,
    photo      text,
    photos     jsonb,
    created_at timestamp,
    updated_at timestamp,
    version    integer
);

alter table topics
    owner to postgres;

grant delete, insert, references, select, trigger, truncate, update on topics to anon;

grant delete, insert, references, select, trigger, truncate, update on topics to authenticated;

grant delete, insert, references, select, trigger, truncate, update on topics to service_role;

