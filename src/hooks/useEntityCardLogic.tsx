'use client'

import { createUserSavedEvent } from '@/app/actions/user/create-user-saved-event'
import { searchConnections } from '@/features/ai/search'
import { useMindMap } from '@/providers'
import { objectMapToSingular } from '@/utils'
import { useAuth } from '@clerk/nextjs'
import { useState, useCallback } from 'react'

export const useEntityCardLogic = ({ card }: any) => {
  const {
    addChildNodesFromSearch,
    addConnectionNodesFromSearch,
    getNode,

    screenToFlowPosition,
    updateNode,
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

  const image: any = photos?.length
    ? photos[0]
    : photo?.length
      ? photo[0]
      : { url: '/foofighters.webp', signedUrl: '/foofighters.webp' }

  image.src = image.url
  if (!card.photos || !card.photos.length) {
    card.photos = [image]
  }

  const [showMenu, setShowMMenu] = useState(false)
  const handleHoverLeave = () => {
    setShowMMenu(false)
  }
  const handleHoverEnter = () => {
    setShowMMenu(true)
  }
  // !IMPORTANT: This is for the connectionList UI only
  const [connectionListConnections, setConnectionListConnections]: any =
    useState()

  const [userNote, setUserNote] = useState({
    title: '',
    content: '',
  })

  const updateNote = ({ title, content }: any) => {
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

    const domId = `entity-group-node-child-card-${cardId}`

    const element: any = document.getElementById(domId) // Select your element

    const rect = element.getBoundingClientRect()

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
    const siblingSourceNode: any = getNode(card.id)

    const payload = await searchConnections({
      id: siblingSourceNode.id,
      type: siblingSourceNode.data.type,
    })

    const searchResults = payload.data

    addConnectionNodesFromSearch({
      source: siblingSourceNode,
      searchResults,
    })
  }, [addConnectionNodesFromSearch, card.id, getNode])

  const [bookmarked, setBookmarked] = useState(false)

  const saveNote = async () => {
    setBookmarked(true)
    const model = objectMapToSingular[card?.type]

    const saved = await createUserSavedEvent({
      userId,
      event: card.id,
      userNote,
    })
  }
  return {
    entity: card,
    saveNote,
    updateNote,
    showMenu,
    setShowMMenu,
    connectionListConnections,
    setConnectionListConnections,
    userNote,

    handleHoverLeave,
    handleHoverEnter,
    relatedDataPoints,
    setRelatedDataPoints,
    searchRelatedDataPointsForConnectionList,
    addEntitySourceCardToMindMap,
    findConnections: findConnectedDataPointsAndRenderTheirNodes,
    bookmarked,
    setBookmarked,
  }
}
