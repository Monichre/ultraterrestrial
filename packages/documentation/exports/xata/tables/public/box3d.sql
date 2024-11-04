-- Unknown how to generate base type type

comment on type box3d is 'postgis type: The type representing a 3-dimensional bounding box.';

alter type box3d owner to supabase_admin;

create function box3d(geometry) returns box3d
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

comment on function box3d(geometry) is 'args: geom - Returns a BOX3D representing the 3D extent of a geometry.';

alter function box3d(geometry) owner to supabase_admin;

grant execute on function box3d(geometry) to postgres;

grant execute on function box3d(geometry) to anon;

grant execute on function box3d(geometry) to authenticated;

grant execute on function box3d(geometry) to service_role;

create function box3d(box2d) returns box3d
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

alter function box3d(box2d) owner to supabase_admin;

grant execute on function box3d(box2d) to postgres;

grant execute on function box3d(box2d) to anon;

grant execute on function box3d(box2d) to authenticated;

grant execute on function box3d(box2d) to service_role;

