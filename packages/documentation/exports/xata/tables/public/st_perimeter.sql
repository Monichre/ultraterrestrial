create function st_perimeter(geometry) returns double precision
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

comment on function st_perimeter(geometry) is 'args: g1 - Returns the length of the boundary of a polygonal geometry or geography.';

alter function st_perimeter(geometry) owner to supabase_admin;

grant execute on function st_perimeter(geometry) to postgres;

grant execute on function st_perimeter(geometry) to anon;

grant execute on function st_perimeter(geometry) to authenticated;

grant execute on function st_perimeter(geometry) to service_role;

create function st_perimeter(geog geography, use_spheroid boolean default true) returns double precision
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

comment on function st_perimeter(geography, boolean) is 'args: geog, use_spheroid=true - Returns the length of the boundary of a polygonal geometry or geography.';

alter function st_perimeter(geography, boolean) owner to supabase_admin;

grant execute on function st_perimeter(geography, boolean) to postgres;

grant execute on function st_perimeter(geography, boolean) to anon;

grant execute on function st_perimeter(geography, boolean) to authenticated;

grant execute on function st_perimeter(geography, boolean) to service_role;

