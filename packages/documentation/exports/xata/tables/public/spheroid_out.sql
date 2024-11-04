create function spheroid_out(spheroid) returns cstring
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

alter function spheroid_out(spheroid) owner to supabase_admin;

grant execute on function spheroid_out(spheroid) to postgres;

grant execute on function spheroid_out(spheroid) to anon;

grant execute on function spheroid_out(spheroid) to authenticated;

grant execute on function spheroid_out(spheroid) to service_role;

