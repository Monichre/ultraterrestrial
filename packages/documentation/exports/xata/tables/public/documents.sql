create table documents
(
    id        bigserial
        primary key,
    content   text,
    metadata  jsonb,
    embedding vector(1536)
);

alter table documents
    owner to postgres;

grant delete, insert, references, select, trigger, truncate, update on documents to anon;

grant delete, insert, references, select, trigger, truncate, update on documents to authenticated;

grant delete, insert, references, select, trigger, truncate, update on documents to service_role;

