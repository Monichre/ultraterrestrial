create function st_3dperimeter(geometry) returns double precision
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

comment on function st_3dperimeter(geometry) is 'args: geomA - Returns the 3D perimeter of a polygonal geometry.';

alter function st_3dperimeter(geometry) owner to supabase_admin;

grant execute on function st_3dperimeter(geometry) to postgres;

grant execute on function st_3dperimeter(geometry) to anon;

grant execute on function st_3dperimeter(geometry) to authenticated;

grant execute on function st_3dperimeter(geometry) to service_role;

