create function _st_distancetree(geography, geography, double precision, boolean) returns double precision
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

alter function _st_distancetree(geography, geography, double precision, boolean) owner to supabase_admin;

grant execute on function _st_distancetree(geography, geography, double precision, boolean) to postgres;

grant execute on function _st_distancetree(geography, geography, double precision, boolean) to anon;

grant execute on function _st_distancetree(geography, geography, double precision, boolean) to authenticated;

grant execute on function _st_distancetree(geography, geography, double precision, boolean) to service_role;

create function _st_distancetree(geography, geography) returns double precision
    immutable
    strict
    language sql
as
$$SELECT public._ST_DistanceTree($1, $2, 0.0, true)$$;

alter function _st_distancetree(geography, geography) owner to supabase_admin;

grant execute on function _st_distancetree(geography, geography) to postgres;

grant execute on function _st_distancetree(geography, geography) to anon;

grant execute on function _st_distancetree(geography, geography) to authenticated;

grant execute on function _st_distancetree(geography, geography) to service_role;

