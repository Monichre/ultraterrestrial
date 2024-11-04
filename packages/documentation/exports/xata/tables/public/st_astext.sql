create function st_astext(geometry) returns text
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

alter function st_astext(geometry) owner to supabase_admin;

grant execute on function st_astext(geometry) to postgres;

grant execute on function st_astext(geometry) to anon;

grant execute on function st_astext(geometry) to authenticated;

grant execute on function st_astext(geometry) to service_role;

create function st_astext(geometry, integer) returns text
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

alter function st_astext(geometry, integer) owner to supabase_admin;

grant execute on function st_astext(geometry, integer) to postgres;

grant execute on function st_astext(geometry, integer) to anon;

grant execute on function st_astext(geometry, integer) to authenticated;

grant execute on function st_astext(geometry, integer) to service_role;

create function st_astext(geography) returns text
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

alter function st_astext(geography) owner to supabase_admin;

grant execute on function st_astext(geography) to postgres;

grant execute on function st_astext(geography) to anon;

grant execute on function st_astext(geography) to authenticated;

grant execute on function st_astext(geography) to service_role;

create function st_astext(geography, integer) returns text
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

alter function st_astext(geography, integer) owner to supabase_admin;

grant execute on function st_astext(geography, integer) to postgres;

grant execute on function st_astext(geography, integer) to anon;

grant execute on function st_astext(geography, integer) to authenticated;

grant execute on function st_astext(geography, integer) to service_role;

create function st_astext(text) returns text
    immutable
    strict
    parallel safe
    cost 500
    language sql
as
$$ SELECT public.ST_AsText($1::public.geometry);  $$;

alter function st_astext(text) owner to supabase_admin;

grant execute on function st_astext(text) to postgres;

grant execute on function st_astext(text) to anon;

grant execute on function st_astext(text) to authenticated;

grant execute on function st_astext(text) to service_role;

