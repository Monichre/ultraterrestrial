import type { UserTheoriesRecord, EventsRecord } from '@/services/xata'

export interface CreateUserSavedItemBase {
  userId: string
  theory?: UserTheoriesRecord['id']
  userNote?: {
    title: string
    content: string
  }
}
