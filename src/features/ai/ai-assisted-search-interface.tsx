// 'use client'

// import rehypeExternalLinks from 'rehype-external-links'
// import remarkGfm from 'remark-gfm'
// import remarkMath from 'remark-math'
// import { useState, useEffect } from 'react'
// import Link from 'next/link'
// // import * as Dialog from '@radix-ui/react-dialog'
// import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
// import * as ScrollArea from '@radix-ui/react-scroll-area'
// import { nodeTypes, rootNodes } from '@/features/mindmap/config/index.config'
// import { useActions } from 'ai/rsc'

// import { SearchIcon } from 'lucide-react'
// import { Button } from '@/components/ui/button/button'
// import { Divider } from '@/features/user/note/ui/PopoverMenu'
// import { Message, useAssistant } from 'ai/react'
// import { inputRegex } from '@tiptap/extension-highlight'
// import { AnimatePresence, motion } from 'framer-motion'
// import { cn } from '@/utils'
// import { MemoizedMarkdown } from '@/features/ai/markdown'
// import { Answer } from './prompts/Answer'
// import { EntityMenu } from './entity-menu'
// import { MindMapEntityLoaderCard } from './mindmap-entity-loader-card'
// import {
//   Dialog,
//   DialogClose,
//   DialogPortal,
//   DialogTitle,
//   DialogContent,
//   DialogOverlay,
//   DialogTrigger,
// } from '@/components/ui/dialog'
// import { SuggestedSearchItem } from './SuggestedSearchItem'
// import { addConversationToDisclosureAssistantMemory } from '@/services/mem0'
// // import { useCompletion } from 'ai/react';

// const CheckIcon = ({ className }: { className?: string }) => {
//   return (
//     <svg
//       xmlns='http://www.w3.org/2000/svg'
//       fill='none'
//       viewBox='0 0 24 24'
//       strokeWidth={1.5}
//       stroke='currentColor'
//       className={cn('w-6 h-6 ', className)}
//     >
//       <path d='M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
//     </svg>
//   )
// }

// const CheckFilled = ({ className }: { className?: string }) => {
//   return (
//     <svg
//       xmlns='http://www.w3.org/2000/svg'
//       viewBox='0 0 24 24'
//       fill='currentColor'
//       className={cn('w-6 h-6 ', className)}
//     >
//       <path
//         fillRule='evenodd'
//         d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z'
//         clipRule='evenodd'
//       />
//     </svg>
//   )
// }

// type LoadingState = {
//   text: string
// }

// const LoaderCore = ({
//   loadingStates,
//   value = 0,
// }: {
//   loadingStates: LoadingState[]
//   value?: number
// }) => {
//   return (
//     <div className='flex relative justify-start max-w-xxl mx-auto flex-col mt-40'>
//       {loadingStates.map((loadingState, index) => {
//         const distance = Math.abs(index - value)
//         const opacity = Math.max(1 - distance * 0.2, 0) // Minimum opacity is 0, keep it 0.2 if you're sane.

//         return (
//           <motion.div
//             key={index}
//             className={cn('text-left flex gap-2 mb-4')}
//             initial={{ opacity: 0, y: -(value * 40) }}
//             animate={{ opacity: opacity, y: -(value * 40) }}
//             transition={{ duration: 0.5 }}
//           >
//             <div>
//               {index > value && <CheckIcon className=' text-white' />}
//               {index <= value && (
//                 <CheckFilled
//                   className={cn(
//                     ' text-white',
//                     value === index && ' dark:text-lime-500 opacity-100'
//                   )}
//                 />
//               )}
//             </div>
//             <span
//               className={cn(
//                 ' text-white',
//                 value === index && ' dark:text-lime-500 opacity-100'
//               )}
//             >
//               {loadingState.text}
//             </span>
//           </motion.div>
//         )
//       })}
//     </div>
//   )
// }

// export const LoadingSequence = ({
//   loadingStates,
//   loading,
//   duration = 2000,
//   loop = true,
// }: {
//   loadingStates: LoadingState[]
//   loading?: boolean
//   duration?: number
//   loop?: boolean
// }) => {
//   const [currentState, setCurrentState] = useState(0)

//   useEffect(() => {
//     if (!loading) {
//       setCurrentState(0)
//       return
//     }
//     const timeout = setTimeout(() => {
//       setCurrentState((prevState) =>
//         loop
//           ? prevState === loadingStates.length - 1
//             ? 0
//             : prevState + 1
//           : Math.min(prevState + 1, loadingStates.length - 1)
//       )
//     }, duration)

