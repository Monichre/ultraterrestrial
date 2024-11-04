create operator ~= (procedure = geometry_same, leftarg = geometry, rightarg = geometry, join = contjoinsel, restrict = contsel);

alter operator ~=(geometry, geometry) owner to supabase_admin;

