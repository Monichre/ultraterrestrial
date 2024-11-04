create table organizations
(
    id             serial
        primary key,
    xata_id        varchar
        unique,
    name           varchar,
    specialization varchar,
    description    text,
    photo          text,
    image          text,
    created_at     timestamp,
    updated_at     timestamp,
    version        integer
);

alter table organizations
    owner to postgres;

grant delete, insert, references, select, trigger, truncate, update on organizations to anon;

grant delete, insert, references, select, trigger, truncate, update on organizations to authenticated;

grant delete, insert, references, select, trigger, truncate, update on organizations to service_role;

