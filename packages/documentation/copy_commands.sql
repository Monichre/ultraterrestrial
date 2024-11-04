-- \copy "theories" TO './theories.csv' WITH (FORMAT csv, HEADER true);
-- \copy "user_saved_testimonies" TO './user_saved_testimonies.csv' WITH (FORMAT csv, HEADER true);
-- \copy "documents" TO './documents.csv' WITH (FORMAT csv, HEADER true);
-- \copy "user_saved_documents" TO './user_saved_documents.csv' WITH (FORMAT csv, HEADER true);

-- \copy "user_saved_organizations" TO './user_saved_organizations.csv' WITH (FORMAT csv, HEADER true);
-- \copy "event_subject_matter_experts" TO './event_subject_matter_experts.csv' WITH (FORMAT csv, HEADER true);
-- \copy "organization_members" TO './organization_members.csv' WITH (FORMAT csv, HEADER true);
-- \copy "testimonies" TO './testimonies.csv' WITH (FORMAT csv, HEADER true);
-- \copy "event_topic_subject_matter_experts" TO './event_topic_subject_matter_experts.csv' WITH (FORMAT csv, HEADER true);
-- \copy "mindmaps" TO './mindmaps.csv' WITH (FORMAT csv, HEADER true);
-- \copy "users" TO './users.csv' WITH (FORMAT csv, HEADER true);
-- \copy "artifacts" TO './artifacts.csv' WITH (FORMAT csv, HEADER true);
-- \copy "user_theories" TO './user_theories.csv' WITH (FORMAT csv, HEADER true);
-- \copy "spatial_ref_sys" TO './spatial_ref_sys.csv' WITH (FORMAT csv, HEADER true);
-- \copy "user_saved_events" TO './user_saved_events.csv' WITH (FORMAT csv, HEADER true);
-- \copy "user_saved_topics" TO './user_saved_topics.csv' WITH (FORMAT csv, HEADER true);
-- \copy "testimonies_xata" TO './testimonies_xata.csv' WITH (FORMAT csv, HEADER true);
-- \copy "key_figures" TO './key_figures.csv' WITH (FORMAT csv, HEADER true);
-- \copy "organizations" TO './organizations.csv' WITH (FORMAT csv, HEADER true);
-- \copy "events" TO './events.csv' WITH (FORMAT csv, HEADER true);
-- \copy "sightings" TO './sightings.csv' WITH (FORMAT csv, HEADER true);
-- \copy "xata_to_postgres_mapping" TO './xata_to_postgres_mapping.csv' WITH (FORMAT csv, HEADER true);
-- \copy "topics" TO './topics.csv' WITH (FORMAT csv, HEADER true);
-- \copy "topic_subject_matter_experts" TO './topic_subject_matter_experts.csv' WITH (FORMAT csv, HEADER true);
-- \copy "topics_testimonies" TO './topics_testimonies.csv' WITH (FORMAT csv, HEADER true);






BEGIN;
\copy "theories" FROM '/Users/liamellis/Desktop/ultraterrestrial/packages/documentation/exports/supabase/csv/theories.csv' WITH (FORMAT csv, HEADER true);
\copy "user_saved_testimonies" FROM '/Users/liamellis/Desktop/ultraterrestrial/packages/documentation/exports/supabase/csv/user_saved_testimonies.csv' WITH (FORMAT csv, HEADER true);
\copy "documents" FROM '/Users/liamellis/Desktop/ultraterrestrial/packages/documentation/exports/supabase/csv/documents.csv' WITH (FORMAT csv, HEADER true);
\copy "user_saved_documents" FROM '/Users/liamellis/Desktop/ultraterrestrial/packages/documentation/exports/supabase/csv/user_saved_documents.csv' WITH (FORMAT csv, HEADER true);
\copy "user_saved_organizations" FROM '/Users/liamellis/Desktop/ultraterrestrial/packages/documentation/exports/supabase/csv/user_saved_organizations.csv' WITH (FORMAT csv, HEADER true);


