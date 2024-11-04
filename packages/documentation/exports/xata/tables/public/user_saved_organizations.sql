create table user_saved_organizations
(
    id              serial
        primary key,
    user_id         integer
        references users
            on delete cascade,
    organization_id integer
        references organizations
            on delete set null,
    note            text,
    note_title      text
);

alter table user_saved_organizations
    owner to postgres;

grant delete, insert, references, select, trigger, truncate, update on user_saved_organizations to anon;

grant delete, insert, references, select, trigger, truncate, update on user_saved_organizations to authenticated;

grant delete, insert, references, select, trigger, truncate, update on user_saved_organizations to service_role;

