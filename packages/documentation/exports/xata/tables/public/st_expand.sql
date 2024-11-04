create function st_expand(box2d, double precision) returns box2d
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

comment on function st_expand(box2d, double precision) is 'args: box, units_to_expand - Returns a bounding box expanded from another bounding box or a geometry.';

alter function st_expand(box2d, double precision) owner to supabase_admin;

grant execute on function st_expand(box2d, double precision) to postgres;

grant execute on function st_expand(box2d, double precision) to anon;

grant execute on function st_expand(box2d, double precision) to authenticated;

grant execute on function st_expand(box2d, double precision) to service_role;

create function st_expand(box box2d, dx double precision, dy double precision) returns box2d
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

comment on function st_expand(box2d, double precision, double precision) is 'args: box, dx, dy - Returns a bounding box expanded from another bounding box or a geometry.';

alter function st_expand(box2d, double precision, double precision) owner to supabase_admin;

grant execute on function st_expand(box2d, double precision, double precision) to postgres;

grant execute on function st_expand(box2d, double precision, double precision) to anon;

grant execute on function st_expand(box2d, double precision, double precision) to authenticated;

grant execute on function st_expand(box2d, double precision, double precision) to service_role;

create function st_expand(box3d, double precision) returns box3d
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

comment on function st_expand(box3d, double precision) is 'args: box, units_to_expand - Returns a bounding box expanded from another bounding box or a geometry.';

alter function st_expand(box3d, double precision) owner to supabase_admin;

grant execute on function st_expand(box3d, double precision) to postgres;

grant execute on function st_expand(box3d, double precision) to anon;

grant execute on function st_expand(box3d, double precision) to authenticated;

grant execute on function st_expand(box3d, double precision) to service_role;

create function st_expand(box box3d, dx double precision, dy double precision, dz double precision default 0) returns box3d
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

comment on function st_expand(box3d, double precision, double precision, double precision) is 'args: box, dx, dy, dz=0 - Returns a bounding box expanded from another bounding box or a geometry.';

alter function st_expand(box3d, double precision, double precision, double precision) owner to supabase_admin;

grant execute on function st_expand(box3d, double precision, double precision, double precision) to postgres;

grant execute on function st_expand(box3d, double precision, double precision, double precision) to anon;

grant execute on function st_expand(box3d, double precision, double precision, double precision) to authenticated;

grant execute on function st_expand(box3d, double precision, double precision, double precision) to service_role;

create function st_expand(geometry, double precision) returns geometry
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

comment on function st_expand(geometry, double precision) is 'args: geom, units_to_expand - Returns a bounding box expanded from another bounding box or a geometry.';

alter function st_expand(geometry, double precision) owner to supabase_admin;

grant execute on function st_expand(geometry, double precision) to postgres;

grant execute on function st_expand(geometry, double precision) to anon;

grant execute on function st_expand(geometry, double precision) to authenticated;

grant execute on function st_expand(geometry, double precision) to service_role;

create function st_expand(geom geometry, dx double precision, dy double precision, dz double precision default 0, dm double precision default 0) returns geometry
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

comment on function st_expand(geometry, double precision, double precision, double precision, double precision) is 'args: geom, dx, dy, dz=0, dm=0 - Returns a bounding box expanded from another bounding box or a geometry.';

alter function st_expand(geometry, double precision, double precision, double precision, double precision) owner to supabase_admin;

grant execute on function st_expand(geometry, double precision, double precision, double precision, double precision) to postgres;

grant execute on function st_expand(geometry, double precision, double precision, double precision, double precision) to anon;

grant execute on function st_expand(geometry, double precision, double precision, double precision, double precision) to authenticated;

grant execute on function st_expand(geometry, double precision, double precision, double precision, double precision) to service_role;

