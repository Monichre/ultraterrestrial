create function st_asmarc21(geom geometry, format text default 'hdddmmss'::text) returns text
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

alter function st_asmarc21(geometry, text) owner to supabase_admin;

grant execute on function st_asmarc21(geometry, text) to postgres;

grant execute on function st_asmarc21(geometry, text) to anon;

grant execute on function st_asmarc21(geometry, text) to authenticated;

grant execute on function st_asmarc21(geometry, text) to service_role;

