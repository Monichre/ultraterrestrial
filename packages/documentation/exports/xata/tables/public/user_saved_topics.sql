create table user_saved_topics
(
    id         serial
        primary key,
    user_id    integer
        references users
            on delete cascade,
    topic_id   integer
        references topics
            on delete cascade,
    note       text,
    note_title text
);

alter table user_saved_topics
    owner to postgres;

grant delete, insert, references, select, trigger, truncate, update on user_saved_topics to anon;

grant delete, insert, references, select, trigger, truncate, update on user_saved_topics to authenticated;

grant delete, insert, references, select, trigger, truncate, update on user_saved_topics to service_role;