//     return () => clearTimeout(timeout)
//   }, [currentState, loading, loop, loadingStates.length, duration])
//   return (
//     <AnimatePresence mode='wait'>
//       {loading && (
//         <motion.div
//           initial={{
//             opacity: 0,
//           }}
//           animate={{
//             opacity: 1,
//           }}
//           exit={{
//             opacity: 0,
//           }}
//           className='w-full h-full fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-2xl'
//         >
//           <div className='h-96  relative'>
//             <LoaderCore value={currentState} loadingStates={loadingStates} />
//           </div>

//           <div className='bg-gradient-to-t inset-x-0 z-20 bottom-0 bg-black dark:bg-black h-full absolute [mask-image:radial-gradient(900px_at_center,transparent_30%,white)]' />
//         </motion.div>
//       )}
//     </AnimatePresence>
//   )
// }

// const suggestions = [
//   'Tell me about the Roswell incident.',
//   `Give me the top 10 who's who of ufology?`,
//   'How can I get into Ufology and remain attractive to the opposite sex?',
//   'Who is the most credible key figure?',
//   'What data is there on ancient artifacts as they related to non human intelligence?',
// ]

// export function AiAssistedSearch({ isOpen, children }: any) {
//   const [initial, setInitial] = useState<boolean>(true)
//   // const [query, setQuery]: any = useState('')

//   // const [messages, setMessages] = useState<ClientMessage[]>([])
//   const {
//     status,
//     error,
//     messages,
//     input,
//     submitMessage,

//     handleInputChange,
//     append,
//   } = useAssistant({ api: '/api/assistants/disclosure/message' })

//   const handleSelection = (suggestion: string) => {
//     append({
//       role: 'user',
//       content: suggestion,
//     })
//     setInitial(false)
//   }
//   // const onChange = (event: any) => {
//   //   setQuery(event.target.value)
//   // }

//   useEffect(() => {
//     if ((messages?.length && initial) || status === 'in_progress') {
//       setInitial(false)
//     }
//   }, [messages, initial, status])

//   const [dialogOpen, setDialogOpen] = useState<boolean>(false)

//   const handleDialogChange = async (isOpen: boolean) => {
//     if (!isOpen) {
//       await addConversationToDisclosureAssistantMemory(messages)
//     }
//     setDialogOpen(isOpen)
//   }
//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       // event.preventDefault()
//       if (event.metaKey && event.key === 'k' && !dialogOpen) {
//         setDialogOpen(true)
//       }
//       // event.preventDefault()
//       if (event.metaKey && event.key === 'k' && dialogOpen) {
//         setDialogOpen(false)
//       }
//     }

//     window.addEventListener('keydown', handleKeyDown)

//     return () => {
//       window.removeEventListener('keydown', handleKeyDown)
//       // setQuery('')
//     }
//   }, [dialogOpen])

//   return (
//     <Dialog
//       open={dialogOpen}
//       onOpenChange={handleDialogChange}
//       // @ts-ignore
//       id='ai-search-interface'
//     >
//       <div className='h-12 w-12 center flex flex-col justify-center align-middle items-center transition-all duration-300 rounded-[100%] overflow-hidden border bg-white dark:bg-black relative'>
//         <DialogTrigger>
//           <div className='flex items-center justify-center'>
//             <SearchIcon className='h-5 w-5 stroke-1' />
//           </div>
//         </DialogTrigger>
//       </div>
//       <DialogPortal>
//         <DialogOverlay className='data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50' />
//         <DialogContent className='data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 grid max-h-[85vh] w-[90vw] max-w-xxl translate-x-[-50%] translate-y-[-50%] overflow-hidden border bg-black shadow-lg duration-200 sm:rounded-lg'>
//           <VisuallyHidden.Root>
//             <DialogTitle>Get Weird With It</DialogTitle>
//           </VisuallyHidden.Root>
//           <div
//             className={`border-b border-slate-200 flex flex-col ${initial ? '' : 'flex-col-reverse'}`}
//           >
//             <form className='flex items-center' onSubmit={submitMessage}>
//               <VisuallyHidden.Root>
//                 <label htmlFor='search-modal'>
//                   Ask Party Martian, the AI warden of Ultraterrestrial
//                 </label>
//               </VisuallyHidden.Root>
//               <svg
//                 className='ml-4 h-4 w-4 shrink-0 fill-slate-500'
//                 width='16'
//                 height='16'
//                 viewBox='0 0 16 16'
//                 xmlns='http://www.w3.org/2000/svg'
//               >
//                 <path d='m14.707 13.293-1.414 1.414-2.4-2.4 1.414-1.414 2.4 2.4ZM6.8 12.6A5.8 5.8 0 1 1 6.8 1a5.8 5.8 0 0 1 0 11.6Zm0-2a3.8 3.8 0 1 0 0-7.6 3.8 3.8 0 0 0 0 7.6Z' />
//               </svg>
//               <input
//                 id='search-modal'
//                 className='[&::-webkit-search-decoration]:none [&::-webkit-search-results-button]:none [&::-webkit-search-results-decoration]:none [&::-webkit-search-cancel-button]:hidden w-full appearance-none border-0 bg-black py-3 pl-2 pr-4 text-sm placeholder-slate-400  focus:outline-none'
//                 type='search'
//                 placeholder='Message'
//                 onChange={handleInputChange}
//                 value={input}
//                 // onKeyDown={(event) => {
//                 //   if (event.key === 'Enter') {
//                 //     submitMessage()
//                 //   }
//                 // }}
//               />
//               <Button type='submit' variant='ghost'>
//                 Send
//               </Button>
//             </form>

