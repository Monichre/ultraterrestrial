'use client'

import rehypeExternalLinks from 'rehype-external-links'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import * as Dialog from '@radix-ui/react-dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import * as ScrollArea from '@radix-ui/react-scroll-area'
// import { useCompletion } from 'ai/react'
import { useActions } from 'ai/rsc'
import {
  submitMessage,
  type ClientMessage,
} from '@/app/actions/assistant/actions'
import { SearchIcon } from 'lucide-react'
import { Button } from '@/components/ui/button/button'
import { Divider } from '@/features/user/note/ui/PopoverMenu'
import { Message, useAssistant } from 'ai/react'
import { inputRegex } from '@tiptap/extension-highlight'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/utils'
import { MemoizedMarkdown } from '@/features/ai/markdown'

// import { useCompletion } from 'ai/react';

const CheckIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={cn('w-6 h-6 ', className)}
    >
      <path d='M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
    </svg>
  )
}

const CheckFilled = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor'
      className={cn('w-6 h-6 ', className)}
    >
      <path
        fillRule='evenodd'
        d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z'
        clipRule='evenodd'
      />
    </svg>
  )
}

type LoadingState = {
  text: string
}

const LoaderCore = ({
  loadingStates,
  value = 0,
}: {
  loadingStates: LoadingState[]
  value?: number
}) => {
  return (
    <div className='flex relative justify-start max-w-xl mx-auto flex-col mt-40'>
      {loadingStates.map((loadingState, index) => {
        const distance = Math.abs(index - value)
        const opacity = Math.max(1 - distance * 0.2, 0) // Minimum opacity is 0, keep it 0.2 if you're sane.

        return (
          <motion.div
            key={index}
            className={cn('text-left flex gap-2 mb-4')}
            initial={{ opacity: 0, y: -(value * 40) }}
            animate={{ opacity: opacity, y: -(value * 40) }}
            transition={{ duration: 0.5 }}
          >
            <div>
              {index > value && (
                <CheckIcon className='text-black dark:text-white' />
              )}
              {index <= value && (
                <CheckFilled
                  className={cn(
                    'text-black dark:text-white',
                    value === index &&
                      'text-black dark:text-lime-500 opacity-100'
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                'text-black dark:text-white',
                value === index && 'text-black dark:text-lime-500 opacity-100'
              )}
            >
              {loadingState.text}
            </span>
          </motion.div>
        )
      })}
    </div>
  )
}

export const LoadingSequence = ({
  loadingStates,
  loading,
  duration = 2000,
  loop = true,
}: {
  loadingStates: LoadingState[]
  loading?: boolean
  duration?: number
  loop?: boolean
}) => {
  const [currentState, setCurrentState] = useState(0)

  useEffect(() => {
    if (!loading) {
      setCurrentState(0)
      return
    }
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
  return (
    <AnimatePresence mode='wait'>
      {loading && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className='w-full h-full fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-2xl'
        >
          <div className='h-96  relative'>
            <LoaderCore value={currentState} loadingStates={loadingStates} />
          </div>

          <div className='bg-gradient-to-t inset-x-0 z-20 bottom-0 bg-white dark:bg-black h-full absolute [mask-image:radial-gradient(900px_at_center,transparent_30%,white)]' />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const suggestions = [
  'Tell me about the Roswell incident.',
  `Give me the top 10 who's who of ufology?`,
  'How can I get into Ufology and remain attractive to the opposite sex?',
  'Who is the most credible key figure?',
  'What data is there on ancient artifacts as they related to non human intelligence?',
  'Is it true that your dick is green?',
]

export const SuggestedSearchItem = ({ value, onClick }: any) => {
  const handleClick = () => {
    onClick(value)
  }
  return (
    <li onClick={handleClick}>
      <span className='flex items-center rounded-lg px-2 py-1 text-sm leading-6 text-slate-700 outline-none focus-within:bg-slate-100 hover:bg-slate-100'>
        <svg
          className='w-4 h-4'
          viewBox='0 0 82 84'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M41.5816 1.21606C39.7862 5.82482 40.3852 10.0977 40.5593 14.9633C40.7854 21.2812 40.9774 27.5593 41.4363 33.8661'
            stroke='currentColor'
            stroke-width='1.90596'
            stroke-linecap='round'
          />
          <path
            d='M41.0651 45.1798C39.7505 51.5096 40.3418 57.6794 40.8893 64.0791C41.4093 70.1568 42.1389 76.2117 42.8566 82.2682'
            stroke='currentColor'
            stroke-width='1.90596'
            stroke-linecap='round'
          />
          <path
            d='M1.13413 46.6647C5.16696 44.8703 8.96881 44.7974 13.3092 44.5029C19.8761 44.0572 26.2025 43.2089 32.656 41.952'
            stroke='currentColor'
            stroke-width='1.90596'
            stroke-linecap='round'
          />
          <path
            d='M47.2629 40.0959C58.4139 39.3819 69.3895 37.5305 80.4472 35.9965'
            stroke='currentColor'
            stroke-width='1.90596'
            stroke-linecap='round'
          />
          <path
            d='M49.3429 34.6508L52.917 28.1667'
            stroke='currentColor'
            stroke-width='1.90596'
            stroke-linecap='round'
          />
          <path
            d='M32.9786 50.3504L28.6387 54.6391'
            stroke='currentColor'
            stroke-width='1.90596'
            stroke-linecap='round'
          />
          <path
            d='M52.6361 48.6656L56.9506 51.5758'
            stroke='currentColor'
            stroke-width='1.90596'
            stroke-linecap='round'
          />
          <path
            d='M31.549 30.8471C26.8741 29.4323 22.7143 27.3543 18.2738 25.3586'
            stroke='currentColor'
            stroke-width='1.90596'
            stroke-linecap='round'
          />
        </svg>
        <span className='inline-block ml-2'>{value}</span>
      </span>
    </li>
  )
}

export function Search() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  // const [query, setQuery]: any = useState('')

  // const [messages, setMessages] = useState<ClientMessage[]>([])
  const {
    status,
    error,
    messages,
    input,
    submitMessage,
    handleInputChange,
    append,
  } = useAssistant({ api: '/api/assistants/disclosure/message' })
  console.log('messages: ', messages)
  // const { handleSubmitMessage } = useActions()
  // handleClick
  // submitMessage

  // const handleSubmission = async () => {
  //   // setMessages((currentMessages) => [
  //   //   ...currentMessages,
  //   //   {
  //   //     id: '123',
  //   //     status: 'user.message.created',
  //   //     text: query,
  //   //     gui: null,
  //   //   },
  //   // ])

  //   const response = await submitMessage(query)
  //   console.log('response: ', response)
  //   setMessages((currentMessages) => [...currentMessages, response])
  //   // setQuery('')
  // }
  const handleSelection = (suggestion: string) => {
    console.log('suggestion: ', suggestion)
    append({
      role: 'user',
      content: suggestion,
    })
  }
  // const onChange = (event: any) => {
  //   setQuery(event.target.value)
  // }
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // event.preventDefault()
      if (event.key === '/' && !isOpen) {
        event.preventDefault()
        setIsOpen(true)
      }
      if (event.metaKey && event.key === 'k') {
        setIsOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      // setQuery('')
    }
  }, [isOpen])

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <div className='text-center'>
        <Dialog.Trigger asChild>
          {/* border border-slate-300 bg-white py-3.5 pl-4 pr-3 text-sm text-slate-400 outline-none hover:border-slate-400 focus-visible:border-indigo-400 focus-visible:bg-white  */}
          <button className='relative inline-flex w-[300px] rounded-full max-w-xs items-center justify-between whitespace-nowrap border-slate-300 bg-black py-3.5 pl-4 pr-3 text-sm border border-neutral-700/80 text-neutral-500 bg-gradient-to-b from-card/70 rounded-[calc(var(--radius)-2px)] focus-visible:ring-2 focus-visible:ring-indigo-100'>
            <div className='flex items-center justify-center'>
              <SearchIcon className='h-5 w-5 stroke-1' />
              <span className='font-jetbrains tracking-wider text-white inline-block ml-4'>
                Search
              </span>
            </div>
            <div className='ml-3 flex gap-1'>
              <div className='flex h-6 w-6 items-center justify-center rounded bg-black text-black-400 shadow-sm'>
                <svg
                  className='fill-current'
                  xmlns='http://www.w3.org/2000/svg'
                  width={11}
                  height={12}
                  fill='none'
                >
                  <path d='M2.277 11.224c-.418 0-.799-.101-1.143-.303a2.343 2.343 0 0 1-.826-.826A2.208 2.208 0 0 1 0 8.952c0-.421.103-.804.308-1.148.206-.345.48-.62.826-.826a2.191 2.191 0 0 1 1.143-.308h1.034V5.139H2.277c-.418 0-.799-.101-1.143-.304a2.357 2.357 0 0 1-.826-.82A2.2 2.2 0 0 1 0 2.867c0-.418.103-.799.308-1.144.206-.344.48-.618.826-.82A2.191 2.191 0 0 1 2.277.595c.418 0 .799.102 1.143.308.345.202.62.476.826.82.209.345.313.726.313 1.144v1.029h1.526v-1.03c0-.417.101-.798.303-1.143.206-.344.481-.618.826-.82A2.2 2.2 0 0 1 8.362.595c.418 0 .799.102 1.144.308.344.202.618.476.82.82.205.345.308.726.308 1.144a2.2 2.2 0 0 1-.308 1.148c-.206.342-.48.615-.825.82-.342.203-.721.304-1.139.304H7.333V6.67h1.03c.417 0 .796.103 1.138.308.344.206.62.48.825.826a2.2 2.2 0 0 1 .308 1.148c0 .414-.103.795-.308 1.143-.206.345-.48.62-.825.826-.342.202-.721.303-1.139.303-.42 0-.804-.101-1.148-.303a2.344 2.344 0 0 1-.826-.826 2.236 2.236 0 0 1-.303-1.143v-1.04H4.56v1.04c0 .414-.104.795-.313 1.143-.206.345-.48.62-.826.826a2.218 2.218 0 0 1-1.143.303Zm0-1.243a1.045 1.045 0 0 0 .895-.512.991.991 0 0 0 .14-.517v-1.04H2.276a.965.965 0 0 0-.517.145c-.156.093-.28.217-.373.373a1 1 0 0 0-.14.522c0 .189.046.361.135.517.093.156.217.28.373.373.16.093.333.14.522.14Zm0-6.085h1.034v-1.03a.975.975 0 0 0-.14-.516 1.045 1.045 0 0 0-.894-.512.991.991 0 0 0-.517.139c-.156.093-.28.217-.373.373a.975.975 0 0 0-.14.517c0 .189.046.363.135.522.093.156.217.28.373.373.16.09.333.134.522.134Zm5.056 0h1.03c.188 0 .36-.045.516-.134.156-.093.279-.217.368-.373a1 1 0 0 0 .14-.522.975.975 0 0 0-.14-.517 1.018 1.018 0 0 0-.885-.512 1 1 0 0 0-.522.139 1.002 1.002 0 0 0-.507.89v1.029Zm1.03 6.085a1.018 1.018 0 0 0 .885-.512.991.991 0 0 0 .138-.517 1 1 0 0 0-.139-.522 1.018 1.018 0 0 0-.368-.373.965.965 0 0 0-.517-.144H7.333v1.039c0 .189.045.361.134.517.093.156.217.28.373.373a1 1 0 0 0 .522.14ZM4.558 6.67h1.526V5.139H4.56V6.67Z' />
                </svg>
              </div>
              <div className='flex h-6 w-6 items-center justify-center rounded bg-black text-slate-400 shadow-sm'>
                <svg
                  className='fill-current'
                  xmlns='http://www.w3.org/2000/svg'
                  width={8}
                  height={9}
                  fill='none'
                >
                  <path d='M0 8.727V0h1.581v4.01h.107L5.091 0h1.93L3.649 3.916l3.405 4.811H5.152L2.548 4.986l-.967 1.142v2.6H0Z' />
                </svg>
              </div>
            </div>
          </button>
        </Dialog.Trigger>
      </div>
      <Dialog.Portal>
        <Dialog.Overlay className='data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50' />
        <Dialog.Content className='data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 grid max-h-[85vh] w-[90vw] max-w-lg translate-x-[-50%] translate-y-[-50%] overflow-hidden border bg-white shadow-lg duration-200 sm:rounded-lg'>
          <VisuallyHidden.Root>
            <Dialog.Title>Search</Dialog.Title>
            <Dialog.Description>
              Start typing to search the documentation
            </Dialog.Description>
          </VisuallyHidden.Root>
          <div className='border-b border-slate-200'>
            <form className='flex items-center' onSubmit={submitMessage}>
              <VisuallyHidden.Root>
                <label htmlFor='search-modal'>
                  Ask Party Martian, the AI warden of Ultraterrestrial
                </label>
              </VisuallyHidden.Root>
              <svg
                className='ml-4 h-4 w-4 shrink-0 fill-slate-500'
                width='16'
                height='16'
                viewBox='0 0 16 16'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='m14.707 13.293-1.414 1.414-2.4-2.4 1.414-1.414 2.4 2.4ZM6.8 12.6A5.8 5.8 0 1 1 6.8 1a5.8 5.8 0 0 1 0 11.6Zm0-2a3.8 3.8 0 1 0 0-7.6 3.8 3.8 0 0 0 0 7.6Z' />
              </svg>
              <input
                id='search-modal'
                className='[&::-webkit-search-decoration]:none [&::-webkit-search-results-button]:none [&::-webkit-search-results-decoration]:none [&::-webkit-search-cancel-button]:hidden w-full appearance-none border-0 bg-white py-3 pl-2 pr-4 text-sm placeholder-slate-400 text-black focus:outline-none'
                type='search'
                placeholder='Search'
                onChange={handleInputChange}
                value={input}
                // onKeyDown={(event) => {
                //   if (event.key === 'Enter') {
                //     submitMessage()
                //   }
                // }}
              />
              <Button type='submit' variant='ghost'>
                Send
              </Button>
            </form>
          </div>

          <ScrollArea.Root className='max-h-[calc(85vh-44px)]'>
            <ScrollArea.Viewport className='h-full w-full'>
              <div className='space-y-4 px-2 py-4'>
                <div>
                  <div className='p-2'>status: {status}</div>
                  {status === 'in_progress' ? (
                    <LoadingSequence
                      loadingStates={[
                        {
                          text: 'Consulting Party Martian, Warden of Ultraterrestrial...',
                        },
                        {
                          text: `Give it a second, we're literally calling Zeta Reticuli`,
                        },
                        {
                          text: 'I know, I know, why is an ET from Zeta Reticul called Party Martian? Why are native americans called Indians bro?',
                        },
                        { text: 'Make a snack' },
                      ]}
                    />
                  ) : (
                    <div>
                      <div className='mb-2 px-2 text-xs font-semibold uppercase text-gray-400'>
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

                  {messages?.length && (
                    <div className='flex flex-col p-2 gap-2'>
                      {messages.map((message: Message) => {
                        if (message.role === 'assistant') {
                          return (
                            <MemoizedMarkdown
                              rehypePlugins={[
                                [rehypeExternalLinks, { target: '_blank' }],
                              ]}
                              remarkPlugins={[remarkGfm]}
                              className='prose-sm prose-neutral prose-a:text-accent-foreground/50'
                              components={{
                                code({
                                  node,
                                  inline,
                                  className,
                                  children,
                                  ...props
                                }: any) {
                                  if (children.length) {
                                    if (children[0] == '▍') {
                                      return (
                                        <span className='mt-1 cursor-default animate-pulse'>
                                          ▍
                                        </span>
                                      )
                                    }

                                    children[0] = (
                                      children[0] as string
                                    ).replace('`▍`', '▍')
                                  }

                                  const match = /language-(\w+)/.exec(
                                    className || ''
                                  )

                                  if (inline) {
                                    return (
                                      <code className={className} {...props}>
                                        {children}
                                      </code>
                                    )
                                  }

                                  return null
                                },
                              }}
                            >
                              {message.content}
                            </MemoizedMarkdown>
                          )
                        }
                        return (
                          <div key={message.id} className='flex flex-row gap-2'>
                            <div className='w-24 text-black-500'>{`${message.role}: `}</div>
                            <div className='w-full text-black'>
                              {message.content}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              className='flex h-full w-2 touch-none select-none border-l border-l-transparent p-[1px] transition-colors'
              orientation='vertical'
            >
              <ScrollArea.Thumb className='relative flex-1 rounded-full bg-slate-300' />
            </ScrollArea.Scrollbar>
            <ScrollArea.Scrollbar
              className='flex h-2.5 touch-none select-none flex-col border-t border-t-transparent p-[1px] transition-colors'
              orientation='horizontal'
            >
              <ScrollArea.Thumb className='relative flex-1 rounded-full bg-slate-300' />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner className='bg-blackA5' />
          </ScrollArea.Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
