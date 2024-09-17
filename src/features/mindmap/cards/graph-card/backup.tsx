'use client'

// import { createUserSavedEvent } from '@/app/actions/user/create-user-saved-event'

import {
  Dialog,
  DialogClose,
  DialogContainer,
  DialogContent,
  DialogImage,
  DialogSubtitle,
  DialogTitle,
  DialogTrigger,
} from '@/components/animated/core/dialog'
import { searchConnections } from '@/features/ai/search'
import { EntityCardUtilityMenu } from '@/features/mindmap/cards/entity-card'
import { DOMAIN_MODEL_COLORS, objectMapToSingular, truncate } from '@/utils'
import { useAuth } from '@clerk/nextjs'
import { ScrollArea } from '@radix-ui/react-scroll-area'

import { AnimatePresence, motion } from 'framer-motion'

import { useState, useEffect, useCallback } from 'react'

import { ConnectionList } from '@/features/mindmap/connection-list'
import { HoverExpandButton } from '@/features/user/note/ui/Button'
import { ShinyButton } from '@/components/ui/button'
import { useMindMap } from '@/providers'

const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

export function GraphCard({ data, id, ...rest }: any) {
  const { addChildNodesFromSearch, addConnectionNodesFromSearch } = useMindMap()
  const node: any = {
    ...data,
    id,
  }
  const {
    description,
    latitude,
    location,
    longitude,
    photos,
    photo,
    name,
    role,
    color,
    type,
    label,
    fill,
  } = node
  const date = dayjs(data?.date).format('MMM DD, YYYY')
  const image: any = photos?.length
    ? photos[0]
    : photo?.length
      ? photo[0]
      : { url: '/foofighters.webp', signedUrl: '/foofighters.webp' }

  image.src - image.url

  // const [animatedTitle, setAnimatedTitle] = useState<string>('')
  // const [animatedDate, setAnimatedDate] = useState<string>('')
  // const [titleFinished, setTitleFinished] = useState(false)
  // const [t, setT] = useState<number>(0)
  // const [i, setI] = useState<number>(0)

  // useEffect(() => {
  //   const typingEffect = setInterval(() => {
  //     if (t < name.length) {
  //       setAnimatedTitle(name.substring(0, t + 1))
  //       setT(t + 1)
  //     } else {
  //       clearInterval(typingEffect)

  //       setTitleFinished(true)
  //     }
  //   }, 100)

  //   return () => {
  //     clearInterval(typingEffect)
  //   }
  // }, [name, t])

  // useEffect(() => {
  //   const typingEffectTwo = setInterval(() => {
  //     if (titleFinished) {
  //       if (i < date.length) {
  //         setAnimatedDate(date.substring(0, i + 1))
  //         setI(i + 1)
  //       } else {
  //         clearInterval(typingEffectTwo)
  //       }
  //     }
  //   }, 100)

  //   return () => {
  //     clearInterval(typingEffectTwo)
  //   }
  // }, [date, date.length, i, name, t, titleFinished])

  const [userNote, setUserNote] = useState({
    title: '',
    content: '',
  })
  console.log('userNote: ', userNote)
  const saveNote = ({ title, content }: any) => {
    setUserNote({ title, content })
  }

  const { userId, sessionId, isLoaded }: any = useAuth()
  const [relatedDataPoints, setRelatedDataPoints]: any = useState(null)
  console.log('relatedDataPoints: ', relatedDataPoints)

  const searchRelatedDataPoints = useCallback(async () => {
    const payload = await searchConnections({
      id,
      type,
    })

    setRelatedDataPoints(payload.data)
  }, [id, type])

  const findConnectedNodes = async () => {
    // const payload = await searchAndEnrichConnections({
    //   subject: node,
    //   type,
    // })
    const payload = await searchConnections({
      id,
      type,
    })
    const searchResults = payload.data
    console.log('searchResults: ', searchResults)
    const res = addConnectionNodesFromSearch({ source: node, searchResults })
    // const nodeConnections = connections.map((connection: any) => {
    //   console.log('connection: ', connection)
    //   const { type = null, ...rest } = connection
    //   if (type && id) {
    //     const result = addChildNodesFromSearch({
    //       type,
    //       searchResults: [connection],
    //     })
    //     console.log('result: ', result)
    //   }
    // })
    console.log('res: ', res)
  }

  const [bookmarked, setBookmarked] = useState(false)

  const handleSave = async () => {
    setBookmarked(true)
    // const model = objectMapToSingular[node?.type]
    // console.log('model: ', model)
    // const saved = await createUserSavedEvent({
    //   userId,
    //   event: node.id,
    //   userNote,
    // })
    // console.log('saved: ', saved)
    // #TODO: Run some save logic (BIG ASK. Loaded Feature with zero configuration in place)
  }
  {
    /* <div class="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div> */
  }

  const [showMenu, setShowMMenu] = useState(false)
  const handleHoverEnter = () => {
    console.log('hovering')
    setShowMMenu(true)
  }
  const handleHoverLeave = () => {
    setShowMMenu(false)
  }

  const modelColor = DOMAIN_MODEL_COLORS[type]
  // ;<button className='group relative grid overflow-hidden rounded-full px-4 py-1 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200'>
  //   <span>
  //     <span className="spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
  //   </span>
  //   <span className='backdrop absolute inset-[1px] rounded-full bg-neutral-950 transition-colors duration-200 group-hover:bg-neutral-800' />
  //   <span className='z-10 py-0.5 text-sm text-neutral-100'>Get notified</span>
  // </button>
  // {
  //   /* <div
  //   className={`absolute -inset-2 rounded-lg bg-gradient-to-r from-[#78efff] via-[#E393E6] to-[${color}] opacity-75 blur`}
  // ></div> */
  // }

  return (
    <>
      <div
        className={`absolute -inset-2 rounded-lg bg-gradient-to-r from-[#78efff] via-[#E393E6] to-[${color}] opacity-50 blur w-full h-full`}
      ></div>

      <div
        className={`relative z-50 w-content h-content rounded-[calc(var(--radius)-2px)] p-[1px] bg-black`}
        style={{ border: `1px solid ${color}` }}
        onMouseEnter={handleHoverEnter}
        onMouseLeave={handleHoverLeave}
      >
        <AnimatePresence>
          {showMenu && (
            <motion.div
              className='flex justify-center items-center left-[40%] absolute bg-black'
              animate={{ opacity: 1, top: -50 }}
              initial={{ opacity: 0, top: 50 }}
              exit={{ opacity: 0, top: 50 }}
            >
              <EntityCardUtilityMenu
                handleSave={handleSave}
                saveNote={saveNote}
                userNote={userNote}
                bookmarked={bookmarked}
                findConnectedNodes={findConnectedNodes}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <Dialog
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 24,
          }}
        >
          <DialogTrigger
            style={{
              borderRadius: '4px',
            }}
            className='dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] px-4 py-4'
          >
            <div
              className={`relative w-full h-full px-4`}
              style={{ borderLeft: `1px solid ${modelColor}` }}
            >
              <div
                className={`flex w-full justify-start align-middle items-center center-content relative `}
              >
                {type === 'personnel' && (
                  <DialogImage
                    src={image.url || image.src}
                    alt='What I Talk About When I Talk About Running - book cover'
                    className='h-12 w-12 object-cover object-center'
                    style={{
                      borderRadius: '4px',
                    }}
                  />
                )}
                <DialogTitle className='flex w-full justify-between align-middle items-center center-content'>
                  <h2 className='text-white font-centimaSans text-xl whitespace-normal w-content'>
                    {name}
                  </h2>
                  <p className='date text-1xl text-[#78efff] text-uppercase font-centimaSans tracking-wider w-content'>
                    {date}
                  </p>
                </DialogTitle>
              </div>

              <DialogSubtitle className='my-3'>
                <p className='font-jetbrains text-white tracking-wider '>
                  {node?.location || role}
                </p>
                {/* text-[10px] text-gray-600 sm:text-xs */}
              </DialogSubtitle>
            </div>
          </DialogTrigger>

          <DialogContainer>
            <DialogContent
              style={{
                borderRadius: '12px',
              }}
              className='relative h-[95vh] w-[80vw] bg-black overflow-scroll shadow-2xl shadow-blue-500/20 transition-all duration-1000'
            >
              <ScrollArea className='h-full overflow-scroll' type='scroll'>
                <div className='relative p-6'>
                  <div className='flex justify-center py-10'>
                    <DialogImage
                      src={image.url || image.src}
                      alt='What I Talk About When I Talk About Running - book cover'
                      className='h-auto w-auto'
                    />
                  </div>
                  <div className='relative h-auto'>
                    <div className='flex w-full justify-between'>
                      <DialogTitle className='text-white font-centimaSans tracking-wider uppercase'>
                        {name}
                      </DialogTitle>
                      <div className='flex justify-end'>
                        <ShinyButton onClick={searchRelatedDataPoints}>
                          Connections
                        </ShinyButton>
                        <EntityCardUtilityMenu
                          handleSave={handleSave}
                          userNote={userNote}
                          saveNote={saveNote}
                          bookmarked={bookmarked}
                        />
                      </div>
                    </div>
                    <DialogSubtitle>
                      <p className='font-light text-[#78efff] font-centimaSans tracking-wider mt-2 text-sm'>
                        {date}
                      </p>
                      <p className='font-light text-[#78efff] font-centimaSans tracking-wider mt-2 text-sm'>
                        {location}
                      </p>
                      <p className='font-light text-[#78efff] font-centimaSans tracking-wider mt-2 text-sm'>
                        {latitude}, {longitude}
                      </p>
                    </DialogSubtitle>

                    <div className='mt-4 text-sm text-white font-jetbrains'>
                      <p>{truncate(node?.description, 400)}</p>
                    </div>
                  </div>
                  {relatedDataPoints && (
                    <ConnectionList
                      originalNode={node}
                      connections={relatedDataPoints}
                    />
                  )}
                  {/* <div className='w-full flex justify-end items-center '>
                   
                  </div> */}
                </div>
              </ScrollArea>
              <DialogClose className='text-zinc-500' />
            </DialogContent>
          </DialogContainer>
        </Dialog>
      </div>
    </>
  )
}

