create function _st_dwithinuncached(geography, geography, double precision, boolean) returns boolean
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

alter function _st_dwithinuncached(geography, geography, double precision, boolean) owner to supabase_admin;

grant execute on function _st_dwithinuncached(geography, geography, double precision, boolean) to postgres;

grant execute on function _st_dwithinuncached(geography, geography, double precision, boolean) to anon;

grant execute on function _st_dwithinuncached(geography, geography, double precision, boolean) to authenticated;

grant execute on function _st_dwithinuncached(geography, geography, double precision, boolean) to service_role;

create function _st_dwithinuncached(geography, geography, double precision) returns boolean
    immutable
    language sql
as
$$SELECT $1 OPERATOR(public.&&) public._ST_Expand($2,$3) AND $2 OPERATOR(public.&&) public._ST_Expand($1,$3) AND public._ST_DWithinUnCached($1, $2, $3, true)$$;

alter function _st_dwithinuncached(geography, geography, double precision) owner to supabase_admin;

grant execute on function _st_dwithinuncached(geography, geography, double precision) to postgres;

grant execute on function _st_dwithinuncached(geography, geography, double precision) to anon;

grant execute on function _st_dwithinuncached(geography, geography, double precision) to authenticated;

grant execute on function _st_dwithinuncached(geography, geography, double precision) to service_role;

