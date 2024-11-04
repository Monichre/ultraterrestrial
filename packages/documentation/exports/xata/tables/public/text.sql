create function text(geometry) returns text
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

alter function text(geometry) owner to supabase_admin;

grant execute on function text(geometry) to postgres;

grant execute on function text(geometry) to anon;

grant execute on function text(geometry) to authenticated;

grant execute on function text(geometry) to service_role;

