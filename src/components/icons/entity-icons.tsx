'use client'
import {
  type LucideProps,
  Users,
  NotepadText,
  CalendarSearch,
  MessageSquareWarning,
  Building,
} from 'lucide-react'

export const KeyFiguresIcon = (
  props: React.JSX.IntrinsicAttributes & LucideProps
) => <Users {...props} />
export const TopicsIcon = (
  props: React.JSX.IntrinsicAttributes & LucideProps
) => <NotepadText {...props} />
export const EventsIcon = (
  props: React.JSX.IntrinsicAttributes & LucideProps
) => <CalendarSearch {...props} />
export const TestimoniesIcon = (
  props: React.JSX.IntrinsicAttributes & LucideProps
) => <MessageSquareWarning {...props} />

export const OrganizationsIcon = (props: any) => <Building {...props} />
