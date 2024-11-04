create function st_forcepolygoncw(geometry) returns geometry
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

comment on function st_forcepolygoncw(geometry) is 'args: geom - Orients all exterior rings clockwise and all interior rings counter-clockwise.';

alter function st_forcepolygoncw(geometry) owner to supabase_admin;

grant execute on function st_forcepolygoncw(geometry) to postgres;

grant execute on function st_forcepolygoncw(geometry) to anon;

grant execute on function st_forcepolygoncw(geometry) to authenticated;

grant execute on function st_forcepolygoncw(geometry) to service_role;

