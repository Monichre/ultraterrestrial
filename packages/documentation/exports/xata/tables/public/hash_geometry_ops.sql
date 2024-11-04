create operator family hash_geometry_ops using hash;

alter operator family hash_geometry_ops using hash add
    operator 1 =(geometry, geometry),
    function 1(geometry, geometry) geometry_hash(geometry);

alter operator family hash_geometry_ops using hash owner to supabase_admin;

create operator class hash_geometry_ops default for type geometry using hash as
    operator 1 =(geometry, geometry),
    function 1(geometry, geometry) geometry_hash(geometry);

alter operator class hash_geometry_ops using hash owner to supabase_admin;

