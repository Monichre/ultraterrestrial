import { Card } from '@/components/ui/card/card'
import { ConnectionCard } from '@/features/mindmap/cards/connection-card'
import {
  MindMapEntityCard,
  type MindMapEntityCardProps,
} from '@/features/mindmap/cards/entity-card/entity-card'
import { RootNodeCard } from '@/features/mindmap/cards/root-node-card/root-node-card'
import { StarsCard, type StarsCardProps } from '@/components/ui/card/stars-card'

import type { Meta, StoryObj } from '@storybook/react'
import type { JSX, HTMLAttributes, RefAttributes } from 'react'

const CardStories = ({ children }: any) => (
  <div className='h-[100vh] w-[100vw] flex column justify-center align-center items-center content-center'>
    {children}
    poop
  </div>
)
const mindmapProps: any = {
  data: {
    name: 'Roswell UFO Sighting',
    id: 'test',
    date: '2/5/1947',
    location: 'Roswell, New Mexico',
    photos: [
      {
        src: '/foofighters.webp',
      },
    ],
  },
}

const meta = {
  title: 'Components/Card Stories',
  component: CardStories,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {},
} satisfies Meta<typeof CardStories>

export default meta
type Story = StoryObj<typeof meta>
export const CardStoriesStory: Story = {
  args: {},
  render: (args: any) => (
    <div className='h-[100vh] w-[100vw] flex column justify-center align-center items-center content-center'>
      <ConnectionCard />
      <MindMapEntityCard {...mindmapProps} />
      <StarsCard />
    </div>
  ),
}

// type Story = StoryObj<typeof ConnectionCard>

// export const GlowingStarsCardDemo = {
//   render: (args: JSX.IntrinsicAttributes & StarsCardProps) => (
//     <StarsCard {...args} />
//   ),
// }

// export const CardStory = {
//   render: (
//     args: JSX.IntrinsicAttributes &
//       HTMLAttributes<HTMLDivElement> &
//       RefAttributes<HTMLDivElement>
//   ) => <ConnectionCard />,
// }

// export const MindMapEntityCardStory: Story = {
//   render: (args: any) => (
//     <div className='h-[100vh] w-[100vw] flex column justify-center align-center items-center content-center'>
//       <MindMapEntityCard {...args} />
//     </div>
//   ),
//   args: {
//     data: {
//       name: 'Roswell UFO Sighting',
//       date: '2/5/1947',
//       location: 'Roswell, New Mexico',
//       photos: [
//         {
//           src: '/foofighters.webp',
//         },
//       ],
//     },
//   },
// }
