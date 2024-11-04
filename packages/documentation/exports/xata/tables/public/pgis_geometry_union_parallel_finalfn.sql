create function pgis_geometry_union_parallel_finalfn(internal) returns geometry
    immutable
    strict
    parallel safe
    cost 10000
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function pgis_geometry_union_parallel_finalfn(internal) owner to supabase_admin;

grant execute on function pgis_geometry_union_parallel_finalfn(internal) to postgres;

grant execute on function pgis_geometry_union_parallel_finalfn(internal) to anon;

grant execute on function pgis_geometry_union_parallel_finalfn(internal) to authenticated;

grant execute on function pgis_geometry_union_parallel_finalfn(internal) to service_role;

