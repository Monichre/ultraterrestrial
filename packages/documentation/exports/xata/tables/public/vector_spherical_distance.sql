create function vector_spherical_distance(vector, vector) returns double precision
    immutable
    strict
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function vector_spherical_distance(vector, vector) owner to supabase_admin;

grant execute on function vector_spherical_distance(vector, vector) to postgres;

grant execute on function vector_spherical_distance(vector, vector) to anon;

grant execute on function vector_spherical_distance(vector, vector) to authenticated;

grant execute on function vector_spherical_distance(vector, vector) to service_role;

