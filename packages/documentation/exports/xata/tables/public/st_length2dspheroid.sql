create function st_length2dspheroid(geometry, spheroid) returns double precision
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

alter function st_length2dspheroid(geometry, spheroid) owner to supabase_admin;

grant execute on function st_length2dspheroid(geometry, spheroid) to postgres;

grant execute on function st_length2dspheroid(geometry, spheroid) to anon;

grant execute on function st_length2dspheroid(geometry, spheroid) to authenticated;

grant execute on function st_length2dspheroid(geometry, spheroid) to service_role;

