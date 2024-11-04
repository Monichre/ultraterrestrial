create function st_maximuminscribedcircle(geometry, out center geometry, out nearest geometry, out radius double precision) returns record
    immutable
    strict
    parallel safe
    cost 10000
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function st_maximuminscribedcircle(geometry, out geometry, out geometry, out double precision) is 'args: geom - Computes the largest circle contained within a geometry.';

alter function st_maximuminscribedcircle(geometry, out geometry, out geometry, out double precision) owner to supabase_admin;

grant execute on function st_maximuminscribedcircle(geometry, out geometry, out geometry, out double precision) to postgres;

grant execute on function st_maximuminscribedcircle(geometry, out geometry, out geometry, out double precision) to anon;

grant execute on function st_maximuminscribedcircle(geometry, out geometry, out geometry, out double precision) to authenticated;

grant execute on function st_maximuminscribedcircle(geometry, out geometry, out geometry, out double precision) to service_role;

