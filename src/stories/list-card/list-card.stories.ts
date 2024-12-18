import type { Meta, StoryObj } from '@storybook/react'
import { ListCard } from '@/components/ui/card/list-card'

const meta = {
  title: 'Components/ListCard',
  component: ListCard,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {},
} satisfies Meta<typeof ListCard>

export default meta

type Story = StoryObj<typeof meta>

export const Demo: Story = {
  args: {},
}
