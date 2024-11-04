create function st_length(geometry) returns double precision
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

comment on function st_length(geometry) is 'args: a_2dlinestring - Returns the 2D length of a linear geometry.';

alter function st_length(geometry) owner to supabase_admin;

grant execute on function st_length(geometry) to postgres;

grant execute on function st_length(geometry) to anon;

grant execute on function st_length(geometry) to authenticated;

grant execute on function st_length(geometry) to service_role;

create function st_length(geog geography, use_spheroid boolean default true) returns double precision
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

comment on function st_length(geography, boolean) is 'args: geog, use_spheroid=true - Returns the 2D length of a linear geometry.';

alter function st_length(geography, boolean) owner to supabase_admin;

grant execute on function st_length(geography, boolean) to postgres;

grant execute on function st_length(geography, boolean) to anon;

grant execute on function st_length(geography, boolean) to authenticated;

grant execute on function st_length(geography, boolean) to service_role;

create function st_length(text) returns double precision
    immutable
    strict
    parallel safe
    language sql
as
$$ SELECT public.ST_Length($1::public.geometry);  $$;

alter function st_length(text) owner to supabase_admin;

grant execute on function st_length(text) to postgres;

grant execute on function st_length(text) to anon;

grant execute on function st_length(text) to authenticated;

grant execute on function st_length(text) to service_role;

