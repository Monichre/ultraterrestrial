'use client'
import * as React from 'react'

import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { ArrowLeftIcon, BookmarkIcon } from 'lucide-react'
import { useRef, useState, useEffect, useId } from 'react'
import { useClickOutside } from '@/hooks/useClickOutside'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Pencil2Icon } from '@radix-ui/react-icons'

const TRANSITION = {
  type: 'spring',
  bounce: 0.05,
  duration: 0.3,
}

export const AddNote = ({ saveNote, userNote }: any) => {
  const uniqueId = useId()
  const formContainerRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [noteTitle, setNoteTitle] = useState(userNote.title)
  const [note, setNote] = useState<null | string>(userNote.content)

  const handleSavingNote = () => {
    saveNote({ title: noteTitle, content: note })
  }
  const openMenu = () => {
    setIsOpen(true)
  }

  const closeMenu = () => {
    setIsOpen(false)
    setNote(null)
  }

  useClickOutside(formContainerRef, () => {
    closeMenu()
  })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <MotionConfig transition={TRANSITION}>
      <div className='relative flex items-center justify-center'>
        <motion.button
          key='button'
          layoutId={`popover-${uniqueId}`}
          // className='flex h-9 items-center border border-zinc-950/10 px-3 text-zinc-950 dark:border-zinc-50/10 '

          onClick={openMenu}
        >
          <motion.span
            layoutId={`popover-label-${uniqueId}`}
            className='text-sm'
          >
            <Button variant='ghost' size='icon'>
              <Pencil2Icon className='h-5 w-5 text-white stroke-1' />
            </Button>
          </motion.span>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={formContainerRef}
              layoutId={`popover-${uniqueId}`}
              className='absolute z-50 h-[250px] w-[364px] overflow-hidden outline-none dark:bg-black border border-white/60 dark:border-white/30 rounded-[calc(var(--radius))] text-white bottom-0 left-auto '
              style={{
                borderRadius: 12,
              }}
            >
              <motion.span
                layoutId={`popover-label-${uniqueId}`}
                aria-hidden='true'
                style={{
                  opacity: note ? 0 : 1,
                }}
                className='absolute right-2 top-2 select-none text-sm text-white'
              >
                Note
              </motion.span>
              <form
                className='flex h-full flex-col relative p-2'
                onSubmit={saveNote}
              >
                <input
                  className='w-full h-auto resize-none rounded-md bg-transparent text-sm outline-none !border-none'
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  placeholder='Title'
                />

                <Textarea
                  className='h-auto h-min-[180px] w-full resize-none rounded-md bg-transparent text-sm outline-none !border-none grow'
                  autoFocus
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder='Note content'
                />
                <div
                  key='close'
                  className='flex justify-between justify-self-end'
                >
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={closeMenu}
                    aria-label='Close popover'
                  >
                    <ArrowLeftIcon
                      size={16}
                      className='text-zinc-900 dark:text-zinc-100'
                    />
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    className=''
                    // className='relative ml-1 flex h-8 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 bg-transparent px-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:text-zinc-50 dark:hover:bg-zinc-800'
                    type='button'
                    aria-label='Submit note'
                    onClick={() => {
                      handleSavingNote()
                      closeMenu()
                    }}
                  >
                    <span>Save</span>
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  )
}