// <div>
//   <style
//     dangerouslySetInnerHTML={{
//       __html: "@media (max-width: 767px) {\n/* DivMagic Note: Tailwind does not support max-width. We will fix this soon. */\n\n#div-1 {\nposition: absolute !important; top: 0px !important; left: 100% !important; height: auto !important; width: 100% !important;\n}\n#div-2 {\nbottom: 28px !important; left: 1rem !important; max-width: calc(100% - 4rem) !important;\n}\n}\n",
//     }}
//   />

//   <div
//     className="text-white bg-[linear-gradient(rgba(226,_232,_255,_0)_0%,_rgba(226,_232,_255,_0.12)_100%),_none] relative w-full h-16 border-2 border-white/[0.3] border-solid rounded-3xl overflow-hidden bg-zinc-800 md:mb-2  2xl:mb-3"
//     id="div-1"
//     style={{
//       backgroundClip: "border-box, border-box",
//     }}>
//     <img className="left-1/2 absolute top-[12%] align-middle inline-block w-auto h-auto max-w-[85%] max-h-[60%]" src="https://www.premai.io/./assets/images/platform-ill.png" />

//     <div className="bottom-[1.13rem] left-[2.00rem] absolute max-w-[calc(100%_-_4rem)]" id="div-2">
//       <div className="text-lg font-medium">For Developers</div>

