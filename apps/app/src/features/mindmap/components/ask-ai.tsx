import { askAIAction } from "@/features/mindmap/api/actions"
import { useState, useEffect } from "react"

interface AskAIProps {
  records: any
  prompt: any
  table: any
  children: React.ReactNode
}

export const AskAI: React.FC<AskAIProps> = ( { records, prompt, table, children } ) => {
  const [response, setResponse] = useState<any>( null )
  console.log( "🚀 ~ file: ask-ai.tsx:14 ~ AskAI ~ response:", response )
  useEffect( () => {
    askAIAction( { records, prompt, table } ).then( res => setResponse( res ) )

  }, [records, prompt, table] )

  return <div>
    {children}
  </div>
}
