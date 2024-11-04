create operator <<| (procedure = geometry_below, leftarg = geometry, rightarg = geometry, commutator = |>>, join = positionjoinsel, restrict = positionsel);

alter operator <<|(geometry, geometry) owner to supabase_admin;

