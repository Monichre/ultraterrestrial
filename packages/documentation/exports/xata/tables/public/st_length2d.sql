create function st_length2d(geometry) returns double precision
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

comment on function st_length2d(geometry) is 'args: a_2dlinestring - Returns the 2D length of a linear geometry. Alias for ST_Length';

alter function st_length2d(geometry) owner to supabase_admin;

grant execute on function st_length2d(geometry) to postgres;

grant execute on function st_length2d(geometry) to anon;

grant execute on function st_length2d(geometry) to authenticated;

grant execute on function st_length2d(geometry) to service_role;

