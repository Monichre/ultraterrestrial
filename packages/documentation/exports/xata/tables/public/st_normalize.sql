create function st_normalize(geom geometry) returns geometry
    immutable
    strict
    parallel safe
    cost 500
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function st_normalize(geometry) is 'args: geom - Return the geometry in its canonical form.';

alter function st_normalize(geometry) owner to supabase_admin;

grant execute on function st_normalize(geometry) to postgres;

grant execute on function st_normalize(geometry) to anon;

grant execute on function st_normalize(geometry) to authenticated;

grant execute on function st_normalize(geometry) to service_role;

