create function st_asmvtgeom(geom geometry, bounds box2d, extent integer default 4096, buffer integer default 256, clip_geom boolean default true) returns geometry
    immutable
    parallel safe
    cost 500
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function st_asmvtgeom(geometry, box2d, integer, integer, boolean) owner to supabase_admin;

grant execute on function st_asmvtgeom(geometry, box2d, integer, integer, boolean) to postgres;

grant execute on function st_asmvtgeom(geometry, box2d, integer, integer, boolean) to anon;

grant execute on function st_asmvtgeom(geometry, box2d, integer, integer, boolean) to authenticated;

grant execute on function st_asmvtgeom(geometry, box2d, integer, integer, boolean) to service_role;

