create table user_saved_documents
(
    id          serial
        primary key,
    user_id     integer
        references users
            on delete cascade,
    document_id integer
        references documents
            on delete set null,
    note        text,
    note_title  text
);

alter table user_saved_documents
    owner to postgres;

grant delete, insert, references, select, trigger, truncate, update on user_saved_documents to anon;

grant delete, insert, references, select, trigger, truncate, update on user_saved_documents to authenticated;

grant delete, insert, references, select, trigger, truncate, update on user_saved_documents to service_role;

