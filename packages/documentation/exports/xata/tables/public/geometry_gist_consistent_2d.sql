create function geometry_gist_consistent_2d(internal, geometry, integer) returns boolean
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function geometry_gist_consistent_2d(internal, geometry, integer) owner to supabase_admin;

grant execute on function geometry_gist_consistent_2d(internal, geometry, integer) to postgres;

grant execute on function geometry_gist_consistent_2d(internal, geometry, integer) to anon;

grant execute on function geometry_gist_consistent_2d(internal, geometry, integer) to authenticated;

grant execute on function geometry_gist_consistent_2d(internal, geometry, integer) to service_role;
