create function st_angle(pt1 geometry, pt2 geometry, pt3 geometry, pt4 geometry default '0101000000000000000000F87F000000000000F87F'::geometry) returns double precision
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

comment on function st_angle(geometry, geometry, geometry, geometry) is 'args: point1, point2, point3, point4 - Returns the angle between two vectors defined by 3 or 4 points, or 2 lines.';

alter function st_angle(geometry, geometry, geometry, geometry) owner to supabase_admin;

grant execute on function st_angle(geometry, geometry, geometry, geometry) to postgres;

grant execute on function st_angle(geometry, geometry, geometry, geometry) to anon;

grant execute on function st_angle(geometry, geometry, geometry, geometry) to authenticated;

grant execute on function st_angle(geometry, geometry, geometry, geometry) to service_role;

create function st_angle(line1 geometry, line2 geometry) returns double precision
    immutable
    strict
    parallel safe
    cost 50
    language sql
as
$$SELECT ST_Angle(St_StartPoint($1), ST_EndPoint($1), St_StartPoint($2), ST_EndPoint($2))$$;

comment on function st_angle(geometry, geometry) is 'args: line1, line2 - Returns the angle between two vectors defined by 3 or 4 points, or 2 lines.';

alter function st_angle(geometry, geometry) owner to supabase_admin;

grant execute on function st_angle(geometry, geometry) to postgres;

grant execute on function st_angle(geometry, geometry) to anon;

grant execute on function st_angle(geometry, geometry) to authenticated;

grant execute on function st_angle(geometry, geometry) to service_role;

