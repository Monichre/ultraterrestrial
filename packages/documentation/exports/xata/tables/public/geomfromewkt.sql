create function geomfromewkt(text) returns geometry
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

alter function geomfromewkt(text) owner to supabase_admin;

grant execute on function geomfromewkt(text) to postgres;

grant execute on function geomfromewkt(text) to anon;

grant execute on function geomfromewkt(text) to authenticated;

grant execute on function geomfromewkt(text) to service_role;

