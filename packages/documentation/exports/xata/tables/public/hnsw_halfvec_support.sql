create function hnsw_halfvec_support(internal) returns internal
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function hnsw_halfvec_support(internal) owner to supabase_admin;

grant execute on function hnsw_halfvec_support(internal) to postgres;

grant execute on function hnsw_halfvec_support(internal) to anon;

grant execute on function hnsw_halfvec_support(internal) to authenticated;

grant execute on function hnsw_halfvec_support(internal) to service_role;

