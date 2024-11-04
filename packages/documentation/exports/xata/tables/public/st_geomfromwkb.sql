create function st_geomfromwkb(bytea) returns geometry
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

alter function st_geomfromwkb(bytea) owner to supabase_admin;

grant execute on function st_geomfromwkb(bytea) to postgres;

grant execute on function st_geomfromwkb(bytea) to anon;

grant execute on function st_geomfromwkb(bytea) to authenticated;

grant execute on function st_geomfromwkb(bytea) to service_role;

create function st_geomfromwkb(bytea, integer) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language sql
as
$$SELECT public.ST_SetSRID(public.ST_GeomFromWKB($1), $2)$$;

alter function st_geomfromwkb(bytea, integer) owner to supabase_admin;

grant execute on function st_geomfromwkb(bytea, integer) to postgres;

grant execute on function st_geomfromwkb(bytea, integer) to anon;

grant execute on function st_geomfromwkb(bytea, integer) to authenticated;

grant execute on function st_geomfromwkb(bytea, integer) to service_role;

