create function st_asewkt(geometry) returns text
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

alter function st_asewkt(geometry) owner to supabase_admin;

grant execute on function st_asewkt(geometry) to postgres;

grant execute on function st_asewkt(geometry) to anon;

grant execute on function st_asewkt(geometry) to authenticated;

grant execute on function st_asewkt(geometry) to service_role;

create function st_asewkt(geometry, integer) returns text
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

alter function st_asewkt(geometry, integer) owner to supabase_admin;

grant execute on function st_asewkt(geometry, integer) to postgres;

grant execute on function st_asewkt(geometry, integer) to anon;

grant execute on function st_asewkt(geometry, integer) to authenticated;

grant execute on function st_asewkt(geometry, integer) to service_role;

create function st_asewkt(geography) returns text
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

alter function st_asewkt(geography) owner to supabase_admin;

grant execute on function st_asewkt(geography) to postgres;

grant execute on function st_asewkt(geography) to anon;

grant execute on function st_asewkt(geography) to authenticated;

grant execute on function st_asewkt(geography) to service_role;

create function st_asewkt(geography, integer) returns text
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

alter function st_asewkt(geography, integer) owner to supabase_admin;

grant execute on function st_asewkt(geography, integer) to postgres;

grant execute on function st_asewkt(geography, integer) to anon;

grant execute on function st_asewkt(geography, integer) to authenticated;

grant execute on function st_asewkt(geography, integer) to service_role;

create function st_asewkt(text) returns text
    immutable
    strict
    parallel safe
    cost 500
    language sql
as
$$ SELECT public.ST_AsEWKT($1::public.geometry);  $$;

alter function st_asewkt(text) owner to supabase_admin;

grant execute on function st_asewkt(text) to postgres;

grant execute on function st_asewkt(text) to anon;

grant execute on function st_asewkt(text) to authenticated;

grant execute on function st_asewkt(text) to service_role;

