create function st_isclosed(geometry) returns boolean
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

comment on function st_isclosed(geometry) is 'args: g - Tests if a LineStringss start and end points are coincident. For a PolyhedralSurface tests if it is closed (volumetric).';

alter function st_isclosed(geometry) owner to supabase_admin;

grant execute on function st_isclosed(geometry) to postgres;

grant execute on function st_isclosed(geometry) to anon;

grant execute on function st_isclosed(geometry) to authenticated;

grant execute on function st_isclosed(geometry) to service_role;

