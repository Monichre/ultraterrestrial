import { Card } from '@/components/ui/card/card'
import {
  MindMapEntityCard,
  type MindMapEntityCardProps,
} from '@/components/ui/card/mindmap-entity-card'
import { RootNodeCard } from '@/components/ui/card/root-node-card'
import { StarsCard, type StarsCardProps } from '@/components/ui/card/stars-card'
import type { StoryObj } from '@storybook/react'

import type { JSX, HTMLAttributes, RefAttributes } from 'react'

const meta = {
  title: 'Components/Card',
  component: Card,
  subcomponents: {
    // @ts-ignore
    StarsCard,
    // @ts-ignore
    MindMapEntityCard,
    RootNodeCard,
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
}

export default meta

type Story = StoryObj

export const GlowingStarsCardDemo = {
  render: (args: JSX.IntrinsicAttributes & StarsCardProps) => (
    <StarsCard {...args} />
  ),
}

export const CardStory = {
  render: (
    args: JSX.IntrinsicAttributes &
      HTMLAttributes<HTMLDivElement> &
      RefAttributes<HTMLDivElement>
  ) => <Card {...args} />,
}

export const MindMapEntityCardStory: Story = {
  render: (args) => <MindMapEntityCard {...args} />,
}
