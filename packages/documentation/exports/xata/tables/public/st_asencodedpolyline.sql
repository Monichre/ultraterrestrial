create function st_asencodedpolyline(geom geometry, nprecision integer default 5) returns text
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

alter function st_asencodedpolyline(geometry, integer) owner to supabase_admin;

grant execute on function st_asencodedpolyline(geometry, integer) to postgres;

grant execute on function st_asencodedpolyline(geometry, integer) to anon;

grant execute on function st_asencodedpolyline(geometry, integer) to authenticated;

grant execute on function st_asencodedpolyline(geometry, integer) to service_role;

