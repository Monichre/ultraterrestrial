import { Card } from '@/components/ui/card/card'
import { ConnectionCard } from '@/components/ui/card/connection-card'
import {
  MindMapEntityCard,
  type MindMapEntityCardProps,
} from '@/components/ui/card/entity-card/entity-card'
import { RootNodeCard } from '@/components/ui/card/root-node-card'
import { StarsCard, type StarsCardProps } from '@/components/ui/card/stars-card'
import type { StoryObj } from '@storybook/react'

import type { JSX, HTMLAttributes, RefAttributes } from 'react'
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
  title: 'Components/Cards',
  component: ConnectionCard,
  subcomponents: {
    // @ts-ignore
    StarsCard,
    // @ts-ignore
    MindMapEntityCard,
    RootNodeCard,
  },
  render: ({ ...args }) => (
    <div className='h-[100vh] w-[100vw] flex column justify-center align-center items-center content-center'>
      <ConnectionCard />
      <MindMapEntityCard {...mindmapProps} />
      <StarsCard />
    </div>
  ),
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
}

export default meta

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
