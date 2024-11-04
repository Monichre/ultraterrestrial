create function st_area(geometry) returns double precision
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

comment on function st_area(geometry) is 'args: g1 - Returns the area of a polygonal geometry.';

alter function st_area(geometry) owner to supabase_admin;

grant execute on function st_area(geometry) to postgres;

grant execute on function st_area(geometry) to anon;

grant execute on function st_area(geometry) to authenticated;

grant execute on function st_area(geometry) to service_role;

create function st_area(geog geography, use_spheroid boolean default true) returns double precision
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

comment on function st_area(geography, boolean) is 'args: geog, use_spheroid=true - Returns the area of a polygonal geometry.';

alter function st_area(geography, boolean) owner to supabase_admin;

grant execute on function st_area(geography, boolean) to postgres;

grant execute on function st_area(geography, boolean) to anon;

grant execute on function st_area(geography, boolean) to authenticated;

grant execute on function st_area(geography, boolean) to service_role;

create function st_area(text) returns double precision
    immutable
    strict
    parallel safe
    language sql
as
$$ SELECT public.ST_Area($1::public.geometry);  $$;

alter function st_area(text) owner to supabase_admin;

grant execute on function st_area(text) to postgres;

grant execute on function st_area(text) to anon;

grant execute on function st_area(text) to authenticated;

grant execute on function st_area(text) to service_role;