//       <div className="text-gray-200 text-xs overflow-hidden">An intuitive, user-friendly development platform for building generative AI solutions with ease.</div>
//     </div>

//     <div className="absolute right-[2.00rem] top-[0.75rem] w-11 h-11 rounded-full font-medium">
//       <a className="items-center justify-center relative text-center inline-flex w-11 h-11 rounded-full" href="https://www.premai.io/?ref=therundown#platform?ref=therundown">
//         <div className="cursor-pointer left-0 absolute top-0 z-[2] w-full h-full">
//           <div className="left-0 absolute top-0 z-[3] w-full h-full">
//             <div className="left-0 absolute top-0 w-full h-full">
//               <svg className="w-full h-full" fill="none" height="42" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg">
//                 <circle cx="21" cy="21" fill='url("#paint0_linear_274_4534")' r="20.5" stroke='url("#paint1_linear_274_4534")' transform="rotate(-180 21 21)" />

//                 <defs fill="none">
//                   <linearGradient fill="none" gradientUnits="userSpaceOnUse" x1="21" x2="21" y1="0" y2="42">
//                     <stop fill="none" stopColor="#E2E8FF" stopOpacity="0" />

//                     <stop fill="none" offset="1" stopColor="#E2E8FF" stopOpacity=".12" />
//                   </linearGradient>

//                   <linearGradient fill="none" gradientUnits="userSpaceOnUse" x1="42" x2="-7.271" y1="42" y2="30.096">
//                     <stop fill="none" stopColor="#fff" />

//                     <stop fill="none" offset="1" stopColor="#fff" stopOpacity="0" />
//                   </linearGradient>
//                 </defs>
//               </svg>
//             </div>

//             <div className="items-center justify-center left-0 absolute top-0 flex w-full h-full">
//               <svg className="w-5 h-5" fill="none" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M10 4.16675V15.8334M10 4.16675L15 9.16675M10 4.16675L5 9.16675" fill="none" stroke="#fffffc" strokeLinecap="round" strokeLinejoin="round" />
//               </svg>
//             </div>
//           </div>
//         </div>
//       </a>
//     </div>
//   </div>
// </div>
