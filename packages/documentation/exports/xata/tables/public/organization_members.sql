create table organization_members
(
    id              serial
        primary key,
    xata_id         varchar
        unique,
    member_id       integer
        references key_figures,
    organization_id integer
        references organizations,
    created_at      timestamp,
    updated_at      timestamp,
    version         integer
);

alter table organization_members
    owner to postgres;

grant delete, insert, references, select, trigger, truncate, update on organization_members to anon;

grant delete, insert, references, select, trigger, truncate, update on organization_members to authenticated;

grant delete, insert, references, select, trigger, truncate, update on organization_members to service_role;

