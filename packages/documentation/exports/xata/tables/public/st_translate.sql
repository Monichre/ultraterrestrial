create function st_translate(geometry, double precision, double precision, double precision) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language sql
as
$$SELECT public.ST_Affine($1, 1, 0, 0, 0, 1, 0, 0, 0, 1, $2, $3, $4)$$;

comment on function st_translate(geometry, double precision, double precision, double precision) is 'args: g1, deltax, deltay, deltaz - Translates a geometry by given offsets.';

alter function st_translate(geometry, double precision, double precision, double precision) owner to supabase_admin;

grant execute on function st_translate(geometry, double precision, double precision, double precision) to postgres;

grant execute on function st_translate(geometry, double precision, double precision, double precision) to anon;

grant execute on function st_translate(geometry, double precision, double precision, double precision) to authenticated;

grant execute on function st_translate(geometry, double precision, double precision, double precision) to service_role;

create function st_translate(geometry, double precision, double precision) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language sql
as
$$SELECT public.ST_Translate($1, $2, $3, 0)$$;

comment on function st_translate(geometry, double precision, double precision) is 'args: g1, deltax, deltay - Translates a geometry by given offsets.';

alter function st_translate(geometry, double precision, double precision) owner to supabase_admin;

grant execute on function st_translate(geometry, double precision, double precision) to postgres;

grant execute on function st_translate(geometry, double precision, double precision) to anon;

grant execute on function st_translate(geometry, double precision, double precision) to authenticated;

grant execute on function st_translate(geometry, double precision, double precision) to service_role;