// export function Component() {
//   return (
//     <div className="grid aspect-video w-full max-w-md justify-center text-foreground md:grid-cols-2 [&>div]:relative [&>div]:flex [&>div]:h-[137px] [&>div]:w-[224px] [&>div]:items-center [&>div]:justify-center [&>div]:p-4">
//       <div>
//         <div className="absolute left-[-35px] top-[45px] z-10 text-sm font-medium">
//           Label
//         </div>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 193 40"
//           width="50"
//           height="12"
//           fill="none"
//           className="absolute left-[5px] top-[50px] z-10"
//         >
//           <g clip-path="url(#a)">
//             <path
//               fill="currentColor"
//               d="M173.928 21.13C115.811 44.938 58.751 45.773 0 26.141c4.227-4.386 7.82-2.715 10.567-1.88 21.133 5.64 42.9 6.266 64.457 7.101 31.066 1.253 60.441-5.848 89.183-17.335 1.268-.418 2.325-1.253 4.861-2.924-14.582-2.924-29.165 2.089-41.845-3.76.212-.835.212-1.879.423-2.714 9.51-.627 19.231-1.253 28.742-2.089 9.51-.835 18.808-1.88 28.318-2.506 6.974-.418 9.933 2.924 7.397 9.19-3.17 8.145-7.608 15.664-11.623 23.391-.423.836-1.057 1.88-1.902 2.298-2.325.835-4.65 1.044-7.186 1.67-.422-2.088-1.479-4.386-1.268-6.265.423-2.506 1.902-4.595 3.804-9.19Z"
//             />
//           </g>
//           <defs>
//             <clipPath id="a">
//               <path fill="currentColor" d="M0 0h193v40H0z" />
//             </clipPath>
//           </defs>
//         </svg>
//         <TooltipDemo
//           label="Page Views"
//           payload={[
//             { name: "Desktop", value: 186, fill: "hsl(var(--chart-1))" },
//             { name: "Mobile", value: 80, fill: "hsl(var(--chart-2))" },
//           ]}
//           className="w-[8rem]"
//         />
//       </div>
//       <div className="items-end">
//         <div className="absolute left-[122px] top-[0px] z-10 text-sm font-medium">
//           Name
//         </div>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="35"
//           height="42"
//           fill="none"
//           viewBox="0 0 122 148"
//           className="absolute left-[85px] top-[10px] z-10 -scale-x-100"
//         >
//           <g clip-path="url(#ab)">
//             <path
//               fill="currentColor"
//               d="M0 2.65c6.15-4.024 12.299-2.753 17.812-.847a115.56 115.56 0 0 1 21.84 10.59C70.4 32.727 88.849 61.744 96.483 97.54c1.908 9.108 2.544 18.639 3.817 29.017 8.481-4.871 12.934-14.402 21.416-19.909 1.061 4.236-1.06 6.989-2.756 9.319-6.998 9.531-14.207 19.062-21.63 28.382-3.604 4.448-6.36 4.871-10.177 1.059-8.058-7.837-12.935-17.368-14.42-28.382 0-.424.636-1.059 1.485-2.118 9.118 2.33 6.997 13.979 14.843 18.215 3.393-14.614.848-28.593-2.969-42.149-4.029-14.19-9.33-27.746-17.812-39.82-8.27-11.86-18.66-21.392-30.11-30.287C26.93 11.758 14.207 6.039 0 2.65Z"
//             />
//           </g>
//           <defs>
//             <clipPath id="ab">
//               <path fill="currentColor" d="M0 0h122v148H0z" />
//             </clipPath>
//           </defs>
//         </svg>
//         <TooltipDemo
//           label="Browser"
//           hideLabel
//           payload={[
//             { name: "Chrome", value: 1286, fill: "hsl(var(--chart-3))" },
//             { name: "Firefox", value: 1000, fill: "hsl(var(--chart-4))" },
//           ]}
//           indicator="dashed"
//           className="w-[8rem]"
//         />
//       </div>
//       <div className="!hidden md:!flex">
//         <TooltipDemo
//           label="Page Views"
//           payload={[
//             { name: "Desktop", value: 12486, fill: "hsl(var(--chart-3))" },
//           ]}
//           className="w-[9rem]"
//           indicator="line"
//         />
//       </div>
//       <div className="!items-start !justify-start">
//         <div className="absolute left-[50px] top-[60px] z-10 text-sm font-medium">
//           Indicator
//         </div>
//         <TooltipDemo
//           label="Browser"
//           hideLabel
//           payload={[
//             { name: "Chrome", value: 1286, fill: "hsl(var(--chart-1))" },
//           ]}
//           indicator="dot"
//           className="w-[8rem]"
//         />
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="15"
//           height="34"
//           fill="none"
//           viewBox="0 0 75 175"
//           className="absolute left-[30px] top-[38px] z-10 rotate-[-40deg]"
//         >
//           <g clip-path="url(#abc)">
//             <path
//               fill="currentColor"
//               d="M20.187 175c-4.439-2.109-7.186-2.531-8.032-4.008-3.17-5.484-6.763-10.968-8.454-17.084-5.073-16.242-4.439-32.694-1.057-49.146 5.707-28.053 18.388-52.942 34.24-76.565 1.692-2.531 3.171-5.063 4.862-7.805 0-.21-.211-.632-.634-1.265-4.65 1.265-9.511 2.53-14.161 3.585-2.537.422-5.496.422-8.032-.421-1.48-.422-3.593-2.742-3.593-4.219 0-1.898 1.48-4.218 2.747-5.906 1.057-1.054 2.96-1.265 4.65-1.687C35.406 7.315 48.088 3.729 60.98.776c10.99-2.53 14.584 1.055 13.95 11.812-.634 11.18-.846 22.358-1.268 33.326-.212 3.375-.846 6.96-1.268 10.757-8.878-4.007-8.878-4.007-12.048-38.177C47.03 33.259 38.153 49.289 29.91 65.741 21.667 82.193 16.17 99.49 13.212 117.84c-2.959 18.984.634 36.912 6.975 57.161Z"
//             />
//           </g>
//           <defs>
//             <clipPath id="abc">
//               <path fill="currentColor" d="M0 0h75v175H0z" />
//             </clipPath>
//           </defs>
//         </svg>
//       </div>
//     </div>
//   )
// }

