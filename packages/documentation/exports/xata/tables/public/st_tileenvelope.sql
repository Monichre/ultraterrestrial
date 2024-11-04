create function st_tileenvelope(zoom integer, x integer, y integer, bounds geometry default '0102000020110F00000200000093107C45F81B73C193107C45F81B73C193107C45F81B734193107C45F81B7341'::geometry, margin double precision default 0.0) returns geometry
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

comment on function st_tileenvelope(integer, integer, integer, geometry, double precision) is 'args: tileZoom, tileX, tileY, bounds=SRID=3857;LINESTRING(-20037508.342789 -20037508.342789,20037508.342789 20037508.342789), margin=0.0 - Creates a rectangular Polygon in Web Mercator (SRID:3857) using the XYZ tile system.';

alter function st_tileenvelope(integer, integer, integer, geometry, double precision) owner to supabase_admin;

grant execute on function st_tileenvelope(integer, integer, integer, geometry, double precision) to postgres;

grant execute on function st_tileenvelope(integer, integer, integer, geometry, double precision) to anon;

grant execute on function st_tileenvelope(integer, integer, integer, geometry, double precision) to authenticated;

grant execute on function st_tileenvelope(integer, integer, integer, geometry, double precision) to service_role;

