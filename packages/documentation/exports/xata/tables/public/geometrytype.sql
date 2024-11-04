create function geometrytype(geometry) returns text
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

comment on function geometrytype(geometry) is 'args: geomA - Returns the type of a geometry as text.';

alter function geometrytype(geometry) owner to supabase_admin;

grant execute on function geometrytype(geometry) to postgres;

grant execute on function geometrytype(geometry) to anon;

grant execute on function geometrytype(geometry) to authenticated;

grant execute on function geometrytype(geometry) to service_role;

create function geometrytype(geography) returns text
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

alter function geometrytype(geography) owner to supabase_admin;

grant execute on function geometrytype(geography) to postgres;

grant execute on function geometrytype(geography) to anon;

grant execute on function geometrytype(geography) to authenticated;

grant execute on function geometrytype(geography) to service_role;

