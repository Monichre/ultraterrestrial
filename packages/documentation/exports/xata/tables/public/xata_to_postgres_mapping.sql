create table xata_to_postgres_mapping
(
    xata_id varchar not null
        primary key,
    new_id  integer
);

alter table xata_to_postgres_mapping
    owner to postgres;

grant delete, insert, references, select, trigger, truncate, update on xata_to_postgres_mapping to anon;

grant delete, insert, references, select, trigger, truncate, update on xata_to_postgres_mapping to authenticated;

grant delete, insert, references, select, trigger, truncate, update on xata_to_postgres_mapping to service_role;

