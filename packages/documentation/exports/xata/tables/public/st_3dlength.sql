create function st_3dlength(geometry) returns double precision
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

comment on function st_3dlength(geometry) is 'args: a_3dlinestring - Returns the 3D length of a linear geometry.';

alter function st_3dlength(geometry) owner to supabase_admin;

grant execute on function st_3dlength(geometry) to postgres;

grant execute on function st_3dlength(geometry) to anon;

grant execute on function st_3dlength(geometry) to authenticated;

grant execute on function st_3dlength(geometry) to service_role;

