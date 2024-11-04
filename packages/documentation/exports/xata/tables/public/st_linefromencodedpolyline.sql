create function st_linefromencodedpolyline(txtin text, nprecision integer default 5) returns geometry
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

alter function st_linefromencodedpolyline(text, integer) owner to supabase_admin;

grant execute on function st_linefromencodedpolyline(text, integer) to postgres;

grant execute on function st_linefromencodedpolyline(text, integer) to anon;

grant execute on function st_linefromencodedpolyline(text, integer) to authenticated;

grant execute on function st_linefromencodedpolyline(text, integer) to service_role;

