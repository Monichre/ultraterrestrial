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
}

export const AskAI: React.FC<AskAIProps> = ( { question, prompt, table, children } ) => {
  const [analysis, setAnalysis] = useState<any>( null )
  console.log( "🚀 ~ file: ask-ai.tsx:14 ~ AskAI ~ setAnalysis:", setAnalysis )
  useEffect( () => {
    askAIAction( { question, prompt, table } ).then( res => {
      if ( res?.dbResponse ) {
        const { dbResponse: { answer: text, records } } = res
        setAnalysis( { text, records } )
      }
    } )

  }, [question, prompt, table] )

  return ( <div>
    <div className='w-full'>
      {children}
    </div>
    <MemoizedMarkdown
      rehypePlugins={[
        [rehypeExternalLinks, { target: '_blank' }],
      ]}
      remarkPlugins={[remarkGfm]}
      className='prose-sm prose-neutral prose-a:text-accent-foreground/50'
      components={{
        // Map `h1` (`# heading`) to use `h2`s.
        h1: 'h2',
        // Rewrite `em`s (`*like so*`) to `i` with a red foreground color.
        pre: ( props ) => {
          return (
            // @ts-ignore
            <div {...props} />
          )
        },
        code: ( props ) => {
          return (
            // @ts-ignore
            <p {...props} />
          )
        },
        p: ( props ) => {
          return (

            <LetterFX speed='slow'>
              <p {...props} />
            </LetterFX>
          )
        },
      }}
    >
      {analysis}
    </MemoizedMarkdown>
  </div> )
}
