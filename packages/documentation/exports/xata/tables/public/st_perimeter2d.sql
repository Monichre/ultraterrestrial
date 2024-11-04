create function st_perimeter2d(geometry) returns double precision
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

comment on function st_perimeter2d(geometry) is 'args: geomA - Returns the 2D perimeter of a polygonal geometry. Alias for ST_Perimeter.';

alter function st_perimeter2d(geometry) owner to supabase_admin;

grant execute on function st_perimeter2d(geometry) to postgres;

grant execute on function st_perimeter2d(geometry) to anon;

grant execute on function st_perimeter2d(geometry) to authenticated;

grant execute on function st_perimeter2d(geometry) to service_role;

