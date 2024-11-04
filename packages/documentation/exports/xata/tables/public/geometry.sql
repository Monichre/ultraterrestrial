-- Unknown how to generate base type type

comment on type geometry is 'postgis type: The type representing spatial features with planar coordinate systems.';

alter type geometry owner to supabase_admin;

create function geometry(geometry, integer, boolean) returns geometry
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

alter function geometry(geometry, integer, boolean) owner to supabase_admin;

grant execute on function geometry(geometry, integer, boolean) to postgres;

grant execute on function geometry(geometry, integer, boolean) to anon;

grant execute on function geometry(geometry, integer, boolean) to authenticated;

grant execute on function geometry(geometry, integer, boolean) to service_role;

create function geometry(point) returns geometry
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

alter function geometry(point) owner to supabase_admin;

grant execute on function geometry(point) to postgres;

grant execute on function geometry(point) to anon;

grant execute on function geometry(point) to authenticated;

grant execute on function geometry(point) to service_role;

create function geometry(path) returns geometry
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

alter function geometry(path) owner to supabase_admin;

grant execute on function geometry(path) to postgres;

grant execute on function geometry(path) to anon;

grant execute on function geometry(path) to authenticated;

grant execute on function geometry(path) to service_role;

create function geometry(polygon) returns geometry
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

alter function geometry(polygon) owner to supabase_admin;

grant execute on function geometry(polygon) to postgres;

grant execute on function geometry(polygon) to anon;

grant execute on function geometry(polygon) to authenticated;

grant execute on function geometry(polygon) to service_role;

create function geometry(box2d) returns geometry
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

alter function geometry(box2d) owner to supabase_admin;

grant execute on function geometry(box2d) to postgres;

grant execute on function geometry(box2d) to anon;

grant execute on function geometry(box2d) to authenticated;

grant execute on function geometry(box2d) to service_role;

create function geometry(box3d) returns geometry
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

alter function geometry(box3d) owner to supabase_admin;

grant execute on function geometry(box3d) to postgres;

grant execute on function geometry(box3d) to anon;

grant execute on function geometry(box3d) to authenticated;

grant execute on function geometry(box3d) to service_role;

create function geometry(text) returns geometry
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

alter function geometry(text) owner to supabase_admin;

grant execute on function geometry(text) to postgres;

grant execute on function geometry(text) to anon;

grant execute on function geometry(text) to authenticated;

grant execute on function geometry(text) to service_role;

create function geometry(bytea) returns geometry
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

alter function geometry(bytea) owner to supabase_admin;

grant execute on function geometry(bytea) to postgres;

grant execute on function geometry(bytea) to anon;

grant execute on function geometry(bytea) to authenticated;

grant execute on function geometry(bytea) to service_role;

create function geometry(geography) returns geometry
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

alter function geometry(geography) owner to supabase_admin;

grant execute on function geometry(geography) to postgres;

grant execute on function geometry(geography) to anon;

grant execute on function geometry(geography) to authenticated;

grant execute on function geometry(geography) to service_role;

