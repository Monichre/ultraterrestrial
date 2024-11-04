-- Unknown how to generate base type type

comment on type box2d is 'postgis type: The type representing a 2-dimensional bounding box.';

alter type box2d owner to supabase_admin;

create function box2d(geometry) returns box2d
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

comment on function box2d(geometry) is 'args: geom - Returns a BOX2D representing the 2D extent of a geometry.';

alter function box2d(geometry) owner to supabase_admin;

grant execute on function box2d(geometry) to postgres;

grant execute on function box2d(geometry) to anon;

grant execute on function box2d(geometry) to authenticated;

grant execute on function box2d(geometry) to service_role;

create function box2d(box3d) returns box2d
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

alter function box2d(box3d) owner to supabase_admin;

grant execute on function box2d(box3d) to postgres;

grant execute on function box2d(box3d) to anon;

grant execute on function box2d(box3d) to authenticated;

grant execute on function box2d(box3d) to service_role;

