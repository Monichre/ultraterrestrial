import { LiveMap, LiveObject } from "@liveblocks/client"


export type Note = LiveObject<{
  x: number
  y: number
  text: string
  selectedBy: Liveblocks["UserMeta"]["info"] | null
  id: string
}>

export type Notes = LiveMap<string, Note>

declare global {
  interface Liveblocks {
    // Each user's Presence, for useMyPresence, useOthers, etc.
    Presence: {
      presence: any
    }
    // The Storage tree for the room, for useMutation, useStorage, etc.
    Storage: {
      notes: Notes
      records: LiveMap<string, any>
    }
    // Custom user info set when authenticating with a secret key
    UserMeta: {
      id: string
      info: {
        name: string
        color: string
        avatar: string
      }

    }
    // Custom events, for useBroadcastEvent, useEventListener
    RoomEvent: {
      type: "SHARE_DIALOG_UPDATE"
    }
    // Custom metadata set on threads, for useThreads, useCreateThread, etc.
    ThreadMetadata: {
      highlightId: string
    }
    ActivitiesData: {
      $addedToDocument: {
        documentId: Document["id"]
      }
    }
  }
}
