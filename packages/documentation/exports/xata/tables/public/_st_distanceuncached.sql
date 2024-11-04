create function _st_distanceuncached(geography, geography, double precision, boolean) returns double precision
    immutable
    strict
    cost 10000
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function _st_distanceuncached(geography, geography, double precision, boolean) owner to supabase_admin;

grant execute on function _st_distanceuncached(geography, geography, double precision, boolean) to postgres;

grant execute on function _st_distanceuncached(geography, geography, double precision, boolean) to anon;

grant execute on function _st_distanceuncached(geography, geography, double precision, boolean) to authenticated;

grant execute on function _st_distanceuncached(geography, geography, double precision, boolean) to service_role;

create function _st_distanceuncached(geography, geography, boolean) returns double precision
    immutable
    strict
    language sql
as
$$SELECT public._ST_DistanceUnCached($1, $2, 0.0, $3)$$;

alter function _st_distanceuncached(geography, geography, boolean) owner to supabase_admin;

grant execute on function _st_distanceuncached(geography, geography, boolean) to postgres;

grant execute on function _st_distanceuncached(geography, geography, boolean) to anon;

grant execute on function _st_distanceuncached(geography, geography, boolean) to authenticated;

grant execute on function _st_distanceuncached(geography, geography, boolean) to service_role;

create function _st_distanceuncached(geography, geography) returns double precision
    immutable
    strict
    language sql
as
$$SELECT public._ST_DistanceUnCached($1, $2, 0.0, true)$$;

alter function _st_distanceuncached(geography, geography) owner to supabase_admin;

grant execute on function _st_distanceuncached(geography, geography) to postgres;

grant execute on function _st_distanceuncached(geography, geography) to anon;

grant execute on function _st_distanceuncached(geography, geography) to authenticated;

grant execute on function _st_distanceuncached(geography, geography) to service_role;

