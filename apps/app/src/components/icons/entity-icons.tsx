'use client'
import {
  Building,
  CalendarSearch,
  FileSearch,
  type LucideProps,
  NotepadText,
  Pyramid,
  Shovel,
  Speech,
  Users,
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

export const OrganizationsIcon = (props: any) => <Building {...props} />

export const TestimoniesIcon = (props: any) => {
  return <Speech {...props} />
}
export const DocumentsIcon = (props: any) => {
  return <FileSearch {...props} />
}
export const ArtifactsIcon = (props: any) => {
  return <Shovel {...props} />
}

type IconProps = {
  stroke?: string
  fill?: string
  className?: string
}

export const MonolithsIcon = ({
  stroke = 'currentColor',
  fill = 'none',
  className,
  ...props
}: IconProps) => {
  return (
    <Pyramid stroke={stroke} fill={fill} className={className} {...props} />
  )
}

export const SightingsIcon = ({
  stroke = 'currentColor',
  fill = 'none',
  className,
  ...props
}: IconProps) => {
  return (
    <Pyramid stroke={stroke} fill={fill} className={className} {...props} />
  )
}
