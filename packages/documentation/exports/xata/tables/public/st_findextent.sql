create function st_findextent(text, text, text) returns box2d
    stable
    strict
    parallel safe
    language plpgsql
as
$$
DECLARE
	schemaname alias for $1;
	tablename alias for $2;
	columnname alias for $3;
	myrec RECORD;
BEGIN
	FOR myrec IN EXECUTE 'SELECT public.ST_Extent("' || columnname || '") As extent FROM "' || schemaname || '"."' || tablename || '"' LOOP
		return myrec.extent;
	END LOOP;
END;
$$;

alter function st_findextent(text, text, text) owner to supabase_admin;

grant execute on function st_findextent(text, text, text) to postgres;

grant execute on function st_findextent(text, text, text) to anon;

grant execute on function st_findextent(text, text, text) to authenticated;

grant execute on function st_findextent(text, text, text) to service_role;

create function st_findextent(text, text) returns box2d
    stable
    strict
    parallel safe
    language plpgsql
as
$$
DECLARE
	tablename alias for $1;
	columnname alias for $2;
	myrec RECORD;

BEGIN
	FOR myrec IN EXECUTE 'SELECT public.ST_Extent("' || columnname || '") As extent FROM "' || tablename || '"' LOOP
		return myrec.extent;
	END LOOP;
END;
$$;

alter function st_findextent(text, text) owner to supabase_admin;

grant execute on function st_findextent(text, text) to postgres;

grant execute on function st_findextent(text, text) to anon;

grant execute on function st_findextent(text, text) to authenticated;

grant execute on function st_findextent(text, text) to service_role;