//             <div className='prompt-ui-responses'>
//               <ScrollArea.Root className='max-h-[calc(85vh-44px)] overflow-scroll'>
//                 <ScrollArea.Viewport className='h-full w-full'>
//                   <div className='space-y-4 px-2 py-4'>
//                     {status === 'in_progress' ? (
//                       <>
//                         <div className='p-2'>status: {status}</div>
//                         <LoadingSequence
//                           loadingStates={[
//                             {
//                               text: 'Consulting Party Martian, Warden of Ultraterrestrial...',
//                             },
//                             {
//                               text: `Give it a second, we're literally calling Zeta Reticuli`,
//                             },
//                             {
//                               text: 'I know, I know, why is an ET from Zeta Reticul called Party Martian? Why are native americans called Indians bro?',
//                             },
//                             { text: 'Make a snack' },
//                           ]}
//                         />
//                       </>
//                     ) : initial ? (
//                       <div>
//                         <div className='mb-2 px-2 text-xs font-semibold uppercase text-white'>
//                           Suggestions
//                         </div>
//                         <ul>
//                           {suggestions.map((suggestion) => (
//                             <SuggestedSearchItem
//                               onClick={handleSelection}
//                               key={suggestion}
//                               value={suggestion}
//                             />
//                           ))}
//                         </ul>
//                         <Divider />
//                       </div>
//                     ) : null}

//                     {messages?.length ? (
//                       <div className='flex flex-col p-2 gap-2'>
//                         {messages.map((message: any) => {
//                           return (
//                             <Answer
//                               key={message.id}
//                               prompt={
//                                 message?.role === 'user'
//                                   ? message.content
//                                   : null
//                               }
//                               answer={
//                                 message.role === 'assistant' ? (
//                                   <MemoizedMarkdown
//                                     rehypePlugins={[
//                                       [
//                                         rehypeExternalLinks,
//                                         { target: '_blank' },
//                                       ],
//                                     ]}
//                                     remarkPlugins={[remarkGfm]}
//                                     className='prose-sm prose-neutral prose-a:text-accent-foreground/50'
//                                     components={{
//                                       code({
//                                         node,
//                                         inline,
//                                         className,
//                                         children,
//                                         ...props
//                                       }: any) {
//                                         if (inline) {
//                                           return (
//                                             <code
//                                               className={className}
//                                               {...props}
//                                             >
//                                               {children}
//                                             </code>
//                                           )
//                                         }

//                                         return null
//                                       },
//                                     }}
//                                   >
//                                     {message.content}
//                                   </MemoizedMarkdown>
//                                 ) : null
//                               }
//                             />
//                           )
//                         })}
//                       </div>
//                     ) : null}
//                   </div>
//                 </ScrollArea.Viewport>
//                 <ScrollArea.Scrollbar
//                   className='flex h-full w-2 touch-none select-none border-l border-l-transparent p-[1px] transition-colors'
//                   orientation='vertical'
//                 >
//                   <ScrollArea.Thumb className='relative flex-1 rounded-full bg-slate-300' />
//                 </ScrollArea.Scrollbar>
//                 <ScrollArea.Scrollbar
//                   className='flex h-2.5 touch-none select-none flex-col border-t border-t-transparent p-[1px] transition-colors'
//                   orientation='horizontal'
//                 >
//                   <ScrollArea.Thumb className='relative flex-1 rounded-full bg-slate-300' />
//                 </ScrollArea.Scrollbar>
//                 <ScrollArea.Corner className='bg-black' />
//               </ScrollArea.Root>
//             </div>
//           </div>
//         </DialogContent>
//       </DialogPortal>
//     </Dialog>
//   )
// }

