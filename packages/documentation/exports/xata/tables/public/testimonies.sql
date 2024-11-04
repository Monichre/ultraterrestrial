create table testimonies
(
    id              serial
        primary key,
    xata_id         varchar
        unique,
    claim           text,
    summary         text,
    documentation   jsonb,
    event_id        integer
        references events,
    date            timestamp,
    witness_id      integer
        references key_figures,
    organization_id integer
        references organizations,
    created_at      timestamp,
    updated_at      timestamp,
    version         integer
);

alter table testimonies
    owner to postgres;

grant delete, insert, references, select, trigger, truncate, update on testimonies to anon;

grant delete, insert, references, select, trigger, truncate, update on testimonies to authenticated;

grant delete, insert, references, select, trigger, truncate, update on testimonies to service_role;

