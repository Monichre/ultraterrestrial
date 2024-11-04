create function st_makevalid(geometry) returns geometry
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

comment on function st_makevalid(geometry) is 'args: input - Attempts to make an invalid geometry valid without losing vertices.';

alter function st_makevalid(geometry) owner to supabase_admin;

grant execute on function st_makevalid(geometry) to postgres;

grant execute on function st_makevalid(geometry) to anon;

grant execute on function st_makevalid(geometry) to authenticated;

grant execute on function st_makevalid(geometry) to service_role;

create function st_makevalid(geom geometry, params text) returns geometry
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

comment on function st_makevalid(geometry, text) is 'args: input, params - Attempts to make an invalid geometry valid without losing vertices.';

alter function st_makevalid(geometry, text) owner to supabase_admin;

grant execute on function st_makevalid(geometry, text) to postgres;

grant execute on function st_makevalid(geometry, text) to anon;

grant execute on function st_makevalid(geometry, text) to authenticated;

grant execute on function st_makevalid(geometry, text) to service_role;

