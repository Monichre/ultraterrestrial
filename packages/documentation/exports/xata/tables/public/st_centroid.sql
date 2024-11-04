create function st_centroid(geometry) returns geometry
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

comment on function st_centroid(geometry) is 'args: g1 - Returns the geometric center of a geometry.';

alter function st_centroid(geometry) owner to supabase_admin;

grant execute on function st_centroid(geometry) to postgres;

grant execute on function st_centroid(geometry) to anon;

grant execute on function st_centroid(geometry) to authenticated;

grant execute on function st_centroid(geometry) to service_role;

create function st_centroid(geography, use_spheroid boolean default true) returns geography
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

comment on function st_centroid(geography, boolean) is 'args: g1, use_spheroid=true - Returns the geometric center of a geometry.';

alter function st_centroid(geography, boolean) owner to supabase_admin;

grant execute on function st_centroid(geography, boolean) to postgres;

grant execute on function st_centroid(geography, boolean) to anon;

grant execute on function st_centroid(geography, boolean) to authenticated;

grant execute on function st_centroid(geography, boolean) to service_role;

create function st_centroid(text) returns geometry
    immutable
    strict
    parallel safe
    language sql
as
$$ SELECT public.ST_Centroid($1::public.geometry);  $$;

alter function st_centroid(text) owner to supabase_admin;

grant execute on function st_centroid(text) to postgres;

grant execute on function st_centroid(text) to anon;

grant execute on function st_centroid(text) to authenticated;

grant execute on function st_centroid(text) to service_role;

