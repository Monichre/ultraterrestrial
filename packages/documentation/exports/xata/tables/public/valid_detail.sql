create type valid_detail as
(
    valid    boolean,
    reason   varchar,
    location geometry
);

alter type valid_detail owner to supabase_admin;

