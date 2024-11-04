create function st_linemerge(geometry) returns geometry
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

comment on function st_linemerge(geometry) is 'args: amultilinestring - Return the lines formed by sewing together a MultiLineString.';

alter function st_linemerge(geometry) owner to supabase_admin;

grant execute on function st_linemerge(geometry) to postgres;

grant execute on function st_linemerge(geometry) to anon;

grant execute on function st_linemerge(geometry) to authenticated;

grant execute on function st_linemerge(geometry) to service_role;

create function st_linemerge(geometry, boolean) returns geometry
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

comment on function st_linemerge(geometry, boolean) is 'args: amultilinestring, directed - Return the lines formed by sewing together a MultiLineString.';

alter function st_linemerge(geometry, boolean) owner to supabase_admin;

grant execute on function st_linemerge(geometry, boolean) to postgres;

grant execute on function st_linemerge(geometry, boolean) to anon;

grant execute on function st_linemerge(geometry, boolean) to authenticated;

grant execute on function st_linemerge(geometry, boolean) to service_role;

