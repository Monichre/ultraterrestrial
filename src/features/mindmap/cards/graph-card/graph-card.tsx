'use client'

import { createUserSavedEvent } from '@/app/actions/user/create-user-saved-event'

import {
  searchAndEnrichConnections,
  searchConnections,
} from '@/features/ai/search'
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
import {
  PanelMenu,
  TransitionPanel,
} from '@/components/animated/transition-panel'
import {
  DialogImage,
  DialogSubtitle,
  DialogContainer,
} from '@/components/animated/core/dialog'
import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogContent,
  DialogClose,
} from '@radix-ui/react-dialog'

const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

export function GraphCard({ card }: any) {
  const { addChildNodesFromSearch, addConnectionNodesFromSearch } = useMindMap()

  const {
    description,
    latitude,
    location,
    longitude,
    photos,
    photo,
    name,
    role,
    date: unformatted,
    color,
    type,
    label,
    fill,
    id,
  } = card

  const date = dayjs(unformatted?.date).format('MMM DD, YYYY')
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

  // !IMPORTANT: This is for the connectionList UI only
  const [connectionListConnections, setConnectionListConnections]: any =
    useState()

  const [userNote, setUserNote] = useState({
    title: '',
    content: '',
  })

  const saveNote = ({ title, content }: any) => {
    setUserNote({ title, content })
  }

  const { userId, sessionId, isLoaded }: any = useAuth()
  const [relatedDataPoints, setRelatedDataPoints]: any = useState(null)

  const searchRelatedDataPointsForConnectionList = useCallback(async () => {
    const payload = await searchConnections({
      id,
      type,
    })

    setRelatedDataPoints(payload.data)
  }, [id, type])

  const findConnectedDataPointsAndRenderTheirNodes = async () => {
    // const payload = await searchAndEnrichConnections({
    //   subject: node,
    //   type,
    // })

    const payload = await searchConnections({
      id,
      type,
    })
    const searchResults = payload.data

    const res = addConnectionNodesFromSearch({ source: card, searchResults })

    //
  }

  const [bookmarked, setBookmarked] = useState(false)

  const handleSave = async () => {
    setBookmarked(true)
    const model = objectMapToSingular[card?.type]

    const saved = await createUserSavedEvent({
      userId,
      event: card.id,
      userNote,
    })

    // #TODO: Run some save logic (BIG ASK. Loaded Feature with zero configuration in place)
  }
  {
    /* <div class="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div> */
  }

  const [showMenu, setShowMMenu] = useState(false)
  const handleHoverEnter = () => {
    setShowMMenu(true)
  }
  const handleHoverLeave = () => {
    setShowMMenu(false)
  }

  const modelColor = DOMAIN_MODEL_COLORS[type]

  const [activeIndex, setActiveIndex] = useState(0)
  const updateActiveIndex = (index: number) => {
    setActiveIndex(index)
  }

  const items = [
    {
      title: 'Details',
      render: () => (
        <div className='mt-4 text-sm text-white font-jetbrains'>
          <p>{truncate(card?.description, 400)}</p>
        </div>
      ),
    },

    {
      button: 'Connections',
      render: () => (
        <ConnectionList originalNode={card} connections={relatedDataPoints} />
      ),

      onClick: () => {
        handleSave()
        setShowMMenu(false)
      },
    },
  ]

  return (
    <>
      {/* <div
        className={`absolute -inset-2 rounded-lg bg-gradient-to-r from-[#78efff] via-[#E393E6] to-[${color}] opacity-50 blur w-full h-full`}
      ></div> */}
      <div
        className={`relative z-50 rounded-[calc(var(--radius)-2px)] p-[1px] bg-black w`}
        style={{ border: `1px solid ${color}` }}
        onMouseEnter={handleHoverEnter}
        // onMouseLeave={handleHoverLeave}
      >
        {/* <AnimatePresence>
          {showMenu && (
            <motion.div
              className='flex justify-center items-center w-full absolute bg-transparent w-auto top-0 left-0'
              animate={{ opacity: 1, top: -50 }}
              initial={{ opacity: 0, top: 50 }}
              exit={{ opacity: 0, top: 50 }}
            >
              <EntityCardUtilityMenu
                handleSave={handleSave}
                saveNote={saveNote}
                userNote={userNote}
                bookmarked={bookmarked}
                findConnectedDataPointsAndRenderTheirNodes={
                  findConnectedDataPointsAndRenderTheirNodes
                }
              />
            </motion.div>
          )}
        </AnimatePresence> */}
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
            className='relative z-50 dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] px-3 py-4'
          >
            <div
              className={`relative w-full h-full pl-3 flex justify-start-center items-center`}
              style={{ borderLeft: `1px solid ${modelColor}` }}
            >
              <DialogImage
                src={image.url || image.src}
                alt='What I Talk About When I Talk About Running - book cover'
                className='h-[75px] w-[75px] object-cover object-center p-1 mr-4'
                style={{
                  borderRadius: '4px',
                }}
              />
              <div className={`w-auto relative`}>
                {/* {type === 'personnel' && (
                  <DialogImage
                    src={image.url || image.src}
                    alt='What I Talk About When I Talk About Running - book cover'
                    className='h-[75px] w-[75px] object-cover object-center p-1 mr-4'
                    style={{
                      borderRadius: '4px',
                    }}
                  />
                )} */}

                <DialogTitle>
                  <h2
                    className='text-white font-centimaSans text-xl whitespace-normal w-fit capitalize '
                    style={{ textWrap: 'pretty' }}
                  >
                    {name}
                  </h2>
                </DialogTitle>

                <DialogSubtitle className=''>
                  <p className='font-jetbrains text-white tracking-wider '>
                    {card?.location || truncate(role, 50)}
                  </p>
                  <p className='date text-1xl text-[#78efff] text-uppercase font-centimaSans tracking-wider w-auto ml-auto mt-1'>
                    {type === 'personnel' && card?.credibility
                      ? `Credibility Score: ${card?.credibility}`
                      : type === 'personnel' && card.rank
                        ? `Platform Ranking: ${card?.rank}`
                        : date}
                  </p>
                </DialogSubtitle>
              </div>
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
                  <div>
                    <div className='flex justify-center py-10'>
                      <img
                        src={image.url || image.src}
                        alt='What I Talk About When I Talk About Running - book cover'
                        className='h-auto w-auto'
                      />
                    </div>
                    <div className='relative h-auto'>
                      <div className='flex w-full justify-between'>
                        <h2 className='text-white font-centimaSans tracking-wider uppercase'>
                          {name}
                        </h2>

                        {/* <div className='flex justify-end'>
                       
                        <EntityCardUtilityMenu
                          handleSave={handleSave}
                          userNote={userNote}
                          saveNote={saveNote}
                          bookmarked={bookmarked}
                        />
                      </div> */}
                      </div>

                      <p className='font-light text-[#78efff] font-centimaSans tracking-wider mt-2 text-sm'>
                        {date}
                      </p>
                      <p className='font-light text-[#78efff] font-centimaSans tracking-wider mt-2 text-sm'>
                        {location}
                      </p>
                      <p className='font-light text-[#78efff] font-centimaSans tracking-wider mt-2 text-sm'>
                        {latitude}, {longitude}
                      </p>
                    </div>

                    <div className='overflow-hidden border-t border-zinc-200 dark:border-zinc-700'>
                      <div className='mb-4 flex space-x-2'>
                        <ShinyButton onClick={() => updateActiveIndex(0)}>
                          Details
                        </ShinyButton>
                        <ShinyButton
                          onClick={() => {
                            searchRelatedDataPointsForConnectionList()
                            updateActiveIndex(1)
                          }}
                        >
                          Connections
                        </ShinyButton>
                      </div>
                      <TransitionPanel
                        activeIndex={activeIndex}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        variants={{
                          enter: { opacity: 0, y: -50, filter: 'blur(4px)' },
                          center: { opacity: 1, y: 0, filter: 'blur(0px)' },
                          exit: { opacity: 0, y: 50, filter: 'blur(4px)' },
                        }}
                      >
                        {items.map((item, index) => (
                          <div key={index} className='py-2'>
                            <h3 className='mb-2 font-medium text-zinc-800 dark:text-zinc-100'>
                              {item.title}
                            </h3>
                            {item.render()}
                          </div>
                        ))}
                      </TransitionPanel>
                    </div>
                  </div>

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
