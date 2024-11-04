create function introspect_schema()
    returns TABLE(table_name text, column_name text, data_type text, is_nullable text, foreign_table text, foreign_column text)
    language plpgsql
as
$$
BEGIN
    RETURN QUERY
    SELECT 
        c.table_name,
        c.column_name,
        c.data_type,
        c.is_nullable,
        kcu.foreign_table_name AS foreign_table,
        kcu.foreign_column_name AS foreign_column
    FROM 
        information_schema.columns AS c
    LEFT JOIN 
        information_schema.key_column_usage AS kcu
        ON c.table_name = kcu.table_name AND c.column_name = kcu.column_name
    LEFT JOIN 
        information_schema.table_constraints AS tc
        ON kcu.constraint_name = tc.constraint_name AND tc.constraint_type = 'FOREIGN KEY'
    WHERE 
        c.table_schema = 'public'
    ORDER BY 
        c.table_name, c.ordinal_position;
END;
$$;

alter function introspect_schema() owner to postgres;

grant execute on function introspect_schema() to anon;

grant execute on function introspect_schema() to authenticated;

grant execute on function introspect_schema() to service_role;