'use client'

import rehypeExternalLinks from 'rehype-external-links'
import remarkGfm from 'remark-gfm'
import { useState, useEffect, useCallback, useRef } from 'react'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { SearchIcon } from 'lucide-react'
import { Button } from '@/components/ui/button/button'
import { Divider } from '@/features/user/note/ui/PopoverMenu'
import { useAssistant } from 'ai/react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/utils'
import { MemoizedMarkdown } from '@/features/ai/markdown'
import { Answer } from './prompts/Answer'
import {
  Dialog,
  DialogPortal,
  DialogTitle,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from '@/components/ui/dialog'
import { SuggestedSearchItem } from './SuggestedSearchItem'
// import { addConversationToDisclosureAssistantMemory } from '@/services/mem0'

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className={cn('w-6 h-6', className)}
  >
    <path d='M9 12.75L11.25 15L15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
  </svg>
)

const CheckFilled = ({ className }: { className?: string }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='currentColor'
    className={cn('w-6 h-6', className)}
  >
    <path
      fillRule='evenodd'
      d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z'
      clipRule='evenodd'
    />
  </svg>
)

type LoadingState = {
  text: string
}

const LoaderCore = ({
  loadingStates,
  value = 0,
}: {
  loadingStates: LoadingState[]
  value?: number
}) => (
  <div className='flex relative justify-start max-w-xxl mx-auto flex-col mt-40'>
    {loadingStates.map((loadingState, index) => {
      const distance = Math.abs(index - value)
      const opacity = Math.max(1 - distance * 0.2, 0)

      return (
        <motion.div
          key={index}
          className='text-left flex gap-2 mb-4'
          initial={{ opacity: 0, y: -(value * 40) }}
          animate={{ opacity: opacity, y: -(value * 40) }}
          transition={{ duration: 0.5 }}
        >
          <div>
            {index > value ? (
              <CheckIcon className='text-white' />
            ) : (
              <CheckFilled
                className={cn(
                  'text-white',
                  value === index && 'dark:text-lime-500 opacity-100'
                )}
              />
            )}
          </div>
          <span
            className={cn(
              'text-white',
              value === index && 'dark:text-lime-500 opacity-100'
            )}
          >
            {loadingState.text}
          </span>
        </motion.div>
      )
    })}
  </div>
)

