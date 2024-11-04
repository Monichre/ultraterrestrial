create function overlaps_geog(gidx, geography) returns boolean
    immutable
    strict
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function overlaps_geog(gidx, geography) owner to supabase_admin;

grant execute on function overlaps_geog(gidx, geography) to postgres;

grant execute on function overlaps_geog(gidx, geography) to anon;

grant execute on function overlaps_geog(gidx, geography) to authenticated;

grant execute on function overlaps_geog(gidx, geography) to service_role;

create function overlaps_geog(gidx, gidx) returns boolean
    immutable
    strict
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function overlaps_geog(gidx, gidx) owner to supabase_admin;

grant execute on function overlaps_geog(gidx, gidx) to postgres;

grant execute on function overlaps_geog(gidx, gidx) to anon;

grant execute on function overlaps_geog(gidx, gidx) to authenticated;

grant execute on function overlaps_geog(gidx, gidx) to service_role;

create function overlaps_geog(geography, gidx) returns boolean
    immutable
    strict
    language sql
as
$$SELECT $2 OPERATOR(public.&&) $1;$$;

alter function overlaps_geog(geography, gidx) owner to supabase_admin;

grant execute on function overlaps_geog(geography, gidx) to postgres;

grant execute on function overlaps_geog(geography, gidx) to anon;

grant execute on function overlaps_geog(geography, gidx) to authenticated;

grant execute on function overlaps_geog(geography, gidx) to service_role;

