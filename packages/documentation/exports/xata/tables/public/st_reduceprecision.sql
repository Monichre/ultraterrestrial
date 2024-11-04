create function st_reduceprecision(geom geometry, gridsize double precision) returns geometry
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

comment on function st_reduceprecision(geometry, double precision) is 'args: g, gridsize - Returns a valid geometry with points rounded to a grid tolerance.';

alter function st_reduceprecision(geometry, double precision) owner to supabase_admin;

grant execute on function st_reduceprecision(geometry, double precision) to postgres;

grant execute on function st_reduceprecision(geometry, double precision) to anon;

grant execute on function st_reduceprecision(geometry, double precision) to authenticated;

grant execute on function st_reduceprecision(geometry, double precision) to service_role;

