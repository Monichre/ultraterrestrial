create table users
(
    id                serial
        primary key,
    email             text not null
        unique,
    name              text not null,
    photo             text,
    profile_image_url text,
    external_id       text
);

alter table users
    owner to postgres;

grant delete, insert, references, select, trigger, truncate, update on users to anon;

grant delete, insert, references, select, trigger, truncate, update on users to authenticated;

grant delete, insert, references, select, trigger, truncate, update on users to service_role;

