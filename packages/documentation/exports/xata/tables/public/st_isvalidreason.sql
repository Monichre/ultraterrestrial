create function st_isvalidreason(geometry) returns text
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

comment on function st_isvalidreason(geometry) is 'args: geomA - Returns text stating if a geometry is valid, or a reason for invalidity.';

alter function st_isvalidreason(geometry) owner to supabase_admin;

grant execute on function st_isvalidreason(geometry) to postgres;

grant execute on function st_isvalidreason(geometry) to anon;

grant execute on function st_isvalidreason(geometry) to authenticated;

grant execute on function st_isvalidreason(geometry) to service_role;

create function st_isvalidreason(geometry, integer) returns text
    immutable
    strict
    parallel safe
    cost 10000
    language sql
as
$$
	SELECT CASE WHEN valid THEN 'Valid Geometry' ELSE reason END FROM (
		SELECT (public.ST_isValidDetail($1, $2)).*
	) foo
	$$;

comment on function st_isvalidreason(geometry, integer) is 'args: geomA, flags - Returns text stating if a geometry is valid, or a reason for invalidity.';

alter function st_isvalidreason(geometry, integer) owner to supabase_admin;

grant execute on function st_isvalidreason(geometry, integer) to postgres;

grant execute on function st_isvalidreason(geometry, integer) to anon;

grant execute on function st_isvalidreason(geometry, integer) to authenticated;

grant execute on function st_isvalidreason(geometry, integer) to service_role;

