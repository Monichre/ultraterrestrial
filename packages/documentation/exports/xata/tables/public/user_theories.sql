create table user_theories
(
    id          serial
        primary key,
    user_id     integer
        references users
            on delete cascade,
    title       text not null,
    content     text,
    synopsis    text,
    diagrams    text[],
    description text,
    constraint user_theories_user_id_name_key
        unique (user_id, title)
);

alter table user_theories
    owner to postgres;

grant delete, insert, references, select, trigger, truncate, update on user_theories to anon;

grant delete, insert, references, select, trigger, truncate, update on user_theories to authenticated;

grant delete, insert, references, select, trigger, truncate, update on user_theories to service_role;

