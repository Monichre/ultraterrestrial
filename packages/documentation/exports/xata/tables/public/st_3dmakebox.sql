create function st_3dmakebox(geom1 geometry, geom2 geometry) returns box3d
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

comment on function st_3dmakebox(geometry, geometry) is 'args: point3DLowLeftBottom, point3DUpRightTop - Creates a BOX3D defined by two 3D point geometries.';

alter function st_3dmakebox(geometry, geometry) owner to supabase_admin;

grant execute on function st_3dmakebox(geometry, geometry) to postgres;

grant execute on function st_3dmakebox(geometry, geometry) to anon;

grant execute on function st_3dmakebox(geometry, geometry) to authenticated;

grant execute on function st_3dmakebox(geometry, geometry) to service_role;

