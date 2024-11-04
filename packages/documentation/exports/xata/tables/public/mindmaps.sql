create table mindmaps
(
    id        serial
        primary key,
    json      json default '{}'::json,
    embedding vector(1536),
    user_id   integer
        references users
            on delete cascade,
    file      text
);

alter table mindmaps
    owner to postgres;

grant delete, insert, references, select, trigger, truncate, update on mindmaps to anon;

grant delete, insert, references, select, trigger, truncate, update on mindmaps to authenticated;

grant delete, insert, references, select, trigger, truncate, update on mindmaps to service_role;

