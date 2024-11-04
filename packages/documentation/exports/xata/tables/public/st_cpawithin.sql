create function st_cpawithin(geometry, geometry, double precision) returns boolean
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

comment on function st_cpawithin(geometry, geometry, double precision) is 'args: track1, track2, dist - Tests if the closest point of approach of two trajectoriesis within the specified distance.';

alter function st_cpawithin(geometry, geometry, double precision) owner to supabase_admin;

grant execute on function st_cpawithin(geometry, geometry, double precision) to postgres;

grant execute on function st_cpawithin(geometry, geometry, double precision) to anon;

grant execute on function st_cpawithin(geometry, geometry, double precision) to authenticated;

grant execute on function st_cpawithin(geometry, geometry, double precision) to service_role;

