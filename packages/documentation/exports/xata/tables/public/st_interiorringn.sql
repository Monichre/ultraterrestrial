create function st_interiorringn(geometry, integer) returns geometry
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

comment on function st_interiorringn(geometry, integer) is 'args: a_polygon, n - Returns the Nth interior ring (hole) of a Polygon.';

alter function st_interiorringn(geometry, integer) owner to supabase_admin;

grant execute on function st_interiorringn(geometry, integer) to postgres;

grant execute on function st_interiorringn(geometry, integer) to anon;

grant execute on function st_interiorringn(geometry, integer) to authenticated;

grant execute on function st_interiorringn(geometry, integer) to service_role;

