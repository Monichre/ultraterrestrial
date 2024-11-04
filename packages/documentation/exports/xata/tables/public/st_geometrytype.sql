create function st_geometrytype(geometry) returns text
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

comment on function st_geometrytype(geometry) is 'args: g1 - Returns the SQL-MM type of a geometry as text.';

alter function st_geometrytype(geometry) owner to supabase_admin;

grant execute on function st_geometrytype(geometry) to postgres;

grant execute on function st_geometrytype(geometry) to anon;

grant execute on function st_geometrytype(geometry) to authenticated;

grant execute on function st_geometrytype(geometry) to service_role;

