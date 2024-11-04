create operator &&& (procedure = geometry_overlaps_nd, leftarg = geometry, rightarg = geometry, commutator = &&&, join = gserialized_gist_joinsel_nd, restrict = gserialized_gist_sel_nd);

alter operator &&&(geometry, geometry) owner to supabase_admin;

create operator &&& (procedure = overlaps_nd, leftarg = gidx, rightarg = gidx, commutator = &&&);

alter operator &&&(gidx, gidx) owner to supabase_admin;

-- Cyclic dependencies found

create operator &&& (procedure = overlaps_nd, leftarg = geometry, rightarg = gidx, commutator = &&&);

alter operator &&&(geometry, gidx) owner to supabase_admin;

create operator &&& (procedure = overlaps_nd, leftarg = gidx, rightarg = geometry, commutator = &&&);

alter operator &&&(gidx, geometry) owner to supabase_admin;

