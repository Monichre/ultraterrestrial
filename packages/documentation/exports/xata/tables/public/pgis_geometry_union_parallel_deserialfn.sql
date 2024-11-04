create function pgis_geometry_union_parallel_deserialfn(bytea, internal) returns internal
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

alter function pgis_geometry_union_parallel_deserialfn(bytea, internal) owner to supabase_admin;

grant execute on function pgis_geometry_union_parallel_deserialfn(bytea, internal) to postgres;

grant execute on function pgis_geometry_union_parallel_deserialfn(bytea, internal) to anon;

grant execute on function pgis_geometry_union_parallel_deserialfn(bytea, internal) to authenticated;

grant execute on function pgis_geometry_union_parallel_deserialfn(bytea, internal) to service_role;

