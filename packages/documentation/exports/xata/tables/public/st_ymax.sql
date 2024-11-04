create function st_ymax(box3d) returns double precision
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

comment on function st_ymax(box3d) is 'args: aGeomorBox2DorBox3D - Returns the Y maxima of a 2D or 3D bounding box or a geometry.';

alter function st_ymax(box3d) owner to supabase_admin;

grant execute on function st_ymax(box3d) to postgres;

grant execute on function st_ymax(box3d) to anon;

grant execute on function st_ymax(box3d) to authenticated;

grant execute on function st_ymax(box3d) to service_role;

