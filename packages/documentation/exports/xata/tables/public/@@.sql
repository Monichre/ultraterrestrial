create operator @@ (procedure = geometry_within_nd, leftarg = geometry, rightarg = geometry, commutator = ~~, join = gserialized_gist_joinsel_nd, restrict = gserialized_gist_sel_nd);

alter operator @@(geometry, geometry) owner to supabase_admin;
