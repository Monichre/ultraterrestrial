create table user_saved_events
(
    id         serial
        primary key,
    user_id    integer
        references users
            on delete cascade,
    event_id   integer
        references events
            on delete cascade,
    note       text,
    note_title text
);

alter table user_saved_events
    owner to postgres;

grant delete, insert, references, select, trigger, truncate, update on user_saved_events to anon;

grant delete, insert, references, select, trigger, truncate, update on user_saved_events to authenticated;

grant delete, insert, references, select, trigger, truncate, update on user_saved_events to service_role;

