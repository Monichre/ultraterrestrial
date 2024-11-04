create function match_documents(query_embedding vector, match_count integer DEFAULT NULL::integer, filter jsonb DEFAULT '{}'::jsonb)
    returns TABLE(id bigint, content text, metadata jsonb, similarity double precision)
    language plpgsql
as
$$
#variable_conflict use_column
begin
  return query
  select
    id,
    content,
    metadata,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where metadata @> filter
  order by documents.embedding <=> query_embedding
  limit match_count;
end;
$$;

alter function match_documents(vector, integer, jsonb) owner to postgres;

grant execute on function match_documents(vector, integer, jsonb) to anon;

grant execute on function match_documents(vector, integer, jsonb) to authenticated;

grant execute on function match_documents(vector, integer, jsonb) to service_role;

