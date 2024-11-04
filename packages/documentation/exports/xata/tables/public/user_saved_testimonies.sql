create table user_saved_testimonies
(
    id           serial
        primary key,
    user_id      integer
        references users
            on delete cascade,
    testimony_id integer
        references testimonies
            on delete set null,
    note         text,
    note_title   text
);

alter table user_saved_testimonies
    owner to postgres;

grant delete, insert, references, select, trigger, truncate, update on user_saved_testimonies to anon;

grant delete, insert, references, select, trigger, truncate, update on user_saved_testimonies to authenticated;

grant delete, insert, references, select, trigger, truncate, update on user_saved_testimonies to service_role;