export const LoadingSequence = ({
  loadingStates,
  loading,
  duration = 3000,
  loop = false,
}: {
  loadingStates: LoadingState[]
  loading?: boolean
  duration?: number
  loop?: boolean
}) => {
  const [currentState, setCurrentState] = useState(0)
  const [show, setShow] = useState(loading)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentState((prevState) =>
        loop
          ? prevState === loadingStates.length - 1
            ? 0
            : prevState + 1
          : Math.min(prevState + 1, loadingStates.length - 1)
      )
    }, duration)

    return () => clearTimeout(timeout)
  }, [currentState, loading, loop, loadingStates.length, duration])

  useEffect(() => {
    if (!loading) {
      setCurrentState(0)
      setShow(false)
    }
    if (loading) setShow(true)
  }, [loading])

  return (
    <AnimatePresence mode='wait'>
      {show ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='w-full h-full fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-2xl px-4'
        >
          <div className='h-96 relative'>
            <LoaderCore value={currentState} loadingStates={loadingStates} />
          </div>
          <div className='bg-gradient-to-t inset-x-0 z-20 bottom-0 bg-black dark:bg-black h-full absolute [mask-image:radial-gradient(900px_at_center,transparent_30%,white)]' />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

const suggestions = [
  'Tell me about the Roswell incident.',
  `Give me the top 10 who's who of ufology?`,
  'How can I get into Ufology and remain attractive to the opposite sex?',
  'Who is the most credible key figure?',
  'What data is there on ancient artifacts as they relate to non-human intelligence?',
]

export function AiAssistedSearch() {
  const [initial, setInitial] = useState(true)
  const { status, messages, input, submitMessage, handleInputChange, append } =
    useAssistant({ api: '/api/assistants/disclosure/message' })

  const handleSelection = (suggestion: string) => {
    append({
      role: 'user',
      content: suggestion,
    })
    setInitial(false)
  }

  useEffect(() => {
    if ((messages.length && initial) || status === 'in_progress') {
      setInitial(false)
    }
  }, [messages, initial, status])

  const [dialogOpen, setDialogOpen] = useState(false)

  const handleDialogChange = useCallback(
    async (isOpen: boolean) => {
      if (!isOpen && messages?.length) {
        // await addConversationToDisclosureAssistantMemory({ messages })
      }
      setDialogOpen(isOpen)
    },
    [messages]
  )

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === 'k') {
        setDialogOpen((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const scrollRef: any = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages])

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={handleDialogChange}
      id='ai-search-interface'
    >
      <div className='h-12 w-12 center flex flex-col justify-center items-center transition-all duration-300 rounded-full overflow-hidden border bg-white dark:bg-black relative'>
        <DialogTrigger>
          <SearchIcon className='h-5 w-5 stroke-1' />
        </DialogTrigger>
      </div>
      <DialogPortal>
        <DialogOverlay className='fixed inset-0 z-50 bg-black/50' />
        <DialogContent className='fixed left-1/2 top-1/2 z-50 grid max-h-[85vh] w-auto max-w-xxl transform -translate-x-1/2 -translate-y-1/2 overflow-hidden border bg-black shadow-lg sm:rounded-lg'>
          <VisuallyHidden.Root>
            <DialogTitle>Get Weird With It</DialogTitle>
          </VisuallyHidden.Root>
          <div
            className={`border-b border-slate-200 flex ${initial ? 'flex-col' : 'flex-col-reverse'}`}
          >
            <form
              className='flex items-center absolute bottom-0 left-0 bg-black w-full z-50 py-4 border-t-neutral-300 border-t-2'
              onSubmit={submitMessage}
            >
              <VisuallyHidden.Root>
                <label htmlFor='search-modal'>
                  Ask Party Martian, the AI warden of Ultraterrestrial
                </label>
              </VisuallyHidden.Root>
              <SearchIcon className='ml-4 h-4 w-4 shrink-0 fill-slate-500' />
              <input
                id='search-modal'
                className='w-full appearance-none border-0 bg-black py-3 pl-2 pr-4 text-sm placeholder-slate-400 focus:outline-none'
                type='search'
                placeholder='Message'
                onChange={handleInputChange}
                value={input}
              />
              <Button type='submit' variant='ghost'>
                Send
              </Button>
            </form>

            <div className='prompt-ui-responses'>
              <ScrollArea.Root
                className='max-h-[calc(85vh-44px)] overflow-scroll'
                ref={scrollRef}
              >
                <ScrollArea.Viewport className='h-full w-full'>
                  <div className='space-y-4 px-2 py-4'>
                    {initial && (
                      <LoadingSequence
                        loadingStates={[
                          {
                            text: 'Consulting our proprietary Ufology expert: Party Martian. The Warden of Ultraterrestrial and dedicated steward of the Disclosure movement',
                          },
                          {
                            text: `Give it a second, we're literally calling Zeta Reticuli`,
                          },
                          {
                            text: 'I know, I know, why is an ET from Zeta Reticul called Party Martian? Why are native americans called Indians bro?',
                          },
                          { text: 'Make a snack' },
                        ]}
                        loading={status === 'in_progress'}
                      />
                    )}

                    {initial && (
                      <div>
                        <div className='mb-2 px-2 text-xs font-semibold uppercase text-white'>
                          Suggestions
                        </div>
                        <ul>
                          {suggestions.map((suggestion) => (
                            <SuggestedSearchItem
                              onClick={handleSelection}
                              key={suggestion}
                              value={suggestion}
                            />
                          ))}
                        </ul>
                        <Divider />
                      </div>
                    )}

                    {messages.length > 0 && (
                      <div className='flex flex-col p-2 gap-2 pb-8'>
                        {messages.map((message) => (
                          <Answer
                            key={message.id}
                            prompt={
                              message.role === 'user' ? message.content : null
                            }
                            answer={
                              message.role === 'assistant' ? (
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
                                    pre: (props) => {
                                      return (
                                        // @ts-ignore
                                        <div {...props} />
                                      )
                                    },
                                    code: (props) => {
                                      return (
                                        // @ts-ignore
                                        <p {...props} />
                                      )
                                    },
                                  }}
                                >
                                  {message.content}
                                </MemoizedMarkdown>
                              ) : null
                            }
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar
                  orientation='vertical'
                  className='flex h-full w-2 touch-none select-none border-l p-1'
                >
                  <ScrollArea.Thumb className='relative flex-1 rounded-full bg-slate-300' />
                </ScrollArea.Scrollbar>
                <ScrollArea.Scrollbar
                  orientation='horizontal'
                  className='flex h-2.5 touch-none select-none border-t p-1'
                >
                  <ScrollArea.Thumb className='relative flex-1 rounded-full bg-slate-300' />
                </ScrollArea.Scrollbar>
                <ScrollArea.Corner className='bg-black' />
              </ScrollArea.Root>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
