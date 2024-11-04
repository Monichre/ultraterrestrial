create function st_multi(geometry) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function st_multi(geometry) is 'args: geom - Return the geometry as a MULTI* geometry.';

alter function st_multi(geometry) owner to supabase_admin;

grant execute on function st_multi(geometry) to postgres;

grant execute on function st_multi(geometry) to anon;

grant execute on function st_multi(geometry) to authenticated;

grant execute on function st_multi(geometry) to service_role;

