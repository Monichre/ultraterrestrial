import { createUserSavedEvent } from '@/app/actions/user/create-user-saved-event'
import { searchConnections } from '@/features/ai/search'
import { MINI_CARD_DEFAULT_HEIGHT } from '@/features/mindmap/cards/card-stack/animated-mini-card'
import { EntityCardUtilityMenu } from '@/features/mindmap/cards/entity-card'
import { useMindMap } from '@/providers/mindmap-context'
import { objectMapToSingular } from '@/utils'
import { useAuth } from '@clerk/nextjs'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useState } from 'react'
import { format, compareAsc } from 'date-fns'

export const MiniCard = ({ card, removeChildCardClone }: any) => {
  const {
    addChildNodesFromSearch,
    addConnectionNodesFromSearch,
    getNode,
    addNodes,
    screenToFlowPosition,
    updateNode,
    useNodesBounds,
    createSearchResultsLayout,
  } = useMindMap()
  const {
    description,
    latitude,
    location,
    longitude,
    photos,
    photo,
    name,
    role,
    date,
    color,
    type,
    label,
    fill,
    id,
  } = card

  console.log('photos: ', photos)

  console.log('date: ', date)
  const image: any = photos?.length
    ? photos[0]
    : photo?.length
      ? photo[0]
      : { url: '/foofighters.webp', signedUrl: '/foofighters.webp' }

  image.src - image.url

  const [showMenu, setShowMMenu] = useState(false)

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

  const addEntitySourceCardToMindMap = (cardId: any) => {
    const siblingSourceNode: any = getNode(cardId)
    console.log('siblingSourceNode: ', siblingSourceNode)
    const domId = `entity-group-node-child-card-${cardId}`
    console.log('domId: ', domId)
    const element: any = document.getElementById(domId) // Select your element
    console.log('element: ', element)
    const rect = element.getBoundingClientRect()

    console.log('rect: ', rect)
    const x = rect.left // X position
    const y = rect.top // Y position
    const cardNode = {
      ...siblingSourceNode,
      hidden: false,
      position: screenToFlowPosition({
        x,
        y,
      }),
    }
    // getNodesBounds
    // const updatedNode = {s
    //   ...siblingSourceNode,
    //   hidden: false,
    // }
    updateNode(cardId, cardNode)
    return cardNode
  }

  const findConnectedDataPointsAndRenderTheirNodes = useCallback(async () => {
    // const payload = await searchAndEnrichConnections({
    //   subject: node,
    //   type,
    // })

    // console.log('card.id: ', card.id)
    // updateNode(card.id, {
    //   hidden: false,
    // })
    // // const siblingSourceNode: any = addEntitySourceCardToMindMap(card.id)
    // const clickedElDomNode = `entity-group-node-child-card-${card.id}`
    // // get parentNode

    // const element: any = document.getElementById(clickedElDomNode) // Select your element
    // console.log('element: ', element)
    // const top = element.offsetTop // Distance from the parent's top
    // console.log('top: ', top)
    // const left = element.offsetLeft
    // console.log('left: ', left)
    // // const childRect = element.getBoundingClientRect()
    // // const wrapper: any = document.getElementById(`mindmap-container`)
    // // const wrapperRect = wrapper.getBoundingClientRect()
    // // console.log('wrapperRect: ', wrapperRect)

    // const position = {
    //   x: left,
    //   y: top,
    // }
    // console.log('position: ', position)
    const siblingSourceNode: any = getNode(card.id)
    // console.log('siblingSourceNode: ', siblingSourceNode)

    // updateNode(card.id, {
    //   ...siblingSourceNode,
    //   hidden: false,
    //   position,
    // })

    //cc:xata-ai-search#1;button-click
    const payload = await searchConnections({
      id: siblingSourceNode.id,
      type: siblingSourceNode.data.type,
    })
    console.log('payload: ', payload)
    const searchResults = payload.data
    console.log('searchResults: ', searchResults)
    addConnectionNodesFromSearch({
      source: siblingSourceNode,
      searchResults,
    })
    // const res = addConnectionNodesFromSearch({
    //   source: siblingSourceNode,
    //   searchResults,
    // })
    // removeChildCardClone && removeChildCardClone(card.id)

    //
  }, [addConnectionNodesFromSearch, card.id, getNode, searchConnections])

  const [bookmarked, setBookmarked] = useState(false)

  const handleSave = async () => {
    setBookmarked(true)
    const model = objectMapToSingular[card?.type]

    const saved = await createUserSavedEvent({
      userId,
      event: card.id,
      userNote,
    })
  }
  return (
    <div
      className={`relative rounded-[calc(var(--radius)-2px)] p-[1px] bg-black !w-[350px] h-[220px] entity-group-node-child-card`}
      style={{ border: `1px solid ${color}` }}
      id={`entity-group-node-child-card-${id}`}
    >
      <div
        style={{
          borderRadius: '4px',
        }}
        className='h-full w-full relative dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] px-3 py-4'
      >
        <div
          className={`relative w-full h-full pl-3 flex justify-start-center items-center`}
          style={{ borderLeft: `1px solid ${color}` }}
        >
          <motion.div className='absolute top-0 left-0 w-full h-full z-0 after:absolute after:top-0 after:left-0 after:w-full after:z-1 after:h-full after:bg-black after:opacity-80'>
            <motion.img
              src={image.url || image.src}
              alt='What I Talk About When I Talk About Running - book cover'
              className='h-full w-full'
            />
          </motion.div>
          <motion.div className='absolute top-0 left-0 w-full h-full z-1 flex flex-col justify-start p-4'>
            <h2
              className='text-white font-centimaSans text-xl whitespace-normal w-fit capitalize '
              style={{ textWrap: 'pretty' }}
            >
              {name}
            </h2>

            {type === 'personnel' && (
              <p className='date text-1xl text-[#78efff] text-uppercase font-centimaSans tracking-wider w-auto ml-auto mt-1'>
                {card?.credibility
                  ? `Credibility Score: ${card?.credibility}`
                  : card.rank
                    ? `Platform Ranking: ${card?.rank}`
                    : ''}
              </p>
            )}

            <div className='w-full mt-4'>
              {date && (
                <p className='font-light text-[#78efff] font-centimaSans tracking-wider text-sm mr-auto'>
                  {format(date, 'MMMM dd, yyyy')}
                </p>
              )}
              {location && (
                <p className='font-light text-[#78efff] font-centimaSans tracking-wider  text-sm'>
                  {location}
                </p>
              )}
            </div>
          </motion.div>
        </div>
        <motion.div
          className='flex justify-end items-center h-auto absolute bg-transparent w-full bottom-0 left-0'
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
      </div>
    </div>
  )
}
