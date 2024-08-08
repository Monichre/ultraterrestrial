import type { UserTheoriesRecord, EventsRecord } from '@/lib/xata'

export interface CreateUserSavedItemBase {
  userId: string
  theory?: UserTheoriesRecord['id']
  userNote?: {
    title: string
    content: string
  }
}
