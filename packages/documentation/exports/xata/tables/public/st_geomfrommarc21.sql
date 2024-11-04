create function st_geomfrommarc21(marc21xml text) returns geometry
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

alter function st_geomfrommarc21(text) owner to supabase_admin;

grant execute on function st_geomfrommarc21(text) to postgres;

grant execute on function st_geomfrommarc21(text) to anon;

grant execute on function st_geomfrommarc21(text) to authenticated;

grant execute on function st_geomfrommarc21(text) to service_role;

