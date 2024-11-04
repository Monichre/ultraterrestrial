create function overlaps_nd(gidx, geometry) returns boolean
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

alter function overlaps_nd(gidx, geometry) owner to supabase_admin;

grant execute on function overlaps_nd(gidx, geometry) to postgres;

grant execute on function overlaps_nd(gidx, geometry) to anon;

grant execute on function overlaps_nd(gidx, geometry) to authenticated;

grant execute on function overlaps_nd(gidx, geometry) to service_role;

create function overlaps_nd(gidx, gidx) returns boolean
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

alter function overlaps_nd(gidx, gidx) owner to supabase_admin;

grant execute on function overlaps_nd(gidx, gidx) to postgres;

grant execute on function overlaps_nd(gidx, gidx) to anon;

grant execute on function overlaps_nd(gidx, gidx) to authenticated;

grant execute on function overlaps_nd(gidx, gidx) to service_role;

create function overlaps_nd(geometry, gidx) returns boolean
    immutable
    strict
    parallel safe
    cost 1
    language sql
as
$$SELECT $2 OPERATOR(public.&&&) $1;$$;

alter function overlaps_nd(geometry, gidx) owner to supabase_admin;

grant execute on function overlaps_nd(geometry, gidx) to postgres;

grant execute on function overlaps_nd(geometry, gidx) to anon;

grant execute on function overlaps_nd(geometry, gidx) to authenticated;

grant execute on function overlaps_nd(geometry, gidx) to service_role;

