create function st_forcecurve(geometry) returns geometry
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

comment on function st_forcecurve(geometry) is 'args: g - Upcast a geometry into its curved type, if applicable.';

alter function st_forcecurve(geometry) owner to supabase_admin;

grant execute on function st_forcecurve(geometry) to postgres;

grant execute on function st_forcecurve(geometry) to anon;

grant execute on function st_forcecurve(geometry) to authenticated;

grant execute on function st_forcecurve(geometry) to service_role;

