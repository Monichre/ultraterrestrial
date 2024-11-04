create type geometry_dump as
(
    path integer[],
    geom geometry
);

comment on type geometry_dump is 'postgis type: A composite type used to describe the parts of complex geometry.';

alter type geometry_dump owner to supabase_admin;