\copy "event_subject_matter_experts" FROM '/Users/liamellis/Desktop/ultraterrestrial/packages/documentation/exports/supabase/csv/event_subject_matter_experts_rows.csv' WITH (FORMAT csv, HEADER true);
\copy "organization_members" FROM '/Users/liamellis/Desktop/ultraterrestrial/packages/documentation/exports/supabase/csv/organization_members.csv' WITH (FORMAT csv, HEADER true);
\copy "testimonies" FROM '/Users/liamellis/Desktop/ultraterrestrial/packages/documentation/exports/supabase/csv/testimonies.csv' WITH (FORMAT csv, HEADER true);
\copy "event_topic_subject_matter_experts" FROM '/Users/liamellis/Desktop/ultraterrestrial/packages/documentation/exports/supabase/csv/event_topic_subject_matter_experts.csv' WITH (FORMAT csv, HEADER true);
\copy "mindmaps" FROM '/Users/liamellis/Desktop/ultraterrestrial/packages/documentation/exports/supabase/csv/mindmaps.csv' WITH (FORMAT csv, HEADER true);
\copy "users" FROM '/Users/liamellis/Desktop/ultraterrestrial/packages/documentation/exports/supabase/csv/users.csv' WITH (FORMAT csv, HEADER true);
\copy "artifacts" FROM '/Users/liamellis/Desktop/ultraterrestrial/packages/documentation/exports/supabase/csv/artifacts.csv' WITH (FORMAT csv, HEADER true);
\copy "user_theories" FROM '/Users/liamellis/Desktop/ultraterrestrial/packages/documentation/exports/supabase/csv/user_theories.csv' WITH (FORMAT csv, HEADER true);
\copy "user_saved_events" FROM '/Users/liamellis/Desktop/ultraterrestrial/packages/documentation/exports/supabase/csv/user_saved_events.csv' WITH (FORMAT csv, HEADER true);
\copy "user_saved_topics" FROM '/Users/liamellis/Desktop/ultraterrestrial/packages/documentation/exports/supabase/csv/user_saved_topics.csv' WITH (FORMAT csv, HEADER true);
\copy "testimonies_xata" FROM '/Users/liamellis/Desktop/ultraterrestrial/packages/documentation/exports/supabase/csv/testimonies_xata.csv' WITH (FORMAT csv, HEADER true);
\copy "key_figures" FROM '/Users/liamellis/Desktop/ultraterrestrial/packages/documentation/exports/supabase/csv/key_figures.csv' WITH (FORMAT csv, HEADER true);
\copy "organizations" FROM '/Users/liamellis/Desktop/ultraterrestrial/packages/documentation/exports/supabase/csv/organizations.csv' WITH (FORMAT csv, HEADER true);
\copy "events" FROM '/Users/liamellis/Desktop/ultraterrestrial/packages/documentation/exports/supabase/csv/events.csv' WITH (FORMAT csv, HEADER true);
\copy "sightings" FROM '/Users/liamellis/Desktop/ultraterrestrial/packages/documentation/exports/supabase/csv/sightings.csv' WITH (FORMAT csv, HE ADER true);
\copy "xata_to_postgres_mapping" FROM '/Users/liamellis/Desktop/ultraterrestrial/packages/documentation/exports/supabase/csv/xata_to_postgres_mapping.csv' WITH (FORMAT csv, HEADER true);
\copy "topics" FROM '/Users/liamellis/Desktop/ultraterrestrial/packages/documentation/exports/supabase/csv/topics.csv' WITH (FORMAT csv, HEADER true);
\copy "topic_subject_matter_experts" FROM '/Users/liamellis/Desktop/ultraterrestrial/packages/documentation/exports/supabase/csv/topic_subject_matter_experts_rows.csv' WITH (FORMAT csv, HEADER true);

\copy "topics_testimonies" FROM '/Users/liamellis/Desktop/ultraterrestrial/packages/documentation/exports/supabase/csv/topics_testimonies.csv' WITH (FORMAT csv, HEADER true);
COMMIT;
packages/documentation/exports/supabase/csv/event_subject_matter_experts_rows.csv