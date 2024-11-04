create table testimonies_xata
(
    xata_id       text not null
        primary key,
    claim         text,
    summary       text,
    documentation jsonb,
    event         text,
    date          text,
    witness       text,
    organization  text
);

alter table testimonies_xata
    owner to postgres;

grant delete, insert, references, select, trigger, truncate, update on testimonies_xata to anon;

grant delete, insert, references, select, trigger, truncate, update on testimonies_xata to authenticated;

grant delete, insert, references, select, trigger, truncate, update on testimonies_xata to service_role;

