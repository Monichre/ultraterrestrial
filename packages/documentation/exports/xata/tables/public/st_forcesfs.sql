create function st_forcesfs(geometry) returns geometry
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

comment on function st_forcesfs(geometry) is 'args: geomA - Force the geometries to use SFS 1.1 geometry types only.';

alter function st_forcesfs(geometry) owner to supabase_admin;

grant execute on function st_forcesfs(geometry) to postgres;

grant execute on function st_forcesfs(geometry) to anon;

grant execute on function st_forcesfs(geometry) to authenticated;

grant execute on function st_forcesfs(geometry) to service_role;

create function st_forcesfs(geometry, version text) returns geometry
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

comment on function st_forcesfs(geometry, text) is 'args: geomA, version - Force the geometries to use SFS 1.1 geometry types only.';

alter function st_forcesfs(geometry, text) owner to supabase_admin;

grant execute on function st_forcesfs(geometry, text) to postgres;

grant execute on function st_forcesfs(geometry, text) to anon;

grant execute on function st_forcesfs(geometry, text) to authenticated;

grant execute on function st_forcesfs(geometry, text) to service_role;

