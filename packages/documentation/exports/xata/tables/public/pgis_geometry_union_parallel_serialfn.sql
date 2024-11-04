create function pgis_geometry_union_parallel_serialfn(internal) returns bytea
    immutable
    strict
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function pgis_geometry_union_parallel_serialfn(internal) owner to supabase_admin;

grant execute on function pgis_geometry_union_parallel_serialfn(internal) to postgres;

grant execute on function pgis_geometry_union_parallel_serialfn(internal) to anon;

grant execute on function pgis_geometry_union_parallel_serialfn(internal) to authenticated;

grant execute on function pgis_geometry_union_parallel_serialfn(internal) to service_role;

