create function st_gmltosql(text) returns geometry
    immutable
    strict
    parallel safe
    cost 500
    language sql
as
$$SELECT public._ST_GeomFromGML($1, 0)$$;

alter function st_gmltosql(text) owner to supabase_admin;

grant execute on function st_gmltosql(text) to postgres;

grant execute on function st_gmltosql(text) to anon;

grant execute on function st_gmltosql(text) to authenticated;

grant execute on function st_gmltosql(text) to service_role;

create function st_gmltosql(text, integer) returns geometry
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

alter function st_gmltosql(text, integer) owner to supabase_admin;

grant execute on function st_gmltosql(text, integer) to postgres;

grant execute on function st_gmltosql(text, integer) to anon;

grant execute on function st_gmltosql(text, integer) to authenticated;

grant execute on function st_gmltosql(text, integer) to service_role;

