create function geography_gist_distance(internal, geography, integer) returns double precision
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function geography_gist_distance(internal, geography, integer) owner to supabase_admin;

grant execute on function geography_gist_distance(internal, geography, integer) to postgres;

grant execute on function geography_gist_distance(internal, geography, integer) to anon;

grant execute on function geography_gist_distance(internal, geography, integer) to authenticated;

grant execute on function geography_gist_distance(internal, geography, integer) to service_role;