// function TooltipDemo({
//   indicator = "dot",
//   label,
//   payload,
//   hideLabel,
//   hideIndicator,
//   className,
// }: {
//   label: string
//   hideLabel?: boolean
//   hideIndicator?: boolean
//   indicator?: "line" | "dot" | "dashed"
//   payload: {
//     name: string
//     value: number
//     fill: string
//   }[]
//   nameKey?: string
//   labelKey?: string
// } & React.ComponentProps<"div">) {
//   const tooltipLabel = hideLabel ? null : (
//     <div className="font-medium">{label}</div>
//   )

//   if (!payload?.length) {
//     return null
//   }

//   const nestLabel = payload.length === 1 && indicator !== "dot"

//   return (
//     <div
//       className={cn(
//         "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl transition-all ease-in-out hover:-translate-y-0.5",
//         className
//       )}
//     >
//       {!nestLabel ? tooltipLabel : null}
//       <div className="grid gap-1.5">
//         {payload.map((item, index) => {
//           const indicatorColor = item.fill

//           return (
//             <div
//               key={index}
//               className={cn(
//                 "flex w-full items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
//                 indicator === "dot" && "items-center"
//               )}
//             >
//               <>
//                 {!hideIndicator && (
//                   <div
//                     className={cn(
//                       "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
//                       {
//                         "h-2.5 w-2.5": indicator === "dot",
//                         "w-1": indicator === "line",
//                         "w-0 border-[1.5px] border-dashed bg-transparent":
//                           indicator === "dashed",
//                         "my-0.5": nestLabel && indicator === "dashed",
//                       }
//                     )}
//                     style={
//                       {
//                         "--color-bg": indicatorColor,
//                         "--color-border": indicatorColor,
//                       } as React.CSSProperties
//                     }
//                   />
//                 )}
//                 <div
//                   className={cn(
//                     "flex flex-1 justify-between leading-none",
//                     nestLabel ? "items-end" : "items-center"
//                   )}
//                 >
//                   <div className="grid gap-1.5">
//                     {nestLabel ? tooltipLabel : null}
//                     <span className="text-muted-foreground">{item.name}</span>
//                   </div>
//                   <span className="font-mono font-medium tabular-nums text-foreground">
//                     {item.value.toLocaleString()}
//                   </span>
//                 </div>
//               </>
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   )
// }
