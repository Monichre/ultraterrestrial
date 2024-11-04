create table event_topic_subject_matter_experts
(
    id                       serial
        primary key,
    xata_id                  varchar
        unique,
    event_id                 integer
        references events,
    topic_id                 integer
        references topics,
    subject_matter_expert_id integer
        constraint event_topic_subject_matter_expert_subject_matter_expert_id_fkey
            references key_figures,
    created_at               timestamp,
    updated_at               timestamp,
    version                  integer
);

alter table event_topic_subject_matter_experts
    owner to postgres;

grant delete, insert, references, select, trigger, truncate, update on event_topic_subject_matter_experts to anon;

grant delete, insert, references, select, trigger, truncate, update on event_topic_subject_matter_experts to authenticated;

grant delete, insert, references, select, trigger, truncate, update on event_topic_subject_matter_experts to service_role;

