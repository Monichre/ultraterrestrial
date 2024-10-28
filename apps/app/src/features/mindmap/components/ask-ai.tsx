import { MemoizedMarkdown } from "@/features/ai"
import { askAIAction } from "@/features/mindmap/api/actions"
import { useState, useEffect } from "react"
import rehypeExternalLinks from "rehype-external-links"
import remarkGfm from "remark-gfm"
import { LetterFx } from '@/components/animated/text-effect/letter-glitch'
interface AskAIProps {
  question: any
  prompt?: any
  table: any
  children: React.ReactNode
  updateAnalysis: ( analysis: any ) => void
}

export const AskAI: React.FC<AskAIProps> = ( { question, prompt, table, children, updateAnalysis } ) => {
  const [status, setStatus] = useState<any>( 'loading..' )

  useEffect( () => {
    askAIAction( { question, prompt, table } ).then( res => {
      if ( res?.dbResponse ) {
        const { dbResponse: { answer: text, records } } = res
        setStatus( 'Complete' )
        updateAnalysis( { text, records } )
      }
    } )

  }, [question, prompt, table, updateAnalysis] )

  return (
    <div className='w-full flex justify-start items-center'>
      {children}: {status}
    </div>

  )
}
