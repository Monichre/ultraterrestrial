create table topics_testimonies
(
    id           serial
        primary key,
    xata_id      varchar
        unique,
    topic_id     integer
        references topics,
    testimony_id integer
        references testimonies,
    created_at   timestamp,
    updated_at   timestamp,
    version      integer
);

alter table topics_testimonies
    owner to postgres;

grant delete, insert, references, select, trigger, truncate, update on topics_testimonies to anon;

grant delete, insert, references, select, trigger, truncate, update on topics_testimonies to authenticated;

grant delete, insert, references, select, trigger, truncate, update on topics_testimonies to service_role;

