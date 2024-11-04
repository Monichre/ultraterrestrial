create function st_clipbybox2d(geom geometry, box box2d) returns geometry
    immutable
    strict
    parallel safe
    cost 500
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function st_clipbybox2d(geometry, box2d) is 'args: geom, box - Computes the portion of a geometry falling within a rectangle.';

alter function st_clipbybox2d(geometry, box2d) owner to supabase_admin;

grant execute on function st_clipbybox2d(geometry, box2d) to postgres;

grant execute on function st_clipbybox2d(geometry, box2d) to anon;

grant execute on function st_clipbybox2d(geometry, box2d) to authenticated;

grant execute on function st_clipbybox2d(geometry, box2d) to service_role;

