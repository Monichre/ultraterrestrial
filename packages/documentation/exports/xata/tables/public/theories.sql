create table theories
(
    id          serial
        primary key,
    description text,
    title       text
);

alter table theories
    owner to postgres;

grant delete, insert, references, select, trigger, truncate, update on theories to anon;

grant delete, insert, references, select, trigger, truncate, update on theories to authenticated;

grant delete, insert, references, select, trigger, truncate, update on theories to service_role;

