create function st_forcecollection(geometry) returns geometry
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

comment on function st_forcecollection(geometry) is 'args: geomA - Convert the geometry into a GEOMETRYCOLLECTION.';

alter function st_forcecollection(geometry) owner to supabase_admin;

grant execute on function st_forcecollection(geometry) to postgres;

grant execute on function st_forcecollection(geometry) to anon;

grant execute on function st_forcecollection(geometry) to authenticated;

grant execute on function st_forcecollection(geometry) to service_role;

