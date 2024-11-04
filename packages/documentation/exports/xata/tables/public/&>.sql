create operator &> (procedure = geometry_overright, leftarg = geometry, rightarg = geometry, join = positionjoinsel, restrict = positionsel);

alter operator &>(geometry, geometry) owner to supabase_admin;

