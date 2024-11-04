create function st_filterbym(geometry, double precision, double precision default NULL::double precision, boolean default false) returns geometry
    immutable
    parallel safe
    cost 50
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function st_filterbym(geometry, double precision, double precision, boolean) is 'args: geom, min, max = null, returnM = false - Removes vertices based on their M value';

alter function st_filterbym(geometry, double precision, double precision, boolean) owner to supabase_admin;

grant execute on function st_filterbym(geometry, double precision, double precision, boolean) to postgres;

grant execute on function st_filterbym(geometry, double precision, double precision, boolean) to anon;

grant execute on function st_filterbym(geometry, double precision, double precision, boolean) to authenticated;

grant execute on function st_filterbym(geometry, double precision, double precision, boolean) to service_role;

