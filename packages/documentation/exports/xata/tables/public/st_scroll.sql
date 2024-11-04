create function st_scroll(geometry, geometry) returns geometry
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

comment on function st_scroll(geometry, geometry) is 'args: linestring, point - Change start point of a closed LineString.';

alter function st_scroll(geometry, geometry) owner to supabase_admin;

grant execute on function st_scroll(geometry, geometry) to postgres;

grant execute on function st_scroll(geometry, geometry) to anon;

grant execute on function st_scroll(geometry, geometry) to authenticated;

grant execute on function st_scroll(geometry, geometry) to service_role;

