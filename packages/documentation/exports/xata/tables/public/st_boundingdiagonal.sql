create function st_boundingdiagonal(geom geometry, fits boolean default false) returns geometry
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

comment on function st_boundingdiagonal(geometry, boolean) is 'args: geom, fits=false - Returns the diagonal of a geometrys bounding box.';

alter function st_boundingdiagonal(geometry, boolean) owner to supabase_admin;

grant execute on function st_boundingdiagonal(geometry, boolean) to postgres;

grant execute on function st_boundingdiagonal(geometry, boolean) to anon;

grant execute on function st_boundingdiagonal(geometry, boolean) to authenticated;

grant execute on function st_boundingdiagonal(geometry, boolean) to service_role;

